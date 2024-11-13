'use client';
import React, { useState, useEffect, useRef, ComponentType, SVGProps } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DropdownProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  sideIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  text?: string;
  dropdownList: string[];
  dropdownAlign?: 'center' | 'right';
  onItemClick: (item: string) => void;
  className?: string;
  iconClassName?: string;
  buttonClassName?: string;
  dropdownListClassName?: string;
  dropdownItemClassName?: string;
}

const DropdownMenu = ({
  icon: Icon,
  sideIcon: SideIcon,
  text,
  dropdownList,
  dropdownAlign = 'right',
  onItemClick,
  className,
  iconClassName,
  buttonClassName,
  dropdownListClassName,
  dropdownItemClassName,
}: DropdownProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const iconButtonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    if (!isDropdownOpen) {
      iconButtonRef.current?.focus();
    } else {
      iconButtonRef.current?.blur();
    }
  };

  const handleMouseOut = () => {
    if (!isDropdownOpen) {
      closeDropdown();
    }
  };

  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        iconButtonRef.current &&
        !iconButtonRef.current.contains(target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownClassNames = clsx(
    'z-10 absolute mt-2 bg-white rounded-xl text-slate-700 max-h-64 sm:max-h-32 lg:max-h-32 overflow-y-auto',
    dropdownAlign === 'right' ? 'right-0 shadow-[4px_4px_10px_-2px_rgba(0,0,0,0.05)]' : 'w-full shadow-lg left-0'
  );

  const dropdownMenuListClassNames = clsx(
    'flex flex-col text-nowrap text-sm sm:text-lg lg:text-lg justify-center items-center text-center',
    dropdownListClassName
  );

  const dropdownMenuItemClassNames = clsx(
    'w-full flex max-h-[100px] overflow-y-auto',
    'px-4 pt-2 pb-[6px] hover:bg-gray-100 cursor-pointer first:rounded-t-xl last:rounded-b-xl',
    dropdownItemClassName
  );

  return (
    <div className={`flex-col justify-center items-center relative inline-block text-nowrap ${className}`}>
      <button
        ref={iconButtonRef}
        type='button'
        onClick={toggleDropdown}
        onMouseOut={handleMouseOut}
        className={twMerge(`rounded focus:outline-none flex w-full justify-between items-center`, buttonClassName)}
      >
        {Icon ? <Icon width={24} height={24} className={iconClassName} /> : <div>{text}</div>}
        {SideIcon && <SideIcon width={24} height={24} className={iconClassName} />}
      </button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className={dropdownClassNames}>
          <ul className={dropdownMenuListClassNames}>
            {dropdownList.map((listItem, idx) => (
              <li
                key={idx}
                className={dropdownMenuItemClassNames}
                onClick={() => {
                  onItemClick(listItem);
                  closeDropdown();
                }}
              >
                {listItem}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
