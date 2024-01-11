import Link from 'next/link'
import React from 'react'

function notFound() {
  return (
    <div className='pt-[72px] flex justify-center items-center flex-col h-[100vh]'>
      <h2 className='font-[700] text-[22px] '>Page Not Found</h2>
      <p className='font-[500] text-[18px]'>Could not find requested resource</p>
      <Link className='text-[blue] font-[500]' href="/">Return Home</Link>
    </div>
  )
}

export default notFound
