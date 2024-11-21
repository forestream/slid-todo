import { ModalContent, ModalProvider } from '../common/Modal';
import Button from '../common/ButtonSlid';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ConfettiCanvas = dynamic(() => import('../ConfettiCanvas'), {
  ssr: false,
});

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
    <>
      <ModalProvider isOpen={isOpen} onChangeIsOpen={onChangeIsOpen}>
        <ModalContent closeOnClickOverlay={false}>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-lg font-bold'>회원가입 성공</h1>
            <Image src='/images/ImageSina.svg' width={400} height={400} alt='회원가입 성공' />
            <p className='text-sm text-center'>
              회원가입이 성공적으로 완료되었습니다. 로그인 후 서비스를 이용해주세요.
            </p>
            <Button onClick={handleRedirect}>확인</Button>
          </div>
        </ModalContent>
      </ModalProvider>
      <ConfettiCanvas isActive={isOpen} />
    </>
  );
};

export default SignupSuccessModal;
