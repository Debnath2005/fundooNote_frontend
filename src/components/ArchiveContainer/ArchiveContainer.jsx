import React, { useEffect, useState } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import {archiveApiCall} from '../../utils/Api'
import './ArchiveContainer.scss'

const ArchiveContainer = () => {
  const [archiveList,setArchiveList]=useState([]);

  useEffect(()=>{
     fetchData();
  },[])

   const fetchData=()=>{
    archiveApiCall(`/notes/getArchiveNotesList`)
    .then((result)=>{
      const {data}=result;
      setArchiveList(data?.data?.data)
      console.log(data?.data?.data);
    })
   }

   const handleNoteList = (data, action) => {
    //handleUpdateList  
    
    if(action==='unarchive' || action==='trash'){
      setArchiveList(archiveList.filter((notes)=> notes.id!==data.id))
      }
     else if(action==='colour' || action==='update'){
      setArchiveList(archiveList.map((note)=>{
          if(note.id===data.id){
           return data;
          }
          return note;
       }))
     }
  };

  return (
    <div className='archive-cnt'>
      {/* <NoteCard container={'archive'}/> */}
      <div className='archive-main-cnt'>
        {
          archiveList.map((items)=>{
            return <NoteCard noteDetails={items} container={'archive'} key={items.id} handleNoteList={handleNoteList}/>
          })
        }
      </div>
    </div>
  )
}

export default ArchiveContainer