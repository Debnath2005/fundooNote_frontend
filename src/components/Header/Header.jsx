import React, { useContext } from 'react'
import './Header.scss'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import logo from '../../Assest/logo-fundo.png'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { UpdateSearchQuaryContext } from '../ContextHoc/ContextHoc';


const Header = ({handleToggle,searchText}) => {
   const navigate=useNavigate()
   const handleSearchQuery=useContext(UpdateSearchQuaryContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout= ()=>{
    handleClose()
    localStorage.removeItem("fundoo-token");
    localStorage.removeItem("FirstName");
    localStorage.removeItem("LastName");
    localStorage.removeItem("Email");
    navigate('/')
  }

  return (
    <div className='header-wrapper-cnt'>
        <div className='header-main-cnt'>
            <div className='header-logo-cnt'>
                <div onClick={handleToggle}>
                  <DensityMediumIcon />
                </div>
                <div className='header-logo-img-cnt'>
                    <img src={logo} alt="logo" />
                    <span>Keep</span>
                </div>  
            </div>
            <div className='header-input-cnt'>
                <div className='header-input-box-cnt'>
                    <SearchIcon/>
                    <input type="text" placeholder='Search' onChange={(e)=>handleSearchQuery(e.target.value)} />
                </div>
            </div>
            <div className='header-setting-cnt'>
                <div className='header-setting-item-cnt'>
                    <RefreshIcon/>
                    <SplitscreenIcon/>
                    <SettingsIcon/>
                </div>
                <div className='header-profile-cnt'>
                    <AppsIcon/>
                    <Avatar 
                    sx={{ bgcolor: 'orange' }}
                    onClick={handleClick}
                    >{localStorage.getItem('FirstName').charAt(0).toUpperCase()}</Avatar>
                </div>
            </div>
        </div>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose} className='avter-item'>
                    <Avatar sx={{ bgcolor: 'orange' }}  onClick={handleClick} style={{display:'flex',justifyContent:'center'}}>
                        {localStorage.getItem('FirstName').charAt(0).toUpperCase()}
                    </Avatar> 
                </MenuItem>
                <MenuItem onClick={handleClose}>
                {localStorage.getItem('FirstName')} {localStorage.getItem('LastName')}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                {localStorage.getItem('Email')}
                </MenuItem>
                
                <Divider />
                
                {/* <MenuItem onClick={handleClose}>
                  <img src={logo} alt="logo" />
                </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                <ListItemIcon >
                    <Logout fontSize="medium" />
                </ListItemIcon>
                Logout
                </MenuItem>
            </Menu>
    </div>
  )
}

export default Header