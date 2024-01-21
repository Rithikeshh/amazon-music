'use client'

import AdLoader from './components/Loader/AdLoader'
import { useEffect, useState } from 'react'
import getAllMusic from './utils/getAllMusics'
import MusicListWrapper from './components/MusicListWrapper/MusicListWrapper'

export default function Home() {

  const [isLoading, setIsLoading] = useState(true)
  const [trendingSongs, setTrendingSongs] = useState([])
  const [top20List, setTop20List] = useState([])
  const [romantic, setRomantic] = useState([])
  const [happySongs, setHappySongs] = useState([])
  const [sadSongs, setsadSongs] = useState([])
  const [soulSoother, setSoulSoother] = useState([])
  
  useEffect(()=>{
    getAllMusic(
      setIsLoading, 
      setTrendingSongs,
      setTop20List,
      setRomantic,
      setHappySongs,
      setsadSongs,
      setSoulSoother
    )
  },[])

    
  return (
    <div className='pt-[72px] mb-32'>
      {isLoading ?
        <AdLoader/>
        :
        <div>
          <MusicListWrapper heading={'Trending Songs'} songList={trendingSongs}/>
          <MusicListWrapper heading={'Top 20 of this week'} songList={top20List}/>
          <MusicListWrapper heading={'Romantic Songs'} songList={romantic}/>
          <MusicListWrapper heading={'Sad Songs'} songList={sadSongs}/>
          <MusicListWrapper heading={'Soul Soothers'} songList={soulSoother}/>
          <MusicListWrapper heading={'Happy'} songList={happySongs}/>
        </div>
      }
    </div>
  )
}
