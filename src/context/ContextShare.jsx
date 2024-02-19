 import React, { createContext, useState } from 'react'
export const addprojectResponseContext=createContext()
export const editProjectResponseContext=createContext()
export const isAuthTokenContext=createContext()

function ContextShare({children}) {
// children is a pre-defined props used to share data between all components
// create a state that needs to shared
const [addprojectResponse,setaddprojectResponse]=useState({})
const [editProjectResponse,seteditprojectResponse]=useState({})
const [isAuthToken,setIsAuthToken]=useState(false)
  return (
   <>
   <addprojectResponseContext.Provider
    value={{addprojectResponse,setaddprojectResponse}}>
      <editProjectResponseContext.Provider
      value={{editProjectResponse,seteditprojectResponse}}>
        <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>
        {children}
        </isAuthTokenContext.Provider>
    
      </editProjectResponseContext.Provider>
      
   </addprojectResponseContext.Provider>
   </>
  )
}

export default ContextShare 