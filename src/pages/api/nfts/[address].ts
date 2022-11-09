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

  const chains = [EvmChain.FANTOM, EvmChain.BSC, EvmChain.POLYGON];
  // const chains = [EvmChain.FANTOM];

  for (const chain of chains) {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    allNFTs = allNFTs.concat(
      JSON.parse(JSON.stringify(response.result)) as unknown as Nft[]
    );
  }

  const polygonResponse = await Moralis.EvmApi.nft.getWalletNFTs({
    address: `0xd6eFf8F07cAF3443A1178407d3de4129149D6eF6`,
    chain: EvmChain.POLYGON,
  });

  allNFTs = allNFTs.concat(
    JSON.parse(JSON.stringify(polygonResponse.result)) as unknown as Nft[]
  );

  const bscResponse = await Moralis.EvmApi.nft.getWalletNFTs({
    address: `0x4bddc49f6a38b3686b2e4c788cb9219ce1f6d7b0`,
    chain: EvmChain.BSC,
  });

  allNFTs = allNFTs.concat(
    JSON.parse(JSON.stringify(bscResponse.result)) as unknown as Nft[]
  );

  allNFTs = allNFTs.filter(
    (nft) =>
      nft.metadata?.image &&
      nft.name &&
      !nft.name.toLowerCase().startsWith('8bitcats') &&
      !nft.name.toLowerCase().startsWith('vefba') &&
      !nft.name.toLowerCase().includes('creed') &&
      !nft.name.toLowerCase().includes('saudi') &&
      !nft.name.toLowerCase().includes('middle') &&
      !nft.name.toLowerCase().includes('beast') &&
      !nft.name.toLowerCase().includes('never') &&
      !nft.name.toLowerCase().includes('omega') &&
      !nft.name.toLowerCase().includes('dissolution') &&
      !nft.name.toLowerCase().includes('gottle')
  );

  allNFTs.forEach((nft) => {
    if (nft.metadata?.image?.startsWith('ipfs://')) {
      nft.metadata.image = nft.metadata.image.replace(
        'ipfs://',
        'https://ipfs.io/ipfs/'
      );
    } else if (nft.metadata?.image && nft.chain.toLowerCase() === '0xfa') {
      // nft.metadata.image = `https://media-nft.paintswap.finance/250_${nft.tokenAddress}_${nft.tokenId}.jpg`;
    }
  });

  res.status(200).json(allNFTs);
}
