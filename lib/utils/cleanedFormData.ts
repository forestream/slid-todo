interface FormData {
  [key: string]: unknown;
}

const cleanedFormData = (data: FormData) =>
  Object.fromEntries(Object.entries(data).filter(([, value]) => Boolean(value) || value === 'done'));

export default cleanedFormData;
