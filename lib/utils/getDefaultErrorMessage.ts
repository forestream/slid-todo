const getDefaultErrorMessage = (status: number): string => {
  const statusMessages: Record<number, string> = {
    400: '잘못된 요청입니다.',
    401: '인증이 필요합니다.',
    403: '접근 권한이 없습니다.',
    404: '요청하신 리소스를 찾을 수 없습니다.',
    500: '서버 오류가 발생했습니다.',
    502: '게이트웨이 오류가 발생했습니다.',
    503: '서비스를 일시적으로 사용할 수 없습니다.',
  };

  return statusMessages[status] || '알 수 없는 오류가 발생했습니다.';
};

export default getDefaultErrorMessage;
