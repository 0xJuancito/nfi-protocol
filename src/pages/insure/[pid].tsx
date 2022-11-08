import * as React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NftCard from '@/components/NftCard';
import Seo from '@/components/Seo';

export default function HomePage() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

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
                <div className='font-bold'>200 FTM</div>
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
                <Button variant='primary' className='mt-6'>
                  Complete Listing
                </Button>
              </div>
            </div>
            <div className=''>
              <div className='w-96'>
                <div className='mb-4 font-bold'>Preview</div>
                <NftCard></NftCard>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
