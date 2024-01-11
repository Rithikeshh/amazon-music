'use client'
import React, { useState } from 'react'
import useFetch from '../utils/useFetch'
import SpinnerLoader from '../components/Loader/SpinnerLoader';
import SeeAllMusicContainer from '../components/SeeAllMusicContainer/SeeAllMusicContainer';

function TrendingSongs() {

  const [page, setPage] = useState(1);
  const {loading, musicList, error} = useFetch("get", "featured", "Trending songs", page)
    
  return (
    <div className='pt-[72px]'>

      {loading ? 
          <SpinnerLoader/>
          :
          <SeeAllMusicContainer songList={musicList} heading="Trending songs"/>
      }
    </div>
  )
}

export default TrendingSongs
