'use client';

import IconSuccess from '@/public/icons/IconSuccess';
import { useToastStore } from './toastStore';
import IconError from '@/public/icons/IconError';

const Toaster = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className='fixed top-4 right-4 z-50 flex flex-col gap-2' role='status' ria-live='polite'>
      {toasts.map((toast) => (
        <div key={toast.id} className='animate-slide-in-right' aria-labelledby={`toast-title-${toast.id}`}>
          <div className={`bg-white p-4 rounded-lg shadow-lg min-w-[300px] space-y-1`}>
            <div className='flex justify-between items-start'>
              <div className='flex items-center gap-2'>
                {toast.variant === 'success' && <IconSuccess />}
                {toast.variant === 'error' && <IconError />}
                {toast.title && (
                  <h3 id={`toast-title-${toast.id}`} className='text-sm font-medium'>
                    {toast.title}
                  </h3>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className='ml-4 text-gray-400 hover:text-gray-600'
                aria-label='Close notification'
              >
                ×
              </button>
            </div>
            {toast.description && <div className='text-sm ml-6 text-gray-600'>{toast.description}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toaster;
