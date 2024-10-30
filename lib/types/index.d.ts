export type Todo = {
  noteId: null;
  done: boolean;
  linkUrl: null;
  fileUrl: null;
  title: string;
  id: number;
  goal: {
    title: string;
    id: number;
  };
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
};

export type Todos = {
  todos: Todo[];
  nextCursor: number | null;
  totalCount: number;
};

export type Goal = {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  updatedAt: string;
  createdAt: string;
};

export type Goals = {
  goals: Goal[];
  totalCount: number;
  nextCursor: number | null;
};

export type Note = {
  todo: {
    done: boolean;
    fileUrl: string;
    linkUrl: string;
    title: string;
    id: number;
  };
  linkUrl: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: {
    title: string;
    id: number;
  };
  userId: number;
  teamId: string;
};
