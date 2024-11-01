import { Todo } from '@/lib/types/todo';
import { SheetContent, SheetProvider } from '../common/Sheet';
import IconFile from '@/public/icons/IconFile';
import IconLink from '@/public/icons/IconLink';
import IconNoteView from '@/public/icons/IconNoteView';
import IconNoteWrite from '@/public/icons/IconNoteWrite';
import Button from '../common/ButtonSlid';

interface TodoContentsDrawerProps {
  isopen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
  data: Todo;
}

const TodoContentsDrawer: React.FC<TodoContentsDrawerProps> = ({ isopen, onChangeIsOpen, data }) => {
  return (
    <SheetProvider isOpen={isopen} onChangeIsOpen={onChangeIsOpen}>
      <SheetContent position='bottom' className='w-full h-auto'>
        <div className='flex flex-col space-y-6'>
          <h2 className='text-center'>{data.title}</h2>
          <div className='flex justify-around'>
            <Button>수정하기</Button>
            <Button>삭제하기</Button>
          </div>
          <div className='space-y-4'>
            {data.fileUrl && (
              <div className='flex space-x-2 cursor-pointer hover:underline'>
                <IconFile />
                <p>파일 다운로드</p>
              </div>
            )}
            {data.linkUrl && (
              <div className='flex space-x-2 cursor-pointer hover:underline'>
                <IconLink />
                <p>링크 들어가기</p>
              </div>
            )}
            {data.noteId && (
              <div className='flex space-x-2 cursor-pointer hover:underline'>
                <IconNoteView />
                <p>노트 보기</p>
              </div>
            )}
            {data.noteId && (
              <div className='flex space-x-2 cursor-pointer hover:underline'>
                <IconNoteWrite />
                <p>노트 수정하기</p>
              </div>
            )}
            {/**노트 아이디가 없을 때 추가히기 **/}
            {!data.noteId && (
              <div className='flex space-x-2 cursor-pointer hover:underline'>
                <IconNoteWrite />
                <p>노트 추가하기</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </SheetProvider>
  );
};

export default TodoContentsDrawer;
