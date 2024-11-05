import { afterNoteMutation } from '@/app/actions';
import useNoteMutation from '@/lib/hooks/useNoteMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { FormEventHandler, MutableRefObject, PropsWithChildren, useCallback, useEffect, useRef } from 'react';

type NoteFormProps = {
  noteId?: string;
  method: 'POST' | 'PATCH';
  saveButtonRef: MutableRefObject<HTMLButtonElement | null>;
  onChangeSavedToast: (status: boolean) => void;
};

const NoteForm = ({
  noteId,
  method,
  saveButtonRef,
  onChangeSavedToast,
  children,
}: PropsWithChildren<NoteFormProps>) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { todoId } = useParams();
  const { mutate } = useNoteMutation(todoId as string);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSave = useCallback(
    (todoId: string, title: string, content: string, linkUrl: string, savedAt: Date) => {
      window.localStorage.setItem(
        'savedNote' + todoId,
        JSON.stringify({
          todoId,
          title,
          content,
          linkUrl,
          savedAt,
        })
      );
      onChangeSavedToast(true);
      setTimeout(() => {
        onChangeSavedToast(false);
      }, 1000 * 5);
    },
    [onChangeSavedToast]
  );

  useEffect(() => {
    if (!formRef.current || !saveButtonRef.current) return;

    const id = setInterval(() => {
      formRef.current?.requestSubmit(saveButtonRef.current);
    }, 1000 * 60 * 5);

    return () => clearInterval(id);
  }, [handleSave, saveButtonRef, todoId]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const title = (formData.get('noteTitle') as string) ?? '';
    const content = (formData.get('contentHTML') as string) ?? '';
    const linkUrl = (formData.get('linkUrl') as string) ?? '';

    if ((e.nativeEvent as SubmitEvent).submitter?.id === 'saveNote') {
      handleSave(todoId as string, title, content, linkUrl, new Date());
      return;
    }

    const note: {
      title: string;
      content: string | undefined;
      todoId: number;
      linkUrl?: string;
    } = {
      title,
      content,
      todoId: +todoId,
      linkUrl,
    };

    if (!note.linkUrl) {
      delete note.linkUrl;
    }

    mutate(
      {
        noteId,
        options: { method, body: JSON.stringify(note) },
      },
      {
        onSuccess: () => {
          afterNoteMutation(Array.isArray(todoId) ? todoId[0] : todoId, noteId ?? '0');
          queryClient.invalidateQueries({ queryKey: ['notes'] });
          queryClient.invalidateQueries({ queryKey: ['todos'] });
          router.back();
        },
      }
    );
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default NoteForm;
