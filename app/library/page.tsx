'use client'
import React, { useEffect, useState } from 'react'
import SeeAllMusicContainer from '../components/SeeAllMusicContainer/SeeAllMusicContainer';

function Library() {
    const [musicList, setMusicList] = useState<any>([]);
    
    useEffect(()=>{
      if (typeof window !== 'undefined') {
        const favMusic = localStorage.getItem("amazon-music-fav");
        if(favMusic){
            const parsedFavMusic = JSON.parse(favMusic)
            const list:any = []
            for(const music in parsedFavMusic){
                list.push(parsedFavMusic[music])
            }
            setMusicList((prev:any)=>{
              const newValue = [...list]
              return newValue
            })
        }
      }
    },[])
  return (
    <div className='pt-[72px]'>
      <SeeAllMusicContainer songList={musicList} heading={"Favorite song library"} />
    </div>
  )
}

export default Library
