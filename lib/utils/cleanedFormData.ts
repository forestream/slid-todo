interface FormData {
  [key: string]: unknown;
}

export const normalizeFormData = (data: FormData) =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, Boolean(value) || value === 'done' ? value : null])
  );
export const filterEmptyFields = (data: FormData) =>
  Object.fromEntries(Object.entries(data).filter(([, value]) => Boolean(value) || value === 'done'));
