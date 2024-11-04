import useNoteQuery from '@/lib/hooks/useNoteQuery';
import IconEmbed from '@/public/icons/IconEmbed';
import IconFlag from '@/public/icons/IconFlag';
import { useCallback, useState } from 'react';
import TiptapEditorProvider from '../TiptapEditorProvider';
import DropdownMenu from '../common/DropdownMenu';
import { IconKebabWithCircle } from '@/public/icons/IconKebabWithCircle';
import { useDeleteNoteMutation } from '@/lib/hooks/useDeleteNoteMutation';
import { useRouter } from 'next/navigation';
import { useSheetContext } from '../common/Sheet';
import { useQueryClient } from '@tanstack/react-query';
import DeleteConfirmationModal from '../modal/DeleteConfirmationModal';

type NoteDetailProps = {
  id: number;
  goalTitle: string;
  todoTitle: string;
};

const NoteDetail = ({ id, goalTitle, todoTitle }: NoteDetailProps) => {
  const { data: note, isLoading } = useNoteQuery(id);
  const { handleClose } = useSheetContext();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const createdAt = new Date(note?.createdAt ?? 0);
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth() + 1;
  const date = createdAt.getDate();
  const deleteNote = useDeleteNoteMutation();
  const router = useRouter();

  const handleDelete = () => {
    deleteNote.mutate(
      { noteId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
          handleClose();
        },
      }
    );
  };

  const handleDropdaownMenuClick = (item: string) => {
    if (item === '수정하기') {
      // 수정하기페이지로 이동
      router.push(`/todos/${note?.todo.id}/note/${note?.id}?todo=${note?.todo.title}&goal=${note?.goal.title}`);
    } else if (item === '삭제하기') {
      setIsDeleteModalOpen(true);
    }
  };

  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  const handleToggleEmbed = () => setIsEmbedOpen(!isEmbedOpen);

  const TiptapProviderOnContentChange = useCallback(() => {
    return <TiptapEditorProvider content={note?.content} editorOptions={{ editable: false }} />;
  }, [note?.content]);

  if (isLoading) return;

  return (
    <>
      {note?.linkUrl && isEmbedOpen && (
        <section className='h-[385px] lg:h-full w-full lg:w-[543px] overflow-auto relative mb-4 lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:-translate-x-full'>
          <div className='h-full bg-blue-50'>
            <iframe src={note?.linkUrl} className='h-full w-full' />
          </div>
        </section>
      )}

      <section className='lg:max-w-[800px] w-full flex flex-col grow '>
        <div className='flex w-full gap-1.5 mb-3'>
          <div className='flex justify-center items-center rounded-md bg-slate-800 w-6 h-6'>
            <IconFlag />
          </div>
          <p className='font-medium text-base text-slate-800'>{goalTitle}</p>
          <div className='grow flex justify-end w-10'>
            <DropdownMenu
              icon={IconKebabWithCircle}
              dropdownList={['수정하기', '삭제하기']}
              onItemClick={handleDropdaownMenuClick}
            />
          </div>
        </div>
        <div className='flex items-center w-full gap-2 mb-6'>
          <p className='rounded-md bg-slate-100 p-1 text-slate-700 text-xs'>To do</p>
          <p className='text-sm font-normal text-slate-700'>{todoTitle}</p>
          <p className='grow text-right text-xs text-slate-500'>
            {year}. {String(month).padStart(2, '0')}. {date}
          </p>
        </div>

        <hr />
        <div className='w-full relative flex flex-col'>
          <div className='w-full relative h-7 my-3'>
            <div className='w-full text-lg font-medium focus-visible:outline-none'>{note?.title}</div>
          </div>
          <hr className='mb-3' />
          {note?.linkUrl && (
            <div className='w-full rounded-full bg-slate-200 p-1 flex items-center gap-2 mb-4'>
              <div className='w-6 h-6 rounded-full bg-blue-500 flex justify-center items-center'>
                <IconEmbed />
              </div>
              <p className='grow text-base font-normal text-slate-800 cursor-pointer' onClick={handleToggleEmbed}>
                {note?.linkUrl}
              </p>
            </div>
          )}
          <div className='lg:relative'>
            <div>
              <TiptapProviderOnContentChange />
            </div>
          </div>
        </div>
      </section>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onChangeIsOpen={setIsDeleteModalOpen}
        onDelete={handleDelete}
        itemType='note'
      />
    </>
  );
};

export default NoteDetail;
