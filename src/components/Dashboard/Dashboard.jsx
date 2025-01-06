import React,{useState} from 'react'
import Header from '../Header/Header'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Drawer from '@mui/material/Drawer';
import { Outlet, useNavigate } from 'react-router-dom';
import './Dashboard.scss'
const Dashboard = () => {
  const [toggleDrawer,setToggleDrawer]=useState(false);
  // const [search,setSearch]=useState('')
  const [activeIcon, setActiveIcon] = useState('notes');
  const handleToggle=()=>{
     setToggleDrawer(!toggleDrawer)
  }
  const navigate=useNavigate()
  
  // const searchText=(data)=>{
  //   // console.log(data);
    
  //   setSearch(data)
  // }

  const handleIconClick=(route)=>{
     navigate(route)
     setActiveIcon(route)
  }

  return (
    <div className='dashboard-cnt'>
        <Header handleToggle={handleToggle} />
        {/* ---------------Drawer----------------------- */}
        <div className='drawer-cnt'>
      <Drawer className='drawer-main-cnt' open={toggleDrawer} onClose={()=>setToggleDrawer(false)} sx={{zIndex:0}} >
      <div className='drawer-box-cnt'>
          <div>
              <div className={`drawer-items-cnt ${activeIcon === 'notes' ? 'active-cnt' : ''}`} onClick={()=>handleIconClick('notes')}>
                <LightbulbOutlinedIcon/>
                <span>Notes</span>
            </div>
            <div className='drawer-items-cnt'>
                <NotificationsOutlinedIcon/>
                <span>Reminders</span>
            </div>
            <div className='drawer-items-cnt'>
                <ModeEditOutlinedIcon />
                <span>Edit labels</span>
            </div>
            <div className={`drawer-items-cnt ${activeIcon === 'Archive' ? 'active-cnt' : ''}`} onClick={()=>handleIconClick('Archive')}>
                <ArchiveOutlinedIcon />
                <span>Archive</span>
            </div>
            <div className={`drawer-items-cnt ${activeIcon === 'Trash' ? 'active-cnt' : ''}`}  onClick={()=>handleIconClick('Trash')}>
                <DeleteOutlineOutlinedIcon />
                <span>Bin</span>
            </div>
          </div>
        </div>
      </Drawer>
      </div>

      <div className='dashboard-main-cnt'>
        <div className='drawer-icon-cnt'>
            <div onClick={()=>handleIconClick('notes')} className={`drawer-icon ${activeIcon === 'notes' ? 'active' : ''}`}><LightbulbOutlinedIcon className='icon'/></div>
            <div className='drawer-icon'><NotificationsOutlinedIcon className='icon'/></div>
            <div className='drawer-icon'><ModeEditOutlinedIcon className='icon'/></div>
            <div  className={`drawer-icon ${activeIcon === 'Archive' ? 'active' : ''}`} onClick={()=>handleIconClick('Archive')}><ArchiveOutlinedIcon className='icon'/></div>
            <div className={`drawer-icon ${activeIcon === 'Trash' ? 'active' : ''}`}  onClick={()=>handleIconClick('Trash')}><DeleteOutlineOutlinedIcon className='icon'/></div>
        </div>
         <div className='dashboard-outlet-cnt'>
            <Outlet />
         </div>
      </div>
       
      {/* -------------------------------------- */}
        {/* <Outlet/> */}
    </div>
  )
}

export default Dashboard