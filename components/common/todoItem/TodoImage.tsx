import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface TodoImageProps {
  imageUrl: string;
  className?: string;
}

const TodoImage = ({ imageUrl, className }: TodoImageProps) => {
  return (
    console.log('imageUrl', imageUrl),
    (
      <Image
        src={imageUrl}
        alt='todo-image'
        width={0}
        height={0}
        className={twMerge('w-full h-auto rounded-lg', className)}
        unoptimized
      />
    )
  );
};

export default TodoImage;
