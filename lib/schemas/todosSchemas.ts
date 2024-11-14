import { z } from 'zod';

// 공통으로 사용되는 스키마 필드들
const baseFields = {
  title: z.string().min(1, '제목을 입력해주세요').max(30, '제목은 최대 30자까지 입력 가능합니다.'),
  fileUrl: z.string().optional(),
  linkUrl: z
    .string()
    .optional()
    .refine((url) => {
      // url이 undefined이거나 빈 문자열이면 true 반환
      if (!url) return true;

      try {
        const urlToTest = url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;

        const urlObject = new URL(urlToTest);
        return (
          urlObject.hostname.includes('.') &&
          urlObject.hostname.length > urlObject.hostname.indexOf('.') + 1 &&
          /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(urlObject.hostname)
        );
      } catch {
        return false;
      }
    }, '유효한 URL을 입력해주세요')
    .transform((url) => {
      // url이 undefined이거나 빈 문자열이면 빈 문자열 반환
      if (!url) return '';

      return url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;
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
};

// 기존의 Edit 스키마
export const todoEditSchema = z.object({
  ...baseFields,
  done: z.boolean(),
});

// 새로운 Add 스키마 (done 필드 제외)
export const todoAddSchema = z.object({
  ...baseFields,
});

// 타입 추론을 위한 타입 정의
export type TodoEditFormData = z.infer<typeof todoEditSchema>;
export type TodoAddFormData = z.infer<typeof todoAddSchema>;
