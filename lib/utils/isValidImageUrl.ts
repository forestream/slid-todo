import { ACCEPTED_IMAGE_EXTENSIONS } from '@/constants';

const isValidImageUrl = (url: string | undefined | null): boolean => {
  try {
    if (!url) return false;
    // URL이 유효한지 확인
    new URL(url);

    // 파일 확장자 추출
    const extension = url.split('.').pop()?.toLowerCase();

    if (!extension) return false;

    return ACCEPTED_IMAGE_EXTENSIONS.includes(extension);
  } catch {
    // URL 파싱에 실패한 경우
    return false;
  }
};

export default isValidImageUrl;
