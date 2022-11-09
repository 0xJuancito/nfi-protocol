import NextImage from '@/components/NextImage';

type NftCardProps = {
  imageUrl?: string;
  name?: string;
  listing?: boolean;
};

export default function NftCard({ imageUrl, name, listing }: NftCardProps) {
  return (
    <div
      className='group flex-1 cursor-pointer rounded-xl bg-white shadow hover:shadow-xl'
      style={{ minWidth: '250px' }}
    >
      {listing ? (
        <div className='relative'>
          <div className='absolute top-3 right-3 w-fit rounded-xl bg-sky-700 px-2 py-1 text-xs text-white'>
            7d left
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
                  <span className='font-bold'>200 FMT</span>
                  <span> if floor price drops </span>
                  <span className='font-bold'>50%</span>
                </div>
              </div>
              <div>
                <div className='mt-3 text-sm font-bold'>Floor Price</div>
                <div className='mt-1 text-xs font-bold'>• Initial: 200 FTM</div>
                <div className='text-xs font-bold'>• Current: 210 FTM</div>
                <div className='pb-4 text-xs font-bold'>• Limit: 100 FTM</div>
              </div>
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
                    +20 FTM
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {listing ? (
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
    </div>
  );
}
