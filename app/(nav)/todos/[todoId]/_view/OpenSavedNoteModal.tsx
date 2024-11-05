'use client';

import { ModalClose, ModalContent, ModalProvider, ModalTrigger } from '@/components/common/Modal';
import { memo } from 'react';
import { SavedNote } from './NoteFormContent';
import Button from '@/components/common/ButtonSlid';

type ModalSavedNoteProps = {
  savedNote: SavedNote;
  onOpenSaved: () => void;
};

const OpenSavedNoteModal = memo(({ savedNote, onOpenSaved }: ModalSavedNoteProps) => {
  return (
    <ModalProvider>
      <ModalTrigger className='shrink-0 rounded-full bg-white border border-blue-500 text-blue-500 text-sm font-semibold py-2 px-4'>
        불러오기
      </ModalTrigger>
      <ModalContent className='max-w-[450px] flex flex-col items-center w-full'>
        <p className='font-medium mt-2'>
          &apos;{savedNote && savedNote.title.length ? savedNote.title : '제목없음'}&apos;
        </p>
        <p className='font-medium mb-8'>제목의 노트를 불러오시겠어요?</p>
        <div className='flex gap-2'>
          <ModalClose asChild>
            <Button variant='outlined' className='w-[120px]'>
              취소
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button onClick={onOpenSaved} className='w-[120px]'>
              불러오기
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </ModalProvider>
  );
});

OpenSavedNoteModal.displayName = 'OpenSavedNoteModal';

export default OpenSavedNoteModal;
