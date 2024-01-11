'use client'
import React, { createContext, useState, useEffect } from 'react'

const AuthContext = createContext<{isLoggedIn: boolean, setIsLoggedIn: (value: boolean)=>void} | null>(null)

function AuthProvider({children}:{children: React.ReactNode}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("userToken-amazon-music");
        setIsLoggedIn(token ? true : false);
    }
    },[])
    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
  )
}

export default AuthProvider
export const useAuth = ():{isLoggedIn: boolean, setIsLoggedIn: (value: boolean)=>void} | null => React.useContext(AuthContext)
