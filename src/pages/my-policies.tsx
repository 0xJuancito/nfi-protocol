import * as React from 'react';

import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NftCard from '@/components/NftCard';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='flex justify-center'>
        <section className='max-w-screen-xl'>
          <div className='flex flex-col'>
            <div className='mb-6 flex justify-center gap-10 border-b border-b-zinc-100 pb-6'>
              <UnstyledLink
                href=''
                className='text-xl font-bold hover:text-gray-600'
              >
                INSURED NFTS
              </UnstyledLink>
              <UnstyledLink
                href=''
                className='text-xl font-bold hover:text-gray-600'
              >
                INSURANCE PROVIDED
              </UnstyledLink>
            </div>
            <div className='grid grid-cols-4 gap-4 rounded-xl'>
              <NftCard
                listing={true}
                imageUrl='https://ipfs.io/ipfs/QmVf4b2Ksev3CVbe8CNSxN5YwG2Mcgj8G9xhzX7wLn6esr'
                name='Magicats'
                tokenId={4100}
                provide={true}
              ></NftCard>
              <NftCard
                listing={true}
                imageUrl='https://ipfs.io/ipfs/QmW5zR6f6GwJvVXFQzRu2tfHYqqXkLZ7eUfHdqqMGchM4S'
                name='Magicats'
                tokenId={687}
                provide={true}
              ></NftCard>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
