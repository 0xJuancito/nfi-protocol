import * as React from 'react';

import Layout from '@/components/layout/Layout';
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
            <div className='mt-8 mb-16 text-center text-4xl font-bold'>
              My Insurance Policies
            </div>
            <div className='grid grid-cols-4 gap-4 rounded-xl'>
              <NftCard
                listing={true}
                imageUrl='https://ipfs.io/ipfs/QmVf4b2Ksev3CVbe8CNSxN5YwG2Mcgj8G9xhzX7wLn6esr'
                name='Magicats'
                tokenId={4100}
                policy={true}
                listed={true}
              ></NftCard>
              <NftCard
                listing={true}
                imageUrl='https://ipfs.io/ipfs/bafybeihoygqnspjf2nr5igc67a7ox7jldv35dfzzosvkpacfmkubpjazoi/306.png'
                name="Punk'd Apes"
                tokenId={306}
                policy={true}
                provided={true}
              ></NftCard>
              {/* <NftCard
                listing={true}
                imageUrl='https://ipfs.io/ipfs/QmW5zR6f6GwJvVXFQzRu2tfHYqqXkLZ7eUfHdqqMGchM4S'
                name='Magicats'
                tokenId={687}
                policy={true}
                claimable={true}
                provided={true}
              ></NftCard> */}
              <NftCard
                listing={true}
                imageUrl='https://metadata-bi3.pages.dev/revoke.bar/nft.png?nft=all'
                name='Warning'
                tokenId={666}
                policy={true}
                claimable={true}
                rugged={true}
                current={5}
              ></NftCard>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
