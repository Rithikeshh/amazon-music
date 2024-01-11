'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react'

const AskForSignContext = createContext<any>(null)
function AskForSignProvider({children}:{children:ReactNode}) {
    const [askForSignInModal, setAskForSignInModal] = useState<boolean>(false)
  return (
    <AskForSignContext.Provider value={{askForSignInModal, setAskForSignInModal}}>
        {children}
    </AskForSignContext.Provider>
  )
}

export default AskForSignProvider

export const useAskForSign = ()=> useContext(AskForSignContext)