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
  dropdownPosition?: 'top' | 'bottom';
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
  dropdownPosition = 'bottom',
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
      setTimeout(() => {
        const firstItem = dropdownRef.current?.querySelector('li');
        if (firstItem) {
          (firstItem as HTMLLIElement).focus();
        }
      }, 0);
    }
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
    iconButtonRef.current?.focus();
  };

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      // 드롭다운이 열릴 때 자동으로 스크롤해 메뉴가 화면에 모두 보이도록
      dropdownRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [isDropdownOpen]);

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleDropdown();
      event.preventDefault();
    } else if (event.key === 'Escape') {
      closeDropdown();
      event.preventDefault();
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    const target = event.target as HTMLLIElement;

    if (event.key === 'ArrowDown') {
      const nextElement = target.nextElementSibling as HTMLLIElement | null;
      if (nextElement) {
        nextElement.focus();
        event.preventDefault();
      } else {
        const firstElement = dropdownRef.current?.querySelector('li');
        if (firstElement) {
          (firstElement as HTMLLIElement).focus();
          event.preventDefault();
        }
      }
    } else if (event.key === 'ArrowUp') {
      const prevElement = target.previousElementSibling as HTMLLIElement | null;
      if (prevElement) {
        prevElement.focus();
        event.preventDefault();
      } else {
        const lastElement = dropdownRef.current?.querySelector('li:last-of-type');
        if (lastElement) {
          (lastElement as HTMLLIElement).focus();
          event.preventDefault();
        }
      }
    } else if (event.key === 'Escape') {
      closeDropdown();
      event.preventDefault();
    } else if (event.key === 'Enter' || event.key === ' ') {
      onItemClick(target.textContent || '');
      closeDropdown();
      event.preventDefault();
    }
  };

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

  const baseClassNames = twMerge(clsx('relative inline-block text-nowrap', className));

  const dropdownClassNames = twMerge(
    clsx(
      'z-10 absolute bg-white rounded-xl text-slate-700 max-h-64 sm:max-h-32 lg:max-h-32 overflow-y-auto',
      dropdownAlign === 'right' ? 'right-0 shadow-[4px_4px_10px_-2px_rgba(0,0,0,0.05)]' : 'w-full shadow-lg left-0',
      dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
    )
  );

  const dropdownMenuListClassNames = twMerge(
    clsx('flex flex-col text-nowrap text-lg justify-center items-center text-center', dropdownListClassName)
  );

  const dropdownMenuItemClassNames = twMerge(
    clsx(
      'w-full flex max-h-[100px] overflow-y-auto',
      'px-4 pt-2 pb-[6px] hover:bg-gray-100 cursor-pointer first:rounded-t-xl last:rounded-b-xl',
      dropdownItemClassName
    )
  );

  return (
    <button
      ref={iconButtonRef}
      type='button'
      tabIndex={0}
      onClick={toggleDropdown}
      onKeyDown={handleButtonKeyDown}
      className={`rounded flex w-full justify-between items-center ${baseClassNames} ${buttonClassName}`}
      aria-haspopup='menu'
      aria-expanded={isDropdownOpen}
      aria-controls='dropdown-menu'
    >
      {Icon ? <Icon width={24} height={24} className={iconClassName} /> : <span>{text}</span>}
      {SideIcon && <SideIcon width={24} height={24} className={iconClassName} />}

      {isDropdownOpen && (
        <div ref={dropdownRef} id='dropdown-menu' className={dropdownClassNames}>
          <ul className={dropdownMenuListClassNames}>
            {dropdownList.map((listItem, idx) => (
              <li
                key={idx}
                role='menuitem'
                tabIndex={0}
                className={dropdownMenuItemClassNames}
                onClick={() => {
                  onItemClick(listItem);
                  closeDropdown();
                }}
                onKeyDown={handleListKeyDown}
              >
                {listItem}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropdownMenu;
