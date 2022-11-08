import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NftList from '@/components/NftList';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='flex justify-center'>
        <section className='max-w-screen-xl bg-zinc-50'>
          <div className='flex flex-col'>
            <NftList></NftList>
          </div>
        </section>
      </main>
    </Layout>
  );
}
