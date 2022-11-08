import * as React from 'react';

import NftCard from '@/components/NftCard';

const nfts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function NftList() {
  return (
    <div className='grid grid-cols-4 gap-4 rounded-xl'>
      {nfts.map((nft, index) => (
        <NftCard key={index}></NftCard>
      ))}
    </div>
  );
}
