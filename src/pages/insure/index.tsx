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
        <section className='max-w-screen-xl'>
          <div className='flex flex-col'>
            <div className='mb-6 text-2xl font-bold'>
              Select an NFT to Insure
            </div>
            <NftList></NftList>
          </div>
        </section>
      </main>
    </Layout>
  );
}
