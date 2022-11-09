import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NftCard from '@/components/NftCard';
import Seo from '@/components/Seo';

const nfts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='flex justify-center'>
        <section className='max-w-screen-xl'>
          <div className='flex flex-col'>
            <div className='mt-8 mb-16 text-center text-4xl font-bold'>
              Explore NFTs + Provide Insurance + Earn FTM
            </div>
            <div className='grid grid-cols-4 gap-4 rounded-xl'>
              {nfts.map((nft, index) => (
                <NftCard key={index} listing={true}></NftCard>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
