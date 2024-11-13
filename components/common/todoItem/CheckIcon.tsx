import { useUpdateTodoMutation } from '@/lib/hooks/useUpdateTodoMutation';
import IconInactive from '@/public/icons/IconInactive';
import IconStateActive from '@/public/icons/IconStateActive';

interface CheckIconProps {
  done: boolean;
  id: number;
}

const CheckIcon: React.FC<CheckIconProps> = ({ done, id }) => {
  const updateTodo = useUpdateTodoMutation();

  const handleToggle = () => {
    updateTodo.mutate({
      id: id,
      updates: { done: !done },
    });
  };
  return (
    <button
      onClick={handleToggle}
      aria-label={done ? '할 일 완료 취소하기' : '할 일 완료하기'}
      aria-pressed={done}
      className='shrink-0'
    >
      {done ? <IconStateActive aria-hidden='true' /> : <IconInactive aria-hidden='true' />}
    </button>
  );
};

export default CheckIcon;
