import * as React from 'react';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NftCard from '@/components/NftCard';
import Seo from '@/components/Seo';

import { Nft } from '@/pages/api/nfts/[address]';

export default function HomePage() {
  const [allNfts, setAllNfts] = useState([] as Nft[]);
  const [nfts, setNfts] = useState([] as Nft[]);
  const [loaded, setLoaded] = useState(false);

  let loadedFirstTime = false;

  useEffect(() => {
    if (loaded || loadedFirstTime) {
      return;
    }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadedFirstTime = true;
    // 0x984c5d268b220784e87fbe8edbb5c6b9f7ba9fc4
    // 0x5c8a4fd1689b22cc7909227c0a664a06683ef0a8
    const address = '0x984c5d268b220784e87fbe8edbb5c6b9f7ba9fc4';
    fetch(`/api/nfts/${address}`).then(async (response) => {
      const all = (await response.json()) as unknown as Nft[];
      setNfts(all);
      setAllNfts(all);
    });
  }, [loaded]);

  const filterNfts = (chain = '') => {
    // Fantom - 0xfa
    // BSC - 0x38
    // Polygon - 0x89

    if (!chain) {
      setNfts(allNfts);
      return;
    }
    const filtered = allNfts.filter((nft) => nft.chain === chain);
    setNfts(filtered);
  };

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

            <div className='mb-6 flex justify-center gap-10 border-b border-b-zinc-100 pb-6'>
              <UnstyledLink
                href=''
                className='text-xl font-bold hover:text-gray-600'
                onClick={() => filterNfts()}
              >
                ALL
              </UnstyledLink>
              <UnstyledLink
                href=''
                className='text-xl font-bold hover:text-gray-600'
                onClick={() => filterNfts('0xfa')}
              >
                FANTOM
              </UnstyledLink>
              <UnstyledLink
                href=''
                className='text-xl font-bold hover:text-gray-600'
                onClick={() => filterNfts('0x89')}
              >
                POLYGON
              </UnstyledLink>
              <UnstyledLink
                href=''
                className='text-xl font-bold hover:text-gray-600'
                onClick={() => filterNfts('0x38')}
              >
                BNB SMART CHAIN
              </UnstyledLink>
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
