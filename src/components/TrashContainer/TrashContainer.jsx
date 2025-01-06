import React,{useState,useEffect} from 'react'
import './TrashContainer.css'
import {trashApiCall} from '../../utils/Api'
import NoteCard from '../NoteCard/NoteCard';
const TrashContainer = () => {
  const [trashList,setTrashList]=useState([]);
  useEffect(()=>{
     fetchData();
  },[])

   const fetchData=()=>{
    trashApiCall(`/notes/getTrashNotesList`)
    .then((result)=>{
      const {data}=result;
      setTrashList(data?.data?.data)
      //console.log(data?.data?.data);
    })
   }
  
   const handleUpdateList = (data, action) => {
    // console.log(data,action)
      if (action === "add") {
        setTrashList((prevNotesList) => [...prevNotesList, data]);
      }
      else if(action==='archive' || action==='trash' || action==='delete' || action==='untrash'){
        setTrashList(trashList.filter((notes)=> notes.id!==data.id))
      }
      else if(action==='colour' || action==='update'){
        setTrashList(trashList.map((note)=>{
           if(note.id===data.id){
            return data;
           }
           return note;
        }))
      }
    };


  return (
    <div className='trash-cnt'>
      <div className='trash-main-cnt'>
      {
        trashList.map((items)=>{
          return <NoteCard noteDetails={items} container={'trash'} key={items.id} handleNoteList={handleUpdateList}/>
        })
      }
      </div>
    </div>
  )
}

export default TrashContainer