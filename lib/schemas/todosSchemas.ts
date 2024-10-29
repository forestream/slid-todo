import { z } from 'zod';

export const todoEditSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(30, '제목은 최대 30자까지 입력 가능합니다.'),
  fileUrl: z.string().optional(),
  linkUrl: z
    .string()
    .optional()
    .transform((value) => (value === '' ? null : value))
    .refine((value) => !value || /^(https?:\/\/)/.test(value), {
      message: '유효한 URL을 입력해주세요',
    }),
  goalId: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        const parsed = Number(value);
        return isNaN(parsed) ? null : parsed;
      }
      return value;
    }, z.number().nullable().optional())
    .transform((value) => (typeof value === 'number' ? value : null)),
  done: z.boolean(),
});

export type TodoEditFormData = z.infer<typeof todoEditSchema>;
