'use client'
import React from 'react'
import styles from "./UserModalPortal.module.css"
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useAuth } from '@/app/providers/AuthProvider'
import { useRouter } from 'next/navigation'

function UserModalPortal({setShowUserModal}:{setShowUserModal: Function}) {

  const isLoggedIn = useAuth()?.isLoggedIn;
  const setIsLoggedIn = useAuth()?.setIsLoggedIn;
  const router = useRouter()
  
  const handleUserModal = ()=>{
    setShowUserModal(false)
  }
  const handleLogout = ()=>{
    localStorage.removeItem("userToken-amazon-music");
    localStorage.removeItem("userDetails-amazon-music");
    setIsLoggedIn && setIsLoggedIn(false);
    router.push('/')
  }
  return (
    <>
      {
        createPortal(
          <div 
            className='fixed w-[100vw] h-[100vh] bg-transparent z-[6] top-0'
            onClick={handleUserModal}
          >
              <div className={styles['user-modal']}>
                  <div className={styles['signin-btn-container']}>
                    {!isLoggedIn ? 
                    <Link href="/login">
                      <button className={styles['sign-in-btn']}>Sign In</button>
                    </Link>
                    :
                    <button 
                      className={styles['sign-in-btn']}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    }
                  </div>
              </div>
          </div>,
          document.body
        )
      }
    </>
  )
}

export default UserModalPortal
