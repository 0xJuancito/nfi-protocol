import { ConnectButton } from '@rainbow-me/rainbowkit';
import * as React from 'react';

import '@rainbow-me/rainbowkit/styles.css';

import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';

const links = [
  // { href: '/', label: 'Explore' },
  // { href: '/', label: 'Provide Insurance' },
  { href: '/insure', label: 'Insure' },
  { href: '/my-policies', label: 'My Policies' },
];

export default function Header() {
  return (
    <header className='sticky top-0 z-50 flex h-16 items-center border-b border-b-zinc-100 bg-white'>
      <div className='layout flex h-14 max-w-screen-xl items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          <NextImage
            src='/logo3.png'
            height='45'
            width='304'
            alt='Logo'
          ></NextImage>
        </UnstyledLink>
        <nav className='flex gap-6'>
          <ul className='flex items-center justify-between space-x-6'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`} className='font-bold'>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
}
