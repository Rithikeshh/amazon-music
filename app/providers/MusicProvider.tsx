'use client'
import React, { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'
import MusicPlayerSlider from '../components/MusicPlayer/MusicPlayer'

const MusicContext = createContext<any>(null)
function MusicProvider({children}:{children:ReactNode}) {

    const [music, setMusic] = useState<any>(null)
    const [duration, setDuration] = useState(0)
    const [paused, setPaused] = useState<any>(true);
    const audioRef = React.useRef<HTMLAudioElement>(null);
  return (
    <MusicContext.Provider value={{music, setMusic, duration, setDuration, paused, setPaused, audioRef}}>
        {children}
        {music && <MusicPlayerSlider music={music} artists={music.artist.map((artist:any)=>artist.name).join(', ')}/>}
    </MusicContext.Provider>
  )
}

export default MusicProvider

export const useMusic = ()=> useContext(MusicContext)