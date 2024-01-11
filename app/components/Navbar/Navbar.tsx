'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./Navbar.module.css"
import Link from 'next/link'
import Image from 'next/image'
import HomeIcon from '@mui/icons-material/Home';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { usePathname, useRouter } from 'next/navigation'
import UserModalPortal from '../UserModalPortal/UserModalPortal'
import { useSearchValue } from '@/app/providers/SearchValueProvider'
import { useAskForSign } from '@/app/providers/AskForSignProvider'
import { useAuth } from '@/app/providers/AuthProvider'


function Navbar() {

    const pathName = usePathname()
    const router = useRouter()
    const [focus, setFocus] = useState(false)
    const [stretchedSearchInput, setStretchedSearchInput] = useState(false)
    const searchValue = useSearchValue()?.searchValue
    const setSearchValue = useSearchValue()?.setSearchValue
    const [showUserModal, setShowUserModal] = useState(false)
    const stretchedSearchInputRef = useRef<HTMLInputElement>(null);
    const setAskForSignInModal  = useAskForSign()?.setAskForSignInModal
    const isLoggedIn = useAuth()?.isLoggedIn

    const handleSearchValue = (e:any)=>{
        setSearchValue && setSearchValue(e.target.value)
    }
    const handleBlur = ()=>{
        setFocus(false)
    }
    const handleFocuse = ()=>{
        setFocus(true)
    }
    const showStrechedInput = ()=>{
        setStretchedSearchInput(true)
        router.push("/search")
    }
    const handleUserModal = ()=>{
        setShowUserModal(true)
    }
    const handleSearchOnPressEnter = (e:any)=>{
        if(e.key == 'Enter'){
            router.push("/search")
        }
    }
    const handleNaigation = ()=>{
        if(isLoggedIn){
            router.push("/library")
        }
        else{
            setAskForSignInModal(true)
        }
    }

    useEffect(()=>{   
        stretchedSearchInputRef.current?.focus()   
    },[stretchedSearchInput])

  return (
    <>
        <nav className={styles.navbar}>
            <ul className='pl-[24px] flex items-center w-[100%] h-[100%]'>
                <li className='mr-[24px] mt-[9px] grow'>
                    <Link href="/">
                        <Image
                            src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
                            alt='amazon-music-logo'
                            width={142}
                            height={28}
                            className='min-w-[142px] hidden min-[841px]:block'
                        />
                        <Image
                            src="https://d5fx445wy2wpk.cloudfront.net/static/logo_stacked.svg"
                            alt='amazon-music-logo'
                            width={45}
                            height={30}
                            className='min-w-[45px] hidden max-[840px]:block'
                        />
                    </Link>
                </li>
                <li>
                    <Link href="/" className={`px-4 py-[10px] flex items-center hover:text-[#a0f1f5] ${pathName === "/" ? styles["active-nav-link"]: ""}`}>
                        <HomeIcon sx={{ fontSize: 28 }} className='lg:mr-[12px]'/>
                        <p className="hidden lg:inline font-medium uppercase">Home</p>
                    </Link>
                </li>
                <li>
                    <Link href="/social" className={`px-4 py-[10px] flex items-center hover:text-[#a0f1f5] ${pathName === "/social" ? styles["active-nav-link"]: ""}`}>
                        <PodcastsIcon sx={{ fontSize: 24 }} className='lg:mr-[12px]'/>
                        <p className="hidden lg:inline font-medium uppercase">Social</p>
                    </Link>
                </li>
                <li>
                    <button onClick={handleNaigation} className={`px-4 py-[10px] flex items-center hover:text-[#a0f1f5] ${pathName === "/library" ? styles["active-nav-link"]: ""}`}>
                        <HeadphonesIcon sx={{ fontSize: 24 }} className='lg:mr-[12px]'/>
                        <p className="hidden lg:inline font-medium uppercase">Library</p>
                    </button>
                </li>
                <div className='relative shrink w-[100%] h-[100%] flex justify-end max-[600px]:hidden'>
                    <div className={`${focus ? 'max-w-[450px] rounded border-solid border-2 border-yellow-400' : "max-w-[250px] rounded-[52px]"} ease-in duration-200 w-[100%] absolute m-[auto] h-9 top-0 bottom-0 bg-white flex items-center`}>
                        <input 
                            onFocus={handleFocuse} 
                            onBlur={handleBlur}  
                            className='h-[100%] w-[100%] ml-4 pl-[8px] outline-none text-slate-500'  
                            type="text" 
                            placeholder="Search"
                            onChange={handleSearchValue}
                            value={searchValue}
                            onClick={()=>router.push("/search")}
                            onKeyDown={handleSearchOnPressEnter}
                        />
                        <SearchIcon sx={{ fontSize: 24 }} className='text-slate-400 mr-4 cursor-pointer'/>
                    </div>
                </div>
                <li onClick={showStrechedInput} className='px-4 py-[10px] hidden max-[600px]:block cursor-pointer'>
                    <SearchIcon sx={{ fontSize: 26 }}/>
                    
                    {stretchedSearchInput && 
                    <div className={` left-0 z-[1] ease-in duration-200 w-[99%] absolute m-[auto] h-10 top-0 bottom-0 rounded flex items-center border-solid border-[1px] border-yellow-400 bg-gray-900 `}>
                        <input 
                            className='h-[100%] w-[100%] ml-4 pl-[8px] outline-none text-slate-200 bg-inherit' 
                            type="text"
                            placeholder="Search"
                            onBlur={()=>setStretchedSearchInput(false)}
                            ref={stretchedSearchInputRef}
                            onChange={handleSearchValue}
                            value={searchValue}
                            onKeyDown={handleSearchOnPressEnter}
                        />
                        <SearchIcon sx={{ fontSize: 24 }} className='text-slate-200 mr-4'/>
                    </div>}
                </li>
                <li className='relative p-4'>
                    <button 
                        className='p-1 rounded-[50%] bg-[#313131]'
                        onClick={handleUserModal}
                    >
                        <PersonIcon sx={{ fontSize: 28 }} />
                    </button>
                    <div>

                    </div>
                </li>
            </ul>

        </nav>
        {showUserModal && <UserModalPortal setShowUserModal={setShowUserModal}/>}
    </>
  )
}

export default Navbar
