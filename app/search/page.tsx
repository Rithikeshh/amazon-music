'use client'
import React, { useEffect, useState } from 'react'
import styles from './searchPage.module.css'
import { useRouter } from 'next/navigation'
import { useSearchValue } from '../providers/SearchValueProvider'
import getSearchedMusic from '../utils/getSearchedMusic'
import SeeAllMusicContainer from '../components/SeeAllMusicContainer/SeeAllMusicContainer'

const musicByCategory = [
    {category: "Trending", route: "/trendingsongs", styleClass: "trending"},
    {category: "Top 20 of this week", route: "/top20ofthisweek", styleClass:"top20"},
    {category: "Romantic", route: "/romanticsongs", styleClass:"romantic"},
    {category: "Sad", route: "/sadsongs", styleClass:"sad"},
    {category: "Soul Soothers", route: "/soulsoothers", styleClass:"soul"},
    {category: "Happy", route: "/happy", styleClass:"happy"},
]
function Search() {

    const searchValue = useSearchValue()?.searchValue;
    const [searchedMusic, setSearchedMusic] = useState([])
    useEffect(()=>{
        if(searchValue){
            getSearchedMusic(searchValue, setSearchedMusic)
        }

    },[searchValue])
    return (
        <div className='pt-[76px]'>
        
            {searchValue ?
                <SearchedSong searchedMusic={searchedMusic}/>
                :
                <SuggestedSongsCategort/>
            }
        
        </div>
    )
}

export default Search

function SearchedSong({searchedMusic}:{searchedMusic: Array<any>}){
    const searchValue = useSearchValue()?.searchValue;
    return(
        <>
            <SeeAllMusicContainer songList={searchedMusic} heading={`Search results for "${searchValue}"`}/>
        </>
    )
}

function SuggestedSongsCategort(){
    const router = useRouter()
    return(
        <div className='p-6'>
            <h2 className='mb-4 text-[22px] font-[700]'>Songs By Category</h2>
            <div className={styles['grid-layout']}>
                {
                    musicByCategory.map((item, index) =>(
                        <div 
                            key={index} 
                            className={`${styles[item.styleClass]} ${styles['category-card']}`}
                            onClick={()=>router.push(item.route)}
                        >
                            <p>{item.category}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}