import Link from 'next/link';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import NftCard from '@/components/NftCard';
import Seo from '@/components/Seo';

import { Nft } from '@/pages/api/nfts/[address]';

export default function HomePage() {
  const [nfts, setNfts] = useState([] as Nft[]);

  useEffect(() => {
    const address = '0x84e9c589aa227d67e1d42ca02c2641504e951fd3';
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
            <div className='mb-6 text-2xl font-bold'>
              Select an NFT to Insure
            </div>
            <div className='grid grid-cols-4 gap-4 rounded-xl'>
              {nfts.map((nft, index) => (
                <Link
                  href={`/insurance/${nft.chain}-${nft.tokenAddress}-${nft.tokenId}`}
                  key={index}
                >
                  <NftCard
                    imageUrl={nft.metadata?.image}
                    name={nft.name}
                  ></NftCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
