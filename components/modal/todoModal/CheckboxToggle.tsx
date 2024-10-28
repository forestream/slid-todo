import IconInactive from '@/public/icons/IconInactive';
import IconStateActive from '@/public/icons/IconStateActive';
import { useCallback } from 'react';

interface CheckboxToggleProps {
  done: boolean;
  onChange: (value: boolean) => void;
}

const CheckboxToggle = ({ done, onChange }: CheckboxToggleProps) => {
  const handleClick = useCallback(() => {
    onChange(!done);
  }, [done, onChange]);

  return (
    <div>
      <button
        type='button'
        onClick={handleClick}
        className='flex gap-x-1.5 items-center justify-center rounded-full text-slate-600 font-semibold hover:bg-gray-100 '
      >
        {done ? (
          <>
            <IconStateActive />
            <span>done</span>
          </>
        ) : (
          <>
            <IconInactive />
            <span>to do</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CheckboxToggle;
