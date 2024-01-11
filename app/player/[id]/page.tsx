'use client'
import axios from 'axios'
import styles from '../playerPage.module.css'
import React, { useEffect, useRef, useState } from 'react'
import getHeaderWithProjectId from '@/app/utils/headerWithProjectId'
import SpinnerLoader from '@/app/components/Loader/SpinnerLoader'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useMusic } from '@/app/providers/MusicProvider'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {  useRouter } from 'next/navigation'

function MusicPlayer({ params }: { params: { id: string } }) {
    const router = useRouter()
  const {music, setMusic, paused, setPaused, duration, audioRef} = useMusic()
  const [loading, setLoading] = useState(true)
  const [artists, setArtists] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)
  const mainContainerRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      const favMusic = localStorage.getItem("amazon-music-fav");
      if (favMusic) {
        const parsedFavMusic = JSON.parse(favMusic);
        setIsFavorite(parsedFavMusic[params.id] || false)
      }
      else{
        setIsFavorite(false)
      }
    }
    
  },[])
    
  
  if(mainContainerRef.current)mainContainerRef.current.style.backgroundImage = `url(${music?.thumbnail})`
  
  const getMusic = async ()=>{
    const config = getHeaderWithProjectId()
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/music/song/${params.id}`,
        config
      );
      setMusic(response.data.data)
      setArtists(response.data.data.artist.map((artist:any)=>artist.name).join(', '))
      setPaused(true)
      setLoading(false)
    } catch (error:any) {
      const errMsg = error.response?.data.message.includes("Invalid _id")
      if(errMsg){
        router.push("/pagenotfound")
      }
    }
    
  }
  const handleLike = ()=>{
    const favoriteObj = localStorage.getItem("amazon-music-fav")
    if(favoriteObj){
        const parseFavoriteObj = JSON.parse(favoriteObj)       
        if(isFavorite){
            delete parseFavoriteObj[music._id]
        }
        else{
          parseFavoriteObj[music._id] = music
        }
        localStorage.setItem('amazon-music-fav',JSON.stringify({...parseFavoriteObj}))
    }
    else{
        localStorage.setItem('amazon-music-fav',JSON.stringify({[music._id]: music}))
    }
    setIsFavorite((prev:any)=>!prev)
  }
  const getFullDate = (fullDate:string)=>{
    const month = new Date(fullDate).toLocaleString('default', {month: 'short'})
    const date = new Date(fullDate).getDate()
    const year = new Date(fullDate).getFullYear();
    return `${month} ${date} ${year}`.toUpperCase();
  }
  const formatTime = (time:any) => {
    const totalTime =  Math.floor(time);
    const min = Math.floor(totalTime/60);
    const sec = totalTime%60;
    const formatTimeNo = (no:any) => {
     return no<10 ? `0${no}`: no
    }
    return `${min} : ${formatTimeNo(sec)} MINUTES`
   }
  const handlePlayAndPause = (e:any)=>{
    if (!paused) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setPaused((prev:boolean)=>!prev)
  }
  useEffect(()=>{
    getMusic()
  },[])
  return (
    loading ? 
    <SpinnerLoader/>
    :
    <div className='pt-[72px]'>
      <div ref={mainContainerRef} className={styles['background-img-container']}></div>
      <div className={styles['main-container']}>
        <div className='pb-16'></div>
        <div>
          <div className={styles['music-details-container']}>
            <img 
              src={music.thumbnail} 
              alt={music.title} 
              className='w-[100%] h-[100%] max-w-[280px] mr-[32px]'
            />
            <div className='flex flex-col justify-end overflow-hidden'>
              <p className='text-[aqua] text-[12px] font-bold'>SONG</p>
              <h1 className={styles['music-title-heading']} title={music.title}>{music.title}</h1>
              <span className='truncate w-[100%] max-[700px]:text-center' title={artists}>{artists}</span>
              <p className='text-[13px] mt-[4px] font-[600] text-[rgba(255,255,255,.6)]'>1 SONG  •  {formatTime(duration)}  •  {getFullDate(music.createdAt)}</p>
              <div className='grow flex items-end'>
                <div className='flex justify-between items-center max-[700px]:mt-4'>
                <button 
                  className='bg-[aqua] px-[14px] py-1 rounded-[24px] outline-none mr-6'
                  onClick={handlePlayAndPause}
                >
                  {paused ?
                  <>
                    <PlayArrowIcon className='mr-[4px]' sx={{fontSize: 28, color:'black'}}/>
                    <span className='text-[#000]'>Play</span>
                  </>
                  :
                  <>
                    <PauseIcon className='mr-[4px]' sx={{fontSize: 28, color:'black'}}/>
                    <span className='text-[#000]'>Pause</span>
                  </>
                  }
                </button>
                <span 
                  className={`${isFavorite ? 'text-red-400':'text-gray-300'} cursor-pointer`}
                  onClick={handleLike}
                  title='Add to library'
                >
                  <FavoriteIcon/>
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
