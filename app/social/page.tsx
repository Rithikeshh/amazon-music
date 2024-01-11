'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Social.module.css'
import getHeaderWithProjectId from '../utils/headerWithProjectId'
import SpinnerLoader from '../components/Loader/SpinnerLoader'
import PostCard from '../components/PostCard/PostCard'
import { postType } from '../utils/types'
import AskForSignInModal from '../components/AskForSignInModal/AskForSignInModal'
import { useAskForSign } from '../providers/AskForSignProvider'


function Social() {
  

  const [loading, setLoading] = useState(true)
  const [seeMoreLoading, setSeeMoreLoading] = useState(false)
  const [posts, setPosts] = useState<Array<object>>([])
  const [page, setPage] = useState(1);
  const askForSignInModal = useAskForSign()?.askForSignInModal
  const setAskForSignInModal = useAskForSign()?.setAskForSignInModal
  const getPosts = async ()=>{

    const config = getHeaderWithProjectId();
    setSeeMoreLoading(true)
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/linkedin/post?limit=10&page=${page}`,
        config
      )
      console.log(response.data.data);
      setPosts(prev=>{
        return [...prev, ...response.data.data];
      })
        
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
      setSeeMoreLoading(false)
    }
  }
  useEffect(()=>{
    getPosts()
  },[page])
  return (
    loading ? 
    <SpinnerLoader/>
    :
    <>
    <div className='mt-[72px]'>
      <div>
        <h2 className='text-center p-4 font-[700] text-[20px]'>Posts</h2>
        <div className={styles['all-posts-container']}>
          {posts.map((post, index):ReactNode=>(
            <PostCard post={post} key={index}/>
          ))}
        </div>
      </div>
    </div>
    {askForSignInModal && <AskForSignInModal setAskForSignInModal={setAskForSignInModal}/>}
    </>
  )
}

export default Social
