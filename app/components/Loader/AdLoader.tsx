import Image from 'next/image'
import React from 'react'

function AdLoader() {
  return (
    <div className='absolute w-[100vw] h-[100%] flex top-0 justify-center items-center'>
      <Image
            src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
            alt='amazon-music-logo'
            width={220}
            height={50}
            className='relative top-[-50px]'
        />
    </div>
  )
}

export default AdLoader
