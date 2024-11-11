'use client';

import { useToastStore } from './toastStore';

const Toaster = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className='fixed top-4 right-4 z-50 flex flex-col gap-2'>
      {toasts.map((toast) => (
        <div key={toast.id} className='animate-slide-in-right'>
          <div
            className={`bg-white p-4 rounded-lg shadow-lg min-w-[300px]
              ${toast.variant === 'success' ? 'bg-green-100' : ''}
              ${toast.variant === 'error' ? 'bg-red-100' : ''}
              ${toast.variant === 'warning' ? 'bg-yellow-100' : ''}`}
          >
            <div className='flex justify-between items-start'>
              {toast.title && <h3 className='text-sm font-medium'>{toast.title}</h3>}
              <button onClick={() => removeToast(toast.id)} className='ml-4 text-gray-400 hover:text-gray-600'>
                ×
              </button>
            </div>
            {toast.description && <div className='mt-1 text-sm text-gray-600'>{toast.description}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toaster;
