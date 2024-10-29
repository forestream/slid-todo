import IconInactive from '@/public/icons/IconInactive';
import { useState } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldValues, Path, PathValue } from 'react-hook-form';
import IconClose from '@/public/icons/IconClose';
import { IconStateActiveWhite } from '@/public/icons/IconStateActiveWhite';

interface FileUploadProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  maxSize?: number;
  className?: string;
  label?: string;
  error?: string;
}

const FileUpload = <T extends FieldValues>({
  register,
  setValue,
  watch,
  maxSize = 3 * 1024 * 1024,
  className = '',
  label = '파일',
  error,
}: FileUploadProps<T>) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileUrl = watch('fileUrl' as Path<T>);

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
      setValue('fileUrl' as Path<T>, data.url, {
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
    setValue('fileUrl' as Path<T>, '' as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setFileName(null);
  };

  const { ref, ...rest } = register('fileUrl' as Path<T>);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className='block text-base font-semibold text-slate-800 mb-3'>{label}</label>
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <input type='file' id='file-upload' className='hidden' onChange={handleFileUpload} accept='*/*' />
          <input type='hidden' {...rest} ref={ref} />
          {isUploading ? (
            <div className='flex items-center justify-center rounded-lg text-white hover:text-slate-900 cursor-pointer py-2 px-3 gap-1'>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900'></div>
              <span className='text-slate-400'>업로드 중...</span>
            </div>
          ) : (
            <label
              htmlFor='file-upload'
              className={`flex items-center justify-center rounded-lg bg-slate-900 text-white hover:text-slate-900 cursor-pointer py-2 px-3 gap-1
              ${isUploading ? 'bg-gray-100' : 'hover:bg-gray-50 hover:text-slate-900'} 
              ${error ? 'border-red-500' : 'border-gray-300'}
              transition-colors duration-200`}
            >
              {fileUrl ? <IconStateActiveWhite /> : <IconInactive />}
              <span>파일 업로드</span>
            </label>
          )}
        </div>

        {fileUrl && (
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-slate-400'>{fileName || '파일'}</span>
            <button
              type='button'
              onClick={removeFile}
              className='p-1 hover:bg-gray-100 rounded-full transition-colors duration-200'
            >
              <IconClose />
            </button>
          </div>
        )}

        {!fileUrl && !isUploading && <span className='text-slate-400'>업로드한 파일이 없습니다.</span>}
      </div>

      {(uploadError || error) && <p className='text-red-500 text-sm mt-1'>{uploadError || error}</p>}
    </div>
  );
};

export default FileUpload;
