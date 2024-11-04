import { ModalContent, ModalProvider } from '../common/Modal';
import Button from '../common/ButtonSlid';
import { useRouter } from 'next/navigation';

interface SignupSuccessModalProps {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
}

const SignupSuccessModal: React.FC<SignupSuccessModalProps> = ({ isOpen, onChangeIsOpen }) => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push('/login');
  };
  return (
    <ModalProvider isOpen={isOpen} onChangeIsOpen={onChangeIsOpen}>
      <ModalContent closeOnClickOverlay={false}>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-lg font-bold'>회원가입 성공</h1>
          <div className='flex justify-center items-center w-60 h-60'>뭔가 엄청나게 축하하는 이미지</div>
          <p className='text-sm text-center'>회원가입이 성공적으로 완료되었습니다. 로그인 후 서비스를 이용해주세요.</p>
          <Button onClick={handleRedirect}>확인</Button>
        </div>
      </ModalContent>
    </ModalProvider>
  );
};

export default SignupSuccessModal;
