export interface GoalInTodo {
  id: number;
  title: string;
}

export interface Todo {
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  fileUrl: string | null;
  title: string;
  id: number;
  goal: GoalInTodo | null;
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

export interface GetTodosResponse {
  todos: Todo[];
  totalCount: number;
  nextCursor?: number;
}

export interface GetTodosProgressResponse {
  progress: number;
}

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
  linkUrl: string | null;
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

export type GetNotesResponse = {
  notes: Note[];
  totalCount: number;
  nextCursor: number | null;
};
