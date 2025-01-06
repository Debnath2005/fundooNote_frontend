import React, { createContext,useState } from 'react'

export const SearchQuearyContext=createContext()
export const UpdateSearchQuaryContext=createContext()

const ContextHoc = ({children}) => {
    const [searchQuary,setSearchQuary]=useState('')
  return (
    <SearchQuearyContext.Provider value={searchQuary}>
        <UpdateSearchQuaryContext.Provider value={setSearchQuary}>
            {children}
        </UpdateSearchQuaryContext.Provider>
    </SearchQuearyContext.Provider>
  )
}

export default ContextHoc