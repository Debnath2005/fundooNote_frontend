import React, { useState } from 'react'
import './NoteCard.scss'
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import {archiveTrashApiCall,deleteNotesApiCall,colorNotesApiCall} from '../../utils/Api'
import Modal from '@mui/material/Modal';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddNote from '../AddNote/AddNote';
const NoteCard = (props) => {
   const {noteDetails,handleNoteList,container} = props;
   const [anchorEl, setAnchorEl] = useState(null);
   const [anchorE2, setAnchorE2] = useState(null);
   const open1 = Boolean(anchorEl);
   const open2 = Boolean(anchorE2);
   const {title,description}=noteDetails;
   const [editNote,setEditNote]=useState(false)
  
 // handleNoteList(noteDetails,action)
 const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

 const handleNoteIconClick=(action,colour='#FFFFFF')=>{
  let payload = {
    noteIdList: [noteDetails.id],
  };
  if(action === "archive") {
    payload.isArchived = true;
  }
  if(action === "unarchive") {
    payload.isArchived = false;
  }
  if(action==='trash'){
    payload.isDeleted = true;
  }
  if(action==='untrash'){
    payload.isDeleted = false;
  }
  if(action==='colour'){
    payload.color = colour;
  }
   if(action==='archive' || action==='unarchive'){
    archiveTrashApiCall(payload,'/notes/archiveNotes')
    .then((result)=>{
      const data={result}
      console.log(data);
      handleNoteList(noteDetails,action)
    })  
   }
   
   else if(action==='trash' || action==='untrash'){
    setAnchorEl(null)
    archiveTrashApiCall(payload,'/notes/trashNotes')
    .then((result)=>{
      const data={result}
      console.log(data);
      handleNoteList(noteDetails,action)
    })
   }
   else if(action==='delete'){
    
    deleteNotesApiCall(payload,'/notes/deleteForeverNotes')
    .then((result)=>{
      const data={result}
      console.log(data);
    })
   }

   else if(action==='colour'){
    setAnchorE2(null)
    colorNotesApiCall(payload,'/notes/changesColorNotes')
    .then((result)=>{
      const data={result}
      console.log(data);
      handleNoteList({...noteDetails,color:colour},action)
    })
   }
  
   handleNoteList(noteDetails,action)
 }

 const handleEditNote=(data,action)=>{
  setEditNote(false)
  handleNoteList(data,action)
 }

  return (
    <div className='card-wrapper-cnt'>
       <div className='card-main-cnt' style={{backgroundColor:noteDetails.color}} >
            <div className='card-input-cnt' onClick={()=>{setEditNote(true)}}>
              <div><span>{title}</span></div>
              <div><span>{description}</span></div>
            </div>

           { 
            container==='notes' ?
              <div className="card-button-cnt">
                <AddAlertOutlinedIcon/>
                <PersonAddAltOutlinedIcon/>
                <ColorLensOutlinedIcon  onClick={(event)=>setAnchorE2(event.currentTarget)}/>
                <ImageOutlinedIcon/>
                <ArchiveOutlinedIcon onClick={()=>handleNoteIconClick('archive')}/>
                <MoreVertOutlinedIcon 
                //onClick={()=>{setOpen(true)}}
                onClick={handleClick}
                />
              </div>
            :
            container==='archive' ?
              <div className="card-button-cnt">
                <AddAlertOutlinedIcon/>
                <PersonAddAltOutlinedIcon/>
                <ColorLensOutlinedIcon/>
                <ImageOutlinedIcon/>
                <UnarchiveOutlinedIcon onClick={()=>handleNoteIconClick('unarchive')}/>
                <MoreVertOutlinedIcon 
                //onClick={()=>{setOpen(true)}}
                />
              </div>
            :
              <div className="card-button-cnt">
                <DeleteForeverOutlinedIcon onClick={()=>handleNoteIconClick('delete')}/>
                <RestoreFromTrashOutlinedIcon onClick={()=>handleNoteIconClick('untrash')}/>
              </div>
           }
          
       </div>
       <Menu
          anchorEl={anchorEl}
          open={open1}
          onClose={()=>setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={()=>handleNoteIconClick('trash')}> Delete notes</MenuItem>
        </Menu>
       
         {/* ----color */}
         <Menu
          anchorEl={anchorE2}
          open={open2}
          onClose={()=>setAnchorE2(null)}
          className='notecard-colour-menu'
        >
          <div className="color-palate-cnt" >
                <div className="col1" onClick={()=>handleNoteIconClick("colour",'#FFFFFF')}> </div> 
                <div class="col2" onClick={()=>handleNoteIconClick("colour",'#FAAFA8')}></div> 
                <div class="col3"  onClick={()=>handleNoteIconClick("colour",'#F39F76')}></div> 
                <div class="col4" onClick={()=>handleNoteIconClick("colour",'#FFF8B8')}></div>  
                <div class="col5" onClick={()=>handleNoteIconClick("colour",'#E2F6D3')}></div> 
                <div class="col6" onClick={()=>handleNoteIconClick("colour",'#B4DDD3')}></div>
                <div class="col7" onClick={()=>handleNoteIconClick("colour",'#D4E4ED')}></div>  
                <div class="col8"  onClick={()=>handleNoteIconClick("colour",'#AECCDC')}></div>  
                <div class="col9"  onClick={()=>handleNoteIconClick("colour",'#D3BFDB')}></div>  
                <div class="col10"  onClick={()=>handleNoteIconClick("colour",'#F6E2DD')}></div> 
                <div class="col11" onClick={()=>handleNoteIconClick("colour",'#E9E3D4')}></div>
                <div class="col12" onClick={()=>handleNoteIconClick("colour",'#EFEFF1')}></div>
            </div>
        </Menu>
        {/* ----------- */}
        <Modal
        open={editNote}
        onClose={()=>{setEditNote(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='model-addnote-cnt'>
           <AddNote mode={'edit'} noteDetails={noteDetails} handleNoteList={handleEditNote}/>
        </div>
      </Modal>
    </div>
  )
}

export default NoteCard;