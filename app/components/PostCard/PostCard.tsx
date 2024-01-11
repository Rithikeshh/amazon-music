'use client'
import React, { useMemo, useState } from 'react'
import styles from './PostCard.module.css'
import {postType} from '../../utils/types'
import postLike from '../../utils/postLike'
import getComment from '../../utils/getComment'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAskForSign } from '@/app/providers/AskForSignProvider'


const namesArr = [
  "Kwame", "Amina", "Chukwu", "Zahara", "Moussa",
  "Sakura", "Ravi", "Yuki", "Ji-hoon", "Ananya",
  "Matteo", "Elena", "Lukas", "Sophie", "Alessio",
  "Mia", "Elijah", "Isabella", "Liam", "Sofia",
  "Kai", "Talia", "Mateo", "Aroha", "Leilani",
  "Lucas", "Isabella", "Mateo", "Valentina", "Thiago"
]
function PostCard({post}:
    {
        post: postType
        
    }) {
    const {
        title,
        author,
        channel,
        content,
        likeCount,
        commentCount,
        _id
    } = post;
    const isLoggedIn = useAuth()?.isLoggedIn
    const setAskForSignInModal = useAskForSign()?.setAskForSignInModal
    const [likeCountState, setLikeCountState] = useState(likeCount)
    const [commentCountState, setCommentCountState] = useState(commentCount)
    const [commentList, setCommentList] = useState([])

    const handleLike = ()=>{
      if(isLoggedIn){
        postLike(_id, setLikeCountState)
        if(likeCount == likeCountState){
          setLikeCountState(prev=>{
            return prev ? prev+1 : 0
          })
        }
      }
      else{
        setAskForSignInModal(true)
      }
    }
    const showComments = ()=>{
      getComment(_id, setCommentList)
    }
  return (
    <div className={styles['post-card']}>
      <div className='flex items-center p-[12px] border-b-[1px] border-[#272626]'>
        <img 
          src={author?.profileImage}
          alt=""
          className='rounded-[50%]  w-[80px]'
        />
        <div className='ml-[12px]'>
          <h3 className='text-[18px] font-[500]'>{title}</h3>
          <p className='text-[rgba(255,255,255,0.6)]'>By: {author?.name}</p>
        </div>
      </div>
      <div className='px-[12px] pt-[18px]'>
        {content}
      </div>
      <div className='mt-[8px] p-[12px] flex items-center'>
        <img 
          src={channel?.image}
          alt="" 
          className='rounded-[50%] w-[45px]'
        />
        <p className='ml-[12px] text-[rgba(255,255,255,0.6)] text-[13px]'>Channel: {channel?.name}</p>
        <div className='grow flex justify-end items-center gap-[6px]'>
          <span 
            className='text-[14px] cursor-pointer text-[rgba(255,255,255,0.8)]'
            onClick={handleLike}
          >Likes: {likeCountState}</span>
          <span 
            className='text-[14px] cursor-pointer text-[rgba(255,255,255,0.8)]'
            onClick={showComments}
          >Comments: {commentCount}</span>
        </div>
      </div>
      {commentList.length > 0 &&
      <div className='mt-4'>
        {commentList.map((comment, index)=>(
          <SingleComment key={index} comment={comment}/>
        ))}
      </div>
      }
    </div>
  )
}

export default PostCard

function SingleComment({comment}:any){
  const random = useMemo(()=>Math.floor(Math.random() * 30),[]);
  
  
  return(
    <div className='p-[12px] flex items-center border-t-[1px] border-[#272626]'>

      <img 
        src={`https://ui-avatars.com/api/?name=${namesArr[random].slice(0,1)}&background=random`} 
        alt="" 
        className='rounded-[50%] w-[45px]'
        />

      <div className='ml-[12px] grow'>

        <div className='flex justify-between'>
          <p className=''>{namesArr[random]}</p>

          <div style={{position: "relative"}}>
            <span className='text-[13px] text-slate-300'>{comment.isEdited ? parseInt(String((new Date().getTime() - new Date(comment.updatedAt).getTime())/ (1000 * 60 * 60 * 24))) : parseInt(String((new Date().getTime() - new Date(comment.createdAt).getTime())/ (1000 * 60 * 60 * 24)))}d</span>
          </div>

        </div>
        
        <p className='text-[13px] text-slate-300'>{comment.content}</p>
      </div>
    </div>
  )
}