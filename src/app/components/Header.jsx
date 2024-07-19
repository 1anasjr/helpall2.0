'use client'
import React, { useState } from 'react'
// import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation'
import { signOut } from "../../../firebase";
import AddPost from './AddPost';
import { useAuth } from '../providers/AuthProvider';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {

     const router = useRouter();
     const [open, setOpen] = useState(false);
     const isMobile = useMediaQuery('(max-width:600px)');
     const { currentUser } = useAuth() 

     console.log({currentUser});

     const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <>
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
    <Box
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : 1000,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto', // Use 'auto' instead of 'scroll'
            maxHeight: '99vh', // Ensure the modal is not too tall
        }}
   >
                    <AddPost/>
    </Box>
    </Modal>
        <header className='bg-[#f2eded] p-5 flex justify-between items-center sticky top-0  z-40'>

            <div className='logo '>
                <h1 className='text-2xl font-extrabold text-blue-400'>Help All</h1>
            </div>

            {/* <div className='bg-white py-2 rounded-full w-2/6 flex justify-between'>
                    <input className='w-full border-none focus:outline-none focus:ring-0 mx-2 px-3' type="text" />
                    <SearchIcon className='mx-2'/>
            </div>  */}

            {/* <div className='flex justify-end items-center w-[40%]'> */}
            <div className='flex justify-end items-center'>

                <div className='mx-5 flex justify-between items-center'>
                    <button onClick={handleOpen} className='group flex items-center transition duration-300 ease-in-out rounded-full hover:text-red-500'><AddBoxIcon/> 
                        {/* <span className='hidden group-hover:inline transition duration-3000 ease-in-out mx-1'>Post Request</span> */}
                    </button>

                    <button className='group flex items-center transition duration-300 ease-in-out mx-5 hover:text-blue-500'><NotificationsIcon/> 
                        {/* <span className='hidden group-hover:inline transition duration-300 ease-in-out mx-1'>Notifications</span> */}
                    </button>

                    <button className='group flex items-center transition duration-300 ease-in-out hover:text-slate-500'><DarkModeIcon/> 
                    {/* <span className='hidden group-hover:inline transition duration-300 ease-in-out mx-1'>Dark Mode</span> */}
                    </button>
                </div>
                
                <button onClick={signOut} className='hidden md:flex justify-center items-center cursor-pointer'>
                    <span className='mx-3'>{currentUser?.displayName }</span>
                    <Avatar alt={currentUser?.displayName} src={currentUser?.photoURL} sx={{ width: 40, height: 40 }}  />
                </button>
            </div>
            
        </header> 
            
    </>
  )
}

export default Header
