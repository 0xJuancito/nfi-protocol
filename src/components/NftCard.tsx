import * as React from 'react';
import { Store } from 'react-notifications-component';
import { useSignMessage } from 'wagmi';

import 'react-datepicker/dist/react-datepicker.css';

import NextImage from '@/components/NextImage';

type NftCardProps = {
  imageUrl?: string;
  name?: string;
  listing?: boolean;
  tokenId?: number;
  provide?: boolean;
  claimable?: boolean;
  policy?: boolean;
  received?: boolean;
  provided?: boolean;
  listed?: boolean;
  rugged?: boolean;
  current?: number;
};

const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export default function NftCard({
  imageUrl = '',
  name = '',
  listing,
  tokenId = 0,
  provide = false,
  claimable = false,
  policy = false,
  provided = false,
  received = false,
  listed = false,
  rugged = false,
  current,
}: NftCardProps) {
  // Demo
  const seed = 1;
  let floorInitial = (cyrb53(name, seed) % 1000) + 200;
  if (tokenId === 4100) {
    floorInitial = 1200;
  }
  if (name === 'Magicats') {
    current = 1200;
  }

  const percentage = ((((cyrb53(name, seed) + tokenId) % 9) + 1) * 5) / 100;

  const floor = {
    initial: floorInitial,
    percentage: Math.round(percentage * 100),
    current: current ? current : Math.round(floorInitial * 1.1),
    limit: Math.round(floorInitial - percentage * floorInitial),
    compensation: Math.round(floorInitial * percentage),
    premium: Math.round((floorInitial * percentage) / 5),
    days: ((cyrb53(name, seed) + tokenId) % 14) + 1,
  };

  const { signMessage } = useSignMessage({
    message: JSON.stringify(floor, null, 2),
    onSuccess() {
      Store.addNotification({
        title: 'Insurance was provided!',
        message: 'Check it out on My Policies section',
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

  const provideInsurance = () => {
    if (!provide && !claimable) {
      return;
    }
    signMessage();
  };

  const getColorBg = () => {
    if (rugged) {
      return 'bg-red-100';
    } else if (claimable) {
      return 'bg-green-100';
    } else {
      return 'bg-white';
    }
  };

  return (
    <div
      className={`group flex-1 cursor-pointer rounded-xl shadow hover:shadow-xl ${getColorBg()}`}
      style={{ minWidth: '250px' }}
      onClick={() => provideInsurance()}
    >
      {listed ? (
        <div className='relative'>
          <div className='absolute top-3 left-3 w-fit rounded-xl bg-blue-600 px-2 py-1 text-xs text-white'>
            Listed
          </div>
        </div>
      ) : (
        ''
      )}

      {provided && !claimable ? (
        <div className='relative'>
          <div className='absolute top-3 left-3 w-fit rounded-xl bg-cyan-700 px-2 py-1 text-xs text-white'>
            Provided Insurance
          </div>
        </div>
      ) : (
        ''
      )}

      {received ? (
        <div className='relative'>
          <div className='absolute top-3 left-3 w-fit rounded-xl bg-sky-700 px-2 py-1 text-xs text-white'>
            Received
          </div>
        </div>
      ) : (
        ''
      )}

      {claimable && !rugged ? (
        <div className='relative'>
          <div className='absolute top-3 left-3 w-fit rounded-xl bg-green-600 px-2 py-1 text-xs text-white'>
            Claimable Compensation
          </div>
        </div>
      ) : (
        ''
      )}

      {rugged ? (
        <div className='relative'>
          <div className='absolute top-3 left-3 w-fit rounded-xl bg-red-600 px-2 py-1 text-xs text-white'>
            Rugged
          </div>
        </div>
      ) : (
        ''
      )}

      {listing ? (
        <div className='relative'>
          <div className='absolute top-3 right-3 w-fit rounded-xl  bg-sky-700 px-2 py-1 text-xs text-white'>
            {claimable ? 'Finished' : `${floor.days}d left`}
          </div>
        </div>
      ) : (
        ''
      )}

      <div>
        <NextImage
          src={imageUrl}
          height='500'
          width='500'
          alt='NFT image'
          className='max-w-full'
          imgClassName='rounded-t-xl aspect-square object-cover'
        ></NextImage>
        <div className='px-5 pt-4 pb-5'>
          <div className='text-xl font-bold'>{name}</div>

          {listing ? (
            <div>
              <div className='border-b border-b-zinc-200 pb-4'>
                <div className='mt-4 mb-1 text-sm font-bold'>Compensation</div>
                <div className='flex items-center gap-1 text-xs'>
                  <span className='font-bold'>{floor.compensation} FMT</span>
                  <span> if floor price drops </span>
                  <span className='font-bold'>{floor.percentage}%</span>
                </div>
              </div>
              <div>
                <div className='mt-3 text-sm font-bold'>Floor Price</div>
                <div className='mt-1 text-xs font-bold'>
                  • Initial: {floor.initial} FTM
                </div>
                <div className='text-xs font-bold'>
                  • Current: {floor.current} FTM
                </div>
                <div className='pb-4 text-xs font-bold'>
                  • Liquidation: {floor.limit} FTM
                </div>
              </div>
              {policy ? (
                ''
              ) : (
                <div className='border-t border-t-zinc-200 pt-4'>
                  {/* <div className='text-sm font-bold'>Earn</div> */}
                  <div className='flex gap-2 '>
                    <NextImage
                      src='/fantom.png'
                      height='30'
                      width='30'
                      alt='Fantom'
                      // className='rounded-full'
                      imgClassName='rounded-full'
                    ></NextImage>
                    <span className='flex items-center justify-center text-2xl font-bold'>
                      +{floor.premium} FTM
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {provide ? (
        <div
          className='relative hidden group-hover:block'
          style={{ top: '-68px' }}
        >
          <div className='absolute w-full rounded-bl-xl rounded-br-xl bg-blue-500 px-2 py-5 text-center text-xl font-bold text-white'>
            Provide Insurance
          </div>
        </div>
      ) : (
        ''
      )}
      {claimable ? (
        <div
          className='relative hidden group-hover:block'
          style={{ top: '-68px' }}
        >
          <div className='absolute w-full rounded-bl-xl rounded-br-xl bg-blue-500 px-2 py-5 text-center text-xl font-bold text-white'>
            {rugged ? 'Claim Insurance' : 'Claim Compensation'}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
