import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';

const links = [
  { href: '/', label: 'Route 1' },
  { href: '/', label: 'Route 2' },
];

export default function Header() {
  return (
    <header className='sticky top-0 z-50 flex h-16 items-center bg-white'>
      <div className='layout flex h-14 max-w-screen-xl items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          <NextImage
            src='/logo.png'
            height='45'
            width='305'
            alt='Logo'
          ></NextImage>
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
