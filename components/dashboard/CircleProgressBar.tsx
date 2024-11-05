import { useEffect, useState } from 'react';

interface CircleProgressBarProps {
  percentage: number;
  radius: number;
  strokeWidth: number;
}

export const CircleProgressBar = ({ percentage: initialPercentage, radius, strokeWidth }: CircleProgressBarProps) => {
  const [percentage, setPercentage] = useState(0);
  const containerSize = radius * 2 + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(initialPercentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [initialPercentage]);

  return (
    <svg
      width={containerSize}
      height={containerSize}
      viewBox={`0 0 ${containerSize} ${containerSize}`}
      className='-rotate-90'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx={containerSize / 2}
        cy={containerSize / 2}
        r={radius}
        stroke='white'
        strokeWidth={strokeWidth}
        fill='transparent'
        strokeOpacity={1}
      />
      <circle
        cx={containerSize / 2}
        cy={containerSize / 2}
        r={radius}
        fill='transparent'
        stroke='black'
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        style={{
          strokeDashoffset: offset,
        }}
        className='transition-all ease-out duration-1000'
      />
    </svg>
  );
};
