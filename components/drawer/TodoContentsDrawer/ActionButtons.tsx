import { Todo } from '@/lib/types/todo';
import openExternalSite from '@/lib/utils/openExternalSite';
import IconFile from '@/public/icons/IconFile';
import IconLink from '@/public/icons/IconLink';
import IconNoteView from '@/public/icons/IconNoteView';
import IconNoteWrite from '@/public/icons/IconNoteWrite';
import { useRouter } from 'next/navigation';

interface TodoActionButtonsProps {
  data: Todo;
  onNoteView: () => void;
  onChangeIsOpen: (isOpen: boolean) => void;
}

interface ActionButton {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  condition?: boolean;
}

const ActionButtons = ({ data, onNoteView, onChangeIsOpen }: TodoActionButtonsProps) => {
  const router = useRouter();

  const handleExternalLink = (url: string | null) => {
    if (!url) return;
    openExternalSite(url);
  };

  const handleGetNoteUrl = (type: 'create' | 'edit') => {
    const baseUrl = type === 'create' ? `/todos/${data.id}/create` : `/todos/${data.id}/note/${data.noteId}`;
    const params = new URLSearchParams({
      todo: data.title,
      goal: data.goal?.title ?? '목표 없음',
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const actionButtons: ActionButton[] = [
    {
      icon: <IconFile />,
      label: '파일 다운로드',
      onClick: () => handleExternalLink(data.fileUrl),
      condition: !!data.fileUrl,
    },
    {
      icon: <IconLink />,
      label: '링크 들어가기',
      onClick: () => handleExternalLink(data.linkUrl),
      condition: !!data.linkUrl,
    },
    {
      icon: <IconNoteView />,
      label: '노트 보기',
      onClick: onNoteView,
      condition: !!data.noteId,
    },
    {
      icon: <IconNoteWrite />,
      label: '노트 수정하기',
      onClick: () => {
        onChangeIsOpen(false);
        setTimeout(() => router.push(handleGetNoteUrl('edit')), 300);
      },
      condition: !!data.noteId,
    },
    {
      icon: <IconNoteWrite />,
      label: '노트 추가하기',
      onClick: () => {
        onChangeIsOpen(false);
        router.push(handleGetNoteUrl('create'));
      },
      condition: !data.noteId,
    },
  ];

  return (
    <div className='space-y-4'>
      {actionButtons
        .filter((button) => button.condition !== false)
        .map((button, index) => (
          <div
            key={index}
            className='flex items-center space-x-3 cursor-pointer text-xl hover:underline'
            onClick={button.onClick}
          >
            {button.icon}
            <p>{button.label}</p>
          </div>
        ))}
    </div>
  );
};

export default ActionButtons;
