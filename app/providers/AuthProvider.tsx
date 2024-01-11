'use client'
import React, { createContext, useState } from 'react'

const AuthContext = createContext<{isLoggedIn: boolean, setIsLoggedIn: (value: boolean)=>void} | null>(null)

function AuthProvider({children}:{children: React.ReactNode}) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("userDetails-amazon-music") ? true : false
      )
    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
  )
}

export default AuthProvider
export const useAuth = ():{isLoggedIn: boolean, setIsLoggedIn: (value: boolean)=>void} | null => React.useContext(AuthContext)
