import * as React from 'react';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import NftCard from '@/components/NftCard';
import Seo from '@/components/Seo';

import { Nft } from '@/pages/api/nfts/[address]';

export default function HomePage() {
  const [nfts, setNfts] = useState([] as Nft[]);

  useEffect(() => {
    // 0x984c5d268b220784e87fbe8edbb5c6b9f7ba9fc4
    // 0x5c8a4fd1689b22cc7909227c0a664a06683ef0a8
    const address = '0x984c5d268b220784e87fbe8edbb5c6b9f7ba9fc4';
    fetch(`/api/nfts/${address}`).then(async (response) => {
      setNfts(await response.json()) as unknown as Nft[];
    });
  }, []);

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
                <NftCard
                  key={index}
                  listing={true}
                  imageUrl={nft.metadata?.image}
                  name={nft.name}
                  tokenId={parseInt(nft.tokenId)}
                  provide={true}
                ></NftCard>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
