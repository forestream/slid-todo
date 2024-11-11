import { useToastStore, Toast } from './toastStore';

const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  return {
    toast: (props: Omit<Toast, 'id'>) => addToast(props),
  };
};

export default useToast;
