'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavItem {
  icon: React.ReactNode;
  path: string;
}

const BottomNavBar: React.FC = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      ),
      path: '/previous'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      path: '/add'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      ),
      path: '/next'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="relative h-16">
        <div className="absolute left-1/2 -top-8 -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <Link href="/add" className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center">
            {navItems[1].icon}
          </Link>
        </div>
        <nav className="h-full bg-yellow-400 flex items-center justify-around px-4 rounded-t-2xl shadow-lg">
          {navItems.map((item, index) => (
            index !== 1 && (
              <Link
                key={index}
                href={item.path}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  pathname === item.path
                    ? 'bg-yellow-600 text-white'
                    : 'bg-yellow-300 text-yellow-800 hover:bg-yellow-500 hover:text-white'
                }`}
              >
                {item.icon}
              </Link>
            )
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BottomNavBar;