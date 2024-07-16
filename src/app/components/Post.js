import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../providers/AuthProvider';
import LinearProgress from '@mui/material/LinearProgress';
import { Report } from '@mui/icons-material';
import EditPost from './EditPost';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { PostProvider } from '../providers/PostProvider';
import Link from 'next/link';

const Post = ({post,index}) => {

  const { totaldonate,currentDonation, isEmergency, recipientDescription, title, email , userName, profileImg , thumbnail} = post;
  const percentage = currentDonation/totaldonate * 100

  const { deletePost } = useContext(PostProvider);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useAuth()
  const open = Boolean(anchorEl);

  const truncateDescription = (description, maxLength) => {
    if (description.split(' ').length > maxLength) {
      const words = description.split(' ');
      return words.slice(0, maxLength).join(' ') + '...';
    }
    return description;
  };

  const handleOpenModal = () => {
    setOpenModal(true);
   };
   const handleCloseModal = () => {
    setOpenModal(false);
   };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelDelete = () => {
    let confirm =  window.confirm('Are you sure you want to delete this post ?')
    if(!confirm){
      return
    }
    deletePost(currentUser?.uid,post.id)
  }

  return (
   <>
       <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 1000,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    overflowY: 'auto', // Use 'auto' instead of 'scroll'
                    maxHeight: '99vh', // Ensure the modal is not too tall
                }}
          >
            <EditPost post = {post} />
          </Box>
      </Modal>

      {
        isEmergency === 1 &&
        <div className='bg-[#efeeee] min-h-[120px] p-2 rounded-2xl shadow-lg my-7' key={index}>
                <div className='flex justify-between items-center my-3'>
                    <div className='flex space-x-3 items-center'>
                        <Avatar src={profileImg} />
                        <p className='font-medium'>{userName}</p>
                    </div>
                    <div className='text-red-500'>urgent</div>
                </div>
                <h4>{title}</h4>
        </div> 
      }

      {
         isEmergency === 0 &&
        <div className='bg-[#efeeee] min-h-[120px]  rounded-2xl shadow-lg my-7' key={index}>
                <div className='flex justify-between p-4 items-center my-3'>
                    <div className='flex space-x-3 items-center'>
                        <Avatar src={profileImg} />
                        <p className='font-medium'>{userName}</p>
                    </div>
                    <div>

                    {currentUser.uid === post.uid?
                    <>
                      <Button id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <MoreVertIcon className='text-black'/>
                      </Button>
                      

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >

                      <MenuItem className='flex justify-between' >
                        <button onClick={handleOpenModal} type="button" >
                          <span className='mr-5'>Edit post</span>  
                          <EditIcon/>
                        </button>
                      </MenuItem>

                      <MenuItem className='flex justify-between' onClick={handleClose}>
                          <button onClick={handelDelete} className='mr-5'>Delete</button>
                          <DeleteIcon/>
                      </MenuItem>

                      <MenuItem className='flex justify-between' onClick={handleClose}>
                          <span className='mr-5'>Report</span>
                          <Report/>
                      </MenuItem>

                    </Menu>
                    </>: ""}
                      
                    </div>
                </div>
                <div>
                   <Image height={500} width={500} src={thumbnail} className='w-full object-cover  h-[250px]' />
                </div>
                <div className='p-4' >
                  <h4 className='my-2 text-xl font-bold'>{title}</h4>
                  <p className='my-4'>{truncateDescription(recipientDescription, 50)}</p>
                  <div className='flex justify-center items-center space-x-5'>
                    <LinearProgress className='my-2 w-[90%] py-2 rounded-full'  variant="determinate" value={percentage.toFixed(0) < 100 ? percentage.toFixed(0) : 100} />
                    <span >{percentage.toFixed(0) < 100 ? percentage.toFixed(0) : 100}%</span>
                  </div>
                  <div className='mt-3 flex mx-2'>
                      <Link className='w-full bg-green-700 rounded-lg text-white px-5 py-2 text-center' href={`/post/${post.uid}/${post.id}`}>Donate</Link>
                  </div>
                </div>
        </div> 
      }
    </>
  )
}

export default Post