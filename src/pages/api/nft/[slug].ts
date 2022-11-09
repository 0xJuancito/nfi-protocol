// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { EvmChain } from '@moralisweb3/evm-utils';
import Moralis from 'moralis';
import { NextApiRequest, NextApiResponse } from 'next';

import { Nft } from '@/pages/api/nfts/[address]';

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
});

// Fantom - 0xfa
// BSC - 0x38
// Polygon - 0x89

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const [chainId, address, tokenId] = (req.query.slug as string).split('-');

  let chain = EvmChain.FANTOM;
  if (chainId === '0x38') {
    chain = EvmChain.BSC;
  }
  if (chainId === '0x89') {
    chain = EvmChain.POLYGON;
  }

  const response = await Moralis.EvmApi.nft.getNFTMetadata({
    chain,
    address,
    tokenId,
  });

  const nft =
    (JSON.parse(JSON.stringify(response?.result)) as unknown as Nft) || null;

  if (nft.metadata?.image?.startsWith('ipfs://')) {
    nft.metadata.image = nft.metadata.image.replace(
      'ipfs://',
      'https://ipfs.io/ipfs/'
    );
  } else if (nft.metadata?.image && nft.chain.toLowerCase() === '0xfa') {
    // nft.metadata.image = `https://media-nft.paintswap.finance/250_${nft.tokenAddress}_${nft.tokenId}.jpg`;
  }

  res.status(200).json(nft);
}
