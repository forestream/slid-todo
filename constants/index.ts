export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const MOBILE_BREAKPOINT = 640;

export const TABLET_BREAKPOINT = 1024;

export const DELETE_ITEM_TEXTS = {
  goal: {
    title: '목표 삭제',
    message: '목표를 삭제하시겠습니까?\n목표에 포함된 노트와 할 일이 모두 삭제됩니다.\n삭제된 목표는 복구할 수 없습니다.',
  },
  note: {
    title: '노트 삭제',
    message: '노트를 삭제하시겠습니까?\n삭제된 노트는 복구할 수 없습니다.',
  },
  todo: {
    title: '할 일 삭제',
    message: '할 일을 삭제하시겠습니까?\n삭제된 할 일은 복구할 수 없습니다.',
  },
};

