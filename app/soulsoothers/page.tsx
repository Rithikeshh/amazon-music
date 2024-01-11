'use client'
import React, { useState } from 'react'
import useFetch from '../utils/useFetch'
import SpinnerLoader from '../components/Loader/SpinnerLoader';
import SeeAllMusicContainer from '../components/SeeAllMusicContainer/SeeAllMusicContainer';

function SoulSoothers() {

    const [page, setPage] = useState(1);
    const {loading, musicList, error} = useFetch("get", "featured", "Soul soother", page)
    
  return (
    <div className='pt-[72px]'>

        {loading ? 
            <SpinnerLoader/>
            :
            <SeeAllMusicContainer songList={musicList} heading="Soul soother"/>
        }
    </div>
  )
}

export default SoulSoothers
