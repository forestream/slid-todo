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
        width={400}
        height={400}
        className={twMerge('w-full h-auto rounded-lg object-cover', className)}
        priority={true}
      />
    )
  );
};

export default TodoImage;
