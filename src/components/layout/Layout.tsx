import * as React from 'react';

import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
      <Header></Header>
      <div className='my-6'>{children}</div>
    </div>
  );
}
