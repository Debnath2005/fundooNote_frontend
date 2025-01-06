import React, { useState } from 'react'
import './AddNote.css'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Menu from '@mui/material/Menu';
import {createNoteApiCall,updateNotesApiCall} from '../../utils/Api'


const AddNote = ({handleNoteList, mode='add',noteDetails}) => {
    const [takeNote,setTakeNote]=useState(mode==='add'? false:true)
    const [title,setTitle] = useState(mode==='add'?"":noteDetails.title)
    const [description,setDescription] =useState(mode==='add'?"":noteDetails.description)
    const [color,setColor]=useState(mode==='add'?"#ffffff":noteDetails.color)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    //const color='#ffffff'
    
    const handleCreateNote=(mode)=>{
        setTakeNote(!takeNote)
        if(title || description){
          
            if(mode==='add'){
              createNoteApiCall({title,description,color},'notes/addNotes')
              .then((result)=>{
                const {data}=result;
                // console.log(data);
                setTitle('');
                setDescription('');
                handleNoteList(data?.status?.details,'addCard')
              })
              .catch((error)=>{
                console.log(error);
                
              })
            }

          if(mode==='edit'){
            // setTakeNote(!takeNote)
            let payload = {
              noteId: noteDetails.id,
              title:title,
              description:description,
              color:color
            };
           updateNotesApiCall(payload,'notes/updateNotes')
            .then((result)=>{ 
              const {data}=result
              console.log(data)
             handleNoteList({...noteDetails,title,description,color},'edit')
             setTitle('')
             setDescription('')
             setColor('')
            })
            .catch((error)=>{
              console.log(error);
              
            })
            //handleNoteList({...noteDetails,title,description,color},'edit')
          }
        }
    }
    const colourChange=(color)=>{
      setAnchorEl(!anchorEl)
      setColor(color)
    }
  return (
    <div className='addnote-wrapper-cnt'>
       { takeNote === false ?
      <div className='addnote-takeNote-cnt' onClick={()=>setTakeNote(!takeNote)}>
        <input type="text" placeholder='Take a note...' />
        <div className='addnote-icon-cnt'>
            <CheckBoxOutlinedIcon/>
            <BrushOutlinedIcon/>
            <ImageOutlinedIcon/>
        </div>
      </div>
      :
      <div className='addnote-input-cnt' >
        <div className='addnote-text-cnt'>
            <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder='Take a note...' value={description} onChange={(e)=>setDescription(e.target.value)}/>
            {/* <textarea type="text" placeholder='Take a note...' value={description} rows={3} onChange={(e)=>setDescription(e.target.value)} ></textarea> */}
        </div>
        
        <div className='addnote-button-icon-cnt'>
        <div className="addnote-button-cnt">
            <AddAlertOutlinedIcon/>
            <PersonAddAltOutlinedIcon/>
            <ColorLensOutlinedIcon onClick={(event)=>setAnchorEl(event.currentTarget)} />
            <ImageOutlinedIcon/>
            <ArchiveOutlinedIcon/>
            <MoreVertOutlinedIcon/>
            <UndoIcon/>
            <RedoIcon/>
        </div>
          <span onClick={()=>handleCreateNote(mode)}>Close</span>
        </div>
      </div>}
      <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={()=>setAnchorEl(null)}
          className='addNote-colour-menu'
          
        >
          <div className="color-palate-cnt" >
          <div className="col1" onClick={()=>colourChange('#FFFFFF')}> </div> 
       <div class="col2" onClick={()=>colourChange('#FAAFA8')}></div> 
           <div class="col3"  onClick={()=>colourChange('#F39F76')}></div> 
         <div class="col4" onClick={()=>colourChange('#FFF8B8')}></div>  
             <div class="col5" onClick={()=>colourChange('#E2F6D3')}></div> 
       <div class="col6" onClick={()=>colourChange('#B4DDD3')}></div>
           <div class="col7" onClick={()=>colourChange('#D4E4ED')}></div>  
            <div class="col8"  onClick={()=>colourChange('#AECCDC')}></div>  
            <div class="col9"  onClick={()=>colourChange('#D3BFDB')}></div>  
          <div class="col10"  onClick={()=>colourChange('#F6E2DD')}></div> 
         <div class="col11" onClick={()=>colourChange('#E9E3D4')}></div>
         <div class="col12" onClick={()=>colourChange('#EFEFF1')}></div>   
          </div >
        </Menu>
    </div>
  )
}

export default AddNote