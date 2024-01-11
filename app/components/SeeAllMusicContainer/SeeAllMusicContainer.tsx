import React from 'react'
import styles from './SeeAllMusicContainer.module.css'
import MusicCard from '../MusicCard/MusicCard'

function SeeAllMusicContainer({songList, heading}:{songList: Array<any>, heading: String}) {
  return (
    <div className='py-6 mb-16'>
        <header className='h-[40px] mb-4 flex items-center px-[20px] min-[480px]:px-[36px]'>
            <h2 className='text-[22px] font-bold'>{heading}</h2>
        </header>
        <div className={styles['wrapper']}>
            {songList.map((music)=>(
                <MusicCard key={music._id} music={music} cardType={"music-card-type2"}/>
            ))}
        </div>
    </div>
  )
}

export default SeeAllMusicContainer
