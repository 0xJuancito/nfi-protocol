import NextImage from '@/components/NextImage';

export default function NftCard() {
  return (
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
        <div className='text-xl font-bold'>Magicats</div>
        <div className='mt-2 border-b border-b-zinc-200 pb-4 text-sm font-bold'>
          Floor Price: 100 FTM
        </div>
        <div className='mt-4 text-sm font-bold'>Compensation</div>
        <div className='flex items-center gap-1 text-sm'>
          {/* <NextImage
            src='/fantom.png'
            height='15'
            width='15'
            alt='Fantom'
            className='inline'
            imgClassName='rounded-full'
          ></NextImage> */}
          <span className='font-bold'>200 FMT</span>
          <span> if floor price drops </span>
          <span className='font-bold'>50%</span>
        </div>
        <div className='mt-4 text-sm text-zinc-500'>Ends in 2 days</div>
        <div className='mt-4 border-t border-t-zinc-200 pt-4'>
          {/* <div className='text-sm font-bold'>Earn</div> */}
          <div className='flex gap-4 '>
            <NextImage
              src='/fantom.png'
              height='30'
              width='30'
              alt='Fantom'
              // className='rounded-full'
              imgClassName='rounded-full'
            ></NextImage>
            <span className='flex items-center justify-center text-2xl font-bold'>
              20 FTM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
