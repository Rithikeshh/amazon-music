'use client'
import React, { useRef, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './MusicListWrapper.module.css'
import MusicCard from '../MusicCard/MusicCard';
import { useRouter } from 'next/navigation';

function MusicListWrapper({songList, heading}:{songList: Array<any>, heading: String}) {

  const wrapperRef = useRef<any>(null)
  const [value, setValue] = useState(1); // for forward and back buttons disable (yet to implement)
  const page = heading.split(" ").join('').toLowerCase();
  const router = useRouter()
  
  const handleScrollLeft = (e:any)=>{
    wrapperRef.current.scrollLeft -= document.body.clientWidth;
  }
  const handleScrollRight = (e:any)=>{
    wrapperRef.current.scrollLeft += document.body.clientWidth;
  }
  const handleChangePage = ()=>{
    router.push(`/${page}`)
  }
  return (
    <div className='pt-6 pb-2'>
      <header className='h-[40px] mb-4 flex items-center justify-between px-[20px] min-[480px]:px-[36px]'>
        <h2 className='text-[22px] font-bold'>{heading}</h2>
        <div className='flex items-center justify-between'>
          <button 
            className='flex hover:text-[#a0f1f5] hover:scale-[1.1] px-4'
            onClick={handleScrollLeft}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
          </button>
          <button 
            className='flex hover:text-[#a0f1f5] hover:scale-[1.1] px-4'
            onClick={handleScrollRight}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
          </button>
          <button onClick={handleChangePage} className='px-4 py-[6px] bg-[#313131] text-[13px] font-bold rounded-[24px] whitespace-nowrap'>SEE ALL</button>
        </div>
      </header>
      <div className='relative'>
        <div 
          className={styles['wrapper']}
          ref={wrapperRef}
        >
          {songList.map((music)=>(

            <MusicCard key={music._id} music={music} cardType={"music-card-type1"}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MusicListWrapper
