import { handleHttpError, HttpError } from './errorHandlers';

const baseFetch = async (URL: string = '', options: RequestInit = {}) => {
  try {
    const headers =
      options.body instanceof FormData ? options.headers : { 'Content-Type': 'application/json', ...options.headers };

    const response = await fetch(URL, { ...options, headers });
    if (response.status === 204) return; // 기존에 있던 건 그대로 두었습니다.
    const data = await response.json();

    if (!response.ok) {
      handleHttpError(data, response.status, URL);
    }
    return data;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error; // 이미 처리된 HTTP 에러는 그대로 전파
    }
    // 네트워크 에러 등 기타 에러 처리
    throw new HttpError(0, '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', URL);
  }
};

export default baseFetch;
