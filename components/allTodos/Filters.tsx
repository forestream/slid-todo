'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Button from '../common/ButtonSlid';

const Filters: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'all';

  const handleFilterClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('status');
    } else {
      params.set('status', value);
    }
    router.push(`?${params.toString()}`);
  };

  const filters = [
    { value: 'all', label: '전체' },
    { value: 'in-progress', label: '진행중' },
    { value: 'completed', label: '완료' },
  ];

  return (
    <nav className='flex gap-2' aria-label='할 일 필터'>
      <ul className='flex gap-2' role='tablist'>
        {filters.map((filter) => (
          <li key={filter.value} role='presentation'>
            <Button
              variant={status === filter.value ? 'filled' : 'outlined'}
              className='text-sm rounded-[17px] px-3 py-1'
              onClick={() => handleFilterClick(filter.value)}
              role='tab'
              aria-selected={status === filter.value}
              aria-controls={`${filter.value}-todos`}
            >
              {filter.label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Filters;
