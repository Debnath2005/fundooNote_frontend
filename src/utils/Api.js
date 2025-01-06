import axios from "axios"

const BASE_URL=`https://fundoonotes.incubation.bridgelabz.com/api/`
//const BASE_URL=`http://localhost:4000/api/v1/`

const getAuth=()=>{
   return `${localStorage.getItem('fundoo-token')}`
}

export const loginApi=async (payload,END_POINT)=>{
  return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}

export const signupApiCall = async(payload,END_POINT)=>{
  const res= await axios.post(`${BASE_URL}${END_POINT}`,payload)
  return res;
}

export const getAllNotesApiCall = async(END_POINT)=>{
  return await axios.get(`${BASE_URL}${END_POINT}`,
      { 
        headers:{
          Authorization:getAuth()
        }
      }
  )
}

export const createNoteApiCall= async(Payload,END_POINT)=>{
   return await axios.post(`${BASE_URL}${END_POINT}`,
    Payload,
    { 
      headers:{
        Authorization:getAuth()
      }
    }
  )
}

export const archiveTrashApiCall= async(Payload,END_POINT)=>{
  return await axios.post(`${BASE_URL}${END_POINT}`,
   Payload,
   {
     headers:{
       Authorization:getAuth()
     }
   }
 )
}

export const archiveApiCall= async(END_POINT)=>{
  return await axios.get(`${BASE_URL}${END_POINT}`,
   { 
     headers:{
       Authorization:getAuth()
     }
   }
 )
}

export const trashApiCall= async(END_POINT)=>{
  return await axios.get(`${BASE_URL}${END_POINT}`,
   { 
    headers:{
      Authorization:getAuth()
    }
   }
 )
}

export const updateNotesApiCall= async(Payload,END_POINT)=>{
  return await axios.post(`${BASE_URL}${END_POINT}`,
   Payload,
   {
      headers:{
       Authorization:getAuth()
      } 
   }
 )
}

export const deleteNotesApiCall= async(Payload,END_POINT)=>{
  return await axios.post(`${BASE_URL}${END_POINT}`,
   Payload,
   {
      headers:{
       Authorization:getAuth()
      }
   }
 )
}

export const colorNotesApiCall= async(Payload,END_POINT)=>{
  return await axios.post(`${BASE_URL}${END_POINT}`,
   Payload,
   {
      headers:{
       Authorization:getAuth()
      }
   }
 )
}