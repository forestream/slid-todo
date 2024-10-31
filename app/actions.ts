'use server';

import { revalidatePath } from 'next/cache';

export async function afterNoteMutation(todoId: string, noteId: string) {
  revalidatePath(`/todos/${todoId}/note/${noteId}`, 'page');
}
