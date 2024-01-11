'use client'
import React, { useState } from 'react'
import useFetch from '../utils/useFetch'
import SpinnerLoader from '../components/Loader/SpinnerLoader';
import SeeAllMusicContainer from '../components/SeeAllMusicContainer/SeeAllMusicContainer';

function Top20ofthisweek() {

    const [page, setPage] = useState(1);
    const {loading, musicList, error} = useFetch("get", "featured", "Top 20 of this week", page)
    
  return (
    <div className='pt-[72px]'>

        {loading ? 
            <SpinnerLoader/>
            :
            <SeeAllMusicContainer songList={musicList} heading="Top 20 of this week"/>
        }
    </div>
  )
}

export default Top20ofthisweek
