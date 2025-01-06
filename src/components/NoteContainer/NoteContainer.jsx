import React, { useContext, useEffect, useState } from 'react'
import AddNote from '../AddNote/AddNote'
import NoteCard from '../NoteCard/NoteCard'
import './NoteContainer.css'
import {getAllNotesApiCall} from '../../utils/Api'
import { SearchQuearyContext } from '../ContextHoc/ContextHoc'
const NoteContainer = () => {
  const [noteList,setNoteList]=useState([]);
  const search=useContext(SearchQuearyContext)

  useEffect(()=>{
    fetchData()
  },[search])
 
  //console.log(search);
  const searchItem=()=>{
    const filteredNotes = noteList.filter((data) => {
      const titleMatch = data.title?.toLowerCase().includes(search.trim().toLowerCase());
      const descriptionMatch = data.description?.toLowerCase().includes(search.trim().toLowerCase());
      return titleMatch || descriptionMatch;
    });
    setNoteList(filteredNotes);
  }
 
  const fetchData= async()=>{
    if(search===''){
        getAllNotesApiCall(`notes/getNotesList`)
        .then((result)=>{
          const {data} = result;
          const filterData= data?.data?.data.filter((note)=>{
          return note.isArchived!==true 
          })
          console.log(filterData);
          setNoteList(filterData)
        })
        .catch((error)=>{
          console.log(error)
        })
    }
    else{
      searchItem()
    }
    
  }

  const handleNoteList = (data,action) =>{
      if(action==='addCard'){
        setNoteList([data,...noteList]);
      }
      if(action==='archive' || action==='trash' || action==='unarchive'){
        const updatedList= noteList.filter((note)=> note.id!==data.id )
        console.log(updatedList);
        setNoteList(updatedList)
      }
      if(action==='edit' || action==='colour'){
        const updatedList= noteList.map((note)=> {
          if(note.id===data.id){
            return data;
          } 
          return note;

        })
        console.log(updatedList);
        setNoteList(updatedList)
      } 
  }

  return (
    <div className='noteContainer-cnt'>
      {/* <AddNote/> */}
      <div className='noteContainer-main-cnt'>
        <div className='noteContainer-addnote-cnt'>
           <AddNote handleNoteList={handleNoteList}/>
        </div>
        <div className='noteContainer-noteCard-cnt'>
          {
            noteList.length>0 && noteList.map((items,index)=> <NoteCard key={index} noteDetails={items} container={'notes'} handleNoteList={handleNoteList}/>)
          }   
        </div>
      </div>
        
    </div>
  )
}

export default NoteContainer