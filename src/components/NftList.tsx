import * as React from 'react';

import NextImage from '@/components/NextImage';

const nfts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function NftList() {
  const NftCard = () => (
    <div
      className='flex-1 cursor-pointer rounded-xl bg-white shadow'
      style={{ minWidth: '250px' }}
    >
      <NextImage
        src='https://img.seadn.io/files/0ee4abd0c5333a28bb6244402fb434b8.png?auto=format&fit=max&w=640'
        height='500'
        width='500'
        alt='NFT image'
        className='max-w-full'
        imgClassName='rounded-t-xl'
      ></NextImage>
      <div className='px-5 pt-4 pb-5'>
        <div className='text-sm font-bold'>Azuki #6126</div>
        <div className='mt-2 font-bold'>11.50 ETH</div>
        <div className='text-sm text-zinc-500'>Ends in 2 days</div>
      </div>
    </div>
  );

  return (
    <div className='grid grid-cols-5 gap-4 rounded-xl'>
      {nfts.map((nft, index) => (
        <NftCard key={index}></NftCard>
      ))}
    </div>
  );
}
