import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Store } from 'react-notifications-component';
import { useSignMessage } from 'wagmi';

import 'react-datepicker/dist/react-datepicker.css';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NftCard from '@/components/NftCard';
import Seo from '@/components/Seo';

import { Nft } from '@/pages/api/nfts/[address]';

export default function HomePage() {
  const [nft, setNft] = useState(null as unknown as Nft);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const router = useRouter();

  // Example
  const message = {
    premium: 20,
    premiumToken: 'FTM',
    compensation: 100,
    compensationToken: 'FTM',
    floorPriceCoverage: '50',
    durationFrom: 1667999121,
    durationTo: 1668603921,
  };
  const { signMessage } = useSignMessage({
    message: JSON.stringify(message, null, 2),
    onSuccess() {
      Store.addNotification({
        title: 'Listing was successful!',
        message: 'Check it out on the main section',
        type: 'success',
        insert: 'bottom',
        container: 'bottom-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    },
  });

  useEffect(() => {
    if (!router.query.pid) {
      return;
    }
    const pid = router.query.pid;
    fetch(`/api/nft/${pid}`).then(async (response) => {
      setNft(await response.json()) as unknown as Nft;
    });
  }, [router.query.pid]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='mt-4 flex justify-center'>
        <section className='w-full max-w-screen-lg'>
          <div className='flex justify-center gap-36'>
            <div className='flex w-full flex-col'>
              <div className='mb-6 text-2xl font-bold'>
                List NFT for Insurance
              </div>
              <div className='flex justify-between rounded-lg border border-zinc-300 p-4'>
                <div>Floor Price</div>
                <div className='font-bold'>1200 FTM</div>
              </div>
              {/* Premium */}
              <div className='mt-6 font-bold'>Premium</div>
              <div className='mt-2 flex'>
                <input
                  type='text'
                  placeholder='Amount'
                  className='tl-lg flex-1 rounded-tl-lg rounded-bl-lg border border-zinc-300 bg-white'
                />
                <div className='flex w-14 items-center justify-center rounded-tr-lg rounded-br-lg bg-zinc-200 px-4 font-bold'>
                  FTM
                </div>
              </div>
              {/* Compensation */}
              <div className='mt-6 font-bold'>Compensation</div>
              <div className='mt-2 flex'>
                <input
                  type='text'
                  placeholder='Amount'
                  className='tl-lg flex-1 rounded-tl-lg rounded-bl-lg border border-zinc-300 bg-white'
                />
                <div className='flex w-14 items-center justify-center rounded-tr-lg rounded-br-lg bg-zinc-200 px-4 font-bold'>
                  FTM
                </div>
              </div>
              {/* Coverage */}
              <div className='mt-6 font-bold'>Floor Price Coverage</div>
              <div className='mt-2 flex'>
                <input
                  type='text'
                  placeholder='Floor Down %'
                  className='tl-lg flex-1 rounded-tl-lg rounded-bl-lg border border-zinc-300 bg-white'
                />
                <div className='flex w-14 items-center justify-center rounded-tr-lg rounded-br-lg bg-zinc-200 px-4 font-bold'>
                  %
                </div>
              </div>
              {/* Date */}
              <div className='mt-6 font-bold'>Duration</div>
              <DatePicker
                className='mt-2 w-full flex-1 rounded-lg border-zinc-200'
                selectsRange={true}
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                onChange={(update: React.SetStateAction<null[]>) => {
                  setDateRange(update);
                }}
              />
              {/* Button */}
              <div>
                <Button
                  variant='primary'
                  className='mt-6'
                  onClick={() => signMessage()}
                >
                  Complete Listing
                </Button>
              </div>
            </div>
            <div className=''>
              <div className='w-96'>
                <div className='mb-4 font-bold'>Preview</div>
                <NftCard
                  listing={true}
                  imageUrl={nft?.metadata?.image}
                  name={nft?.name}
                  tokenId={4100}
                ></NftCard>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
