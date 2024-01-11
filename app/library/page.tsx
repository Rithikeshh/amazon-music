'use client'
import React from 'react'
import SeeAllMusicContainer from '../components/SeeAllMusicContainer/SeeAllMusicContainer';

function Library() {
    let musicList = [];
    const favMusic = localStorage.getItem("amazon-music-fav");
    if(favMusic){
        const parsedFavMusic = JSON.parse(favMusic)
        for(const music in parsedFavMusic){
            musicList.push(parsedFavMusic[music])
            
        }
    }
  return (
    <div className='pt-[72px]'>
      <SeeAllMusicContainer songList={musicList} heading={"Favorite song library"} />
    </div>
  )
}

export default Library
