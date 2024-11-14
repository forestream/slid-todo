interface FormData {
  [key: string]: unknown;
}

const cleanedFormData = (data: FormData) =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, Boolean(value) || value === 'done' ? value : null])
  );

export default cleanedFormData;
