'use client';
import React, { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
import { signOut } from "../../../firebase";
import AddPost from './AddPost';
import { useAuth } from '../providers/AuthProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { lightTheme, darkTheme } from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '../providers/ThemeProvide';

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { currentUser,handleSignOut } = useAuth();
  const {dark,setDark} = useTheme()

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toggleDarkMode = () => {
    setDark(!dark);
  };

  return (
    <>
      <ThemeProvider theme={dark?darkTheme:lightTheme}>
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                overflowY: 'auto',
                maxHeight: '99vh',
              }}
            >
              <AddPost />
            </Box>
          </Modal>
      </ThemeProvider>

      <header className="bg-[#f2eded] dark:bg-[#121212] p-5 flex justify-between items-center sticky top-0 z-40">
        <div className="logo">
          <h1 className="text-2xl font-extrabold text-blue-400 dark:text-blue-200">Help All</h1>
        </div>

        <div className="flex justify-end items-center dark:text-white">
          <div className="mx-5 flex justify-between items-center">
            <button onClick={handleOpen} className="group flex items-center transition duration-300 ease-in-out rounded-full hover:text-red-500">
              <AddBoxIcon />
            </button>

            <button className="group flex items-center transition duration-300 ease-in-out mx-5 hover:text-blue-500">
              <NotificationsIcon />
            </button>

            <button onClick={toggleDarkMode} className="group flex items-center transition duration-300 ease-in-out hover:text-slate-500">
              <DarkModeIcon />
            </button>
          </div>

          <button onClick={handleSignOut} className="hidden md:flex justify-center items-center cursor-pointer">
            <span className="mx-3">{currentUser?.displayName}</span>
            <Avatar alt={currentUser?.displayName} src={currentUser?.photoURL} sx={{ width: 40, height: 40 }} />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
