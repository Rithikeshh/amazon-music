'use client'
import React, { useState } from 'react'
import useFetch from '../utils/useFetch'
import SpinnerLoader from '../components/Loader/SpinnerLoader';
import SeeAllMusicContainer from '../components/SeeAllMusicContainer/SeeAllMusicContainer';

function HappySongs() {

    const [page, setPage] = useState(1);
    const {loading, musicList, error} = useFetch("get", "mood", "happy", page)
    
  return (
    <div className='pt-[72px]'>

        {loading ? 
            <SpinnerLoader/>
            :
            <SeeAllMusicContainer songList={musicList} heading="Happy "/>
        }
    </div>
  )
}

export default HappySongs
