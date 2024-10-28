import IconInactive from '@/public/icons/IconInactive';
import IconStateActive from '@/public/icons/IconStateActive';
import { useState } from 'react';

import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { TodoFormData } from '.';

interface FileUploadProps {
  register: UseFormRegister<TodoFormData>;
  setValue: UseFormSetValue<TodoFormData>;
  watch: UseFormWatch<TodoFormData>;
  maxSize?: number;
  className?: string;
  label?: string;
  error?: string;
}

const FileUpload = ({
  register,
  setValue,
  watch,
  maxSize = 3 * 1024 * 1024,
  className = '',
  label = '파일',
  error,
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  // react-hook-form을 통해 현재 파일 URL 값을 감시
  const fileUrl = watch('fileUrl');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      setUploadError(`파일 크기는 ${maxSize / (1024 * 1024)}MB 이하여야 합니다.`);
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setFileName(file.name);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`4-4-dev/files`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('파일 업로드에 실패했습니다.');
      }

      const data = await response.json();
      // react-hook-form의 setValue를 통해 form 값 업데이트
      setValue('fileUrl', data.url, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : '파일 업로드 중 오류가 발생했습니다.');
      setFileName(null);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setValue('fileUrl', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // register를 통해 hidden input 등록
  const { ref, ...rest } = register('fileUrl');

  return (
    <div className={`space-y-2 ${className}`}>
      <label className='block text-base font-semibold text-slate-800 mb-3 '>{label}</label>
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <input type='file' id={`file-upload-${name}`} className='hidden' onChange={handleFileUpload} accept='*/*' />
          {/* hidden input for react-hook-form */}
          <input type='hidden' {...rest} ref={ref} />
          {isUploading ? (
            <div className='flex items-center justify-center rounded-lg  text-white hover:text-slate-900 cursor-pointer py-2 px-3 gap-1'>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900'></div>
              <span className='text-slate-400'>업로드 중...</span>
            </div>
          ) : (
            <label
              htmlFor={`file-upload-${name}`}
              className={`flex items-center justify-center rounded-lg bg-slate-900 text-white hover:text-slate-900 cursor-pointer py-2 px-3 gap-1
              ${isUploading ? 'bg-gray-100' : 'hover:bg-gray-50 hover:text-slate-900'} 
              ${error ? 'border-red-500' : 'border-gray-300'}
              transition-colors duration-200`}
            >
              {fileUrl ? <IconStateActive /> : <IconInactive />}
              <span>파일 업로드</span>
            </label>
          )}
        </div>

        {fileUrl && (
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-slate-400'>{fileName}</span>
            <button
              type='button'
              onClick={removeFile}
              className='p-1 hover:bg-gray-100 rounded-full transition-colors duration-200'
            >
              <div className='w-4 h-4 text-slate-400' />
            </button>
          </div>
        )}

        {!fileUrl && !isUploading && <span className=' text-slate-400'>업로드한 파일이 없습니다.</span>}
      </div>

      {(uploadError || error) && <p className='text-red-500 text-sm mt-1'>{uploadError || error}</p>}
    </div>
  );
};

export default FileUpload;
