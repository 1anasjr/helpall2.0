'use client';
import React, { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNotification } from '../providers/NotificationProvider';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { currentUser, handleSignOut } = useAuth();
  const { dark, setDark } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const openel = Boolean(anchorEl);
  const { notifications } = useNotification();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toggleDarkMode = () => {
    setDark(!dark);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
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
            <AddPost handleClose={handleClose} />
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

            <ThemeProvider theme={dark ? darkTheme : lightTheme}>
              <Button className='group flex items-center transition duration-300 ease-in-out mx-5 hover:text-blue-500' id="basic-button"
                aria-controls={openel ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openel ? 'true' : undefined}
                onClick={handleClick}
              >
                <NotificationsIcon className='text-black dark:text-white' />
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openel}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    width: isMobile ? '90%' : 300, // Adjust width here
                    borderRadius:5
                  },
                }}
              >
                {notifications?.map((notification, index) => (
                  <MenuItem className='flex justify-between' key={index} sx={{ whiteSpace: 'normal' }}>
                    <Link href={notification.link}>
                      <span className='mr-5 break-words font-medium '>{notification.text}</span>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </ThemeProvider>

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
