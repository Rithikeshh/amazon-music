import React, { useState } from 'react'
import styles from './MusicCard.module.css'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers/AuthProvider';
import AskForSignInModal from '../AskForSignInModal/AskForSignInModal';
import { useAskForSign } from '@/app/providers/AskForSignProvider';




function MusicCard({music, cardType}:{music:any, cardType:any}) {
    
    const router = useRouter();
    const {thumbnail, artist, title, _id} = music
    const artistNames = artist.map((artist:any)=>artist.name).join(', ')
    const [showHoverEffect, setShowHoverEffect] = useState<Boolean>(false)
    const askForSignInModal = useAskForSign()?.askForSignInModal
    const setAskForSignInModal  = useAskForSign()?.setAskForSignInModal
    const isLoggedIn = useAuth()?.isLoggedIn;
    
    const handleNavigation = () => {
        if(isLoggedIn){
            router.push('/player/'+ _id);
        }
        else{
            setAskForSignInModal(true)
        }
    }
    

  return (
    <>
    <div className={styles[cardType]}>
        <div 
            className='w-[100%] relative'
            onMouseOver={()=>setShowHoverEffect(true)}
            onMouseOut={()=>setShowHoverEffect(false)}
            onClick={handleNavigation}
        >
            <img className={styles['music-cover']} src={thumbnail} alt="poster" />
            {showHoverEffect && 
            <div className={styles['hover-effect']}>
                <button className={styles['play-btn']}>
                    <svg className='pl-1' xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 384 512"><path fill='currentColor' d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                </button>
            </div>
            }
        </div>
        <div className='mt-[8px]'>
            <p className='truncate hover:text-[aqua] pr-1 cursor-pointer' title={title}>{title}</p>
            <div className='flex justify-between items-center'>
                <p className='truncate pr-1 mt-1 text-[14px] text-gray-400' title={artistNames}>{artistNames}</p>
                
            </div>
        </div>
    </div>
    {askForSignInModal && <AskForSignInModal setAskForSignInModal={setAskForSignInModal}/>}
    </>
  )
}

export default MusicCard
