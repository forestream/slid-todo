import getDefaultErrorMessage from '../utils/getDefaultErrorMessage';

export class HttpError extends Error {
  constructor(public status: number, message: string, public url: string) {
    super(message);
    this.name = 'HttpError';
  }
}
type Data = {
  message?: string;
} & unknown;

export const handleHttpError = (data: Data, status: number, url: string) => {
  // data타입은 서버에서 정의한 에러 응답 형식에 따라 다를 수 있기 때문에 unknown으로 처리
  // slid 서버의 경우 { message: string } 형태로 에러 메시지를 전달하기 때문에 이와 같이 정의

  const message = data.message ?? getDefaultErrorMessage(status);

  if (status === 500) {
    handleServerError(url);
  }

  throw new HttpError(status, message, url);
};

const handleServerError = (url: string) => {
  // 개발자를 위한 로깅
  console.error(`Server error occurred at: ${url}`);
  // 필요한 경우 외부 로깅 서비스로 에러 전송

  throw new HttpError(500, '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.', url);
};
