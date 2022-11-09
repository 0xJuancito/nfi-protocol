// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { EvmChain } from '@moralisweb3/evm-utils';
import Moralis from 'moralis';
import { NextApiRequest, NextApiResponse } from 'next';

export interface Nft {
  chain: string;
  contractType: string;
  tokenAddress: string;
  tokenId: string;
  tokenUri: string;
  metadata?: Metadata;
  name: string;
  symbol?: string;
  amount: number;
  blockNumberMinted: string;
  blockNumber: string;
  ownerOf: string;
  tokenHash: string;
  lastMetadataSync?: string;
  lastTokenUriSync?: string;
}

export interface Metadata {
  id?: string;
  name: string;
  image: string;
  attributes?: Attribute[];
  image_full_res?: string;
  description: string;
  external_url: string;
  animation_url?: string;
  animation_url_fullres?: string;
}

export interface Attribute {
  trait_type: string;
  value: string;
}

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
});

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  let allNFTs: Nft[] = [];

  const address = req.query.address as string;

  // Fantom - 0xfa
  // BSC - 0x38
  // Polygon - 0x89

  // const chains = [EvmChain.FANTOM, EvmChain.BSC, EvmChain.POLYGON];
  const chains = [EvmChain.FANTOM];

  for (const chain of chains) {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    allNFTs = allNFTs.concat(response.result as unknown as Nft[]);
  }

  allNFTs.forEach((nft) => {
    if (nft.metadata?.image?.startsWith('ipfs://')) {
      nft.metadata.image = nft.metadata.image.replace(
        'ipfs://',
        'https://ipfs.io/ipfs/'
      );
    }
  });

  allNFTs = allNFTs.filter((nft) => nft.metadata?.image);

  res.status(200).json(allNFTs);
}
