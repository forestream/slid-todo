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
