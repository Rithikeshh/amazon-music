'use client'
import React from 'react'
import styles from './AskForSignInModal.module.css'
import { createPortal } from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link'
function AskForSignInModal({setAskForSignInModal}:{setAskForSignInModal:(value:boolean)=>void}) {

  return (
    <>
        {
            createPortal(
                <div className={styles['ask-for-sign-in-container']}>
                    <div className='relative min-w-[500px] w-[500px] text-center flex m-[auto] flex-col z-1 bg-transparent max-[520px]:min-w-[100%] max-[540px]:px-[40px]'>
                        <button onClick={()=>setAskForSignInModal(false)} className='absolute right-0 max-[540px]:right-[40px] top-[-46px] rounded-[50%] p-[3px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)] hover:scale-[1.05]'>
                            <CloseIcon sx={{ fontSize: 28 }}/>
                        </button>
                        <h1 className='text-[24px] font-bold'>Try Amazon Prime Music</h1>
                        <p className='mt-4'>Ad-free music streaming included with Prime membership. Also includes free shipping and video streaming.</p>
                        <div className='flex mt-8 justify-center gap-4 max-[680px]:flex-col'>
                            
                            <button className='tracking-[1px] font-[700] text-[12px] text-[aqua] rounded-[24px] px-[16px] py-[6px] bg-transparent border-[aqua] border-[2px]'>
                                <Link href={'/login'}>
                                    ALREADY A CUSTOMER? SIGN IN
                                </Link>
                            </button>
                            <button className='tracking-[1px] font-[700] text-[12px] text-[#000] rounded-[24px] px-[16px] py-[6px] bg-[aqua] border-[none] '>
                            <Link href={'/login'}>
                                    TRY NOW
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )
        }
    </>
  )
}

export default AskForSignInModal
