'use client'
import React, { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'

const searchValueContext = createContext<{searchValue:string, setSearchValue: (value: string)=>void} | null>(null)

function SearchValueProvider({children}:{children:ReactNode}) {
    const [searchValue, setSearchValue] = useState("")
  return (
    <searchValueContext.Provider value={{searchValue, setSearchValue}}>
        {children}
    </searchValueContext.Provider>
  )
}

export default SearchValueProvider

export const useSearchValue = ():{searchValue: string, setSearchValue: (value: string)=> void} | null => useContext(searchValueContext)