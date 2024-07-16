'use client'
import React, { useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddDonation from './AddDonation';

const DonationProgress = ({percentage,currentDonation,totaldonate,title}) => {

  const [open, setOpen] = useState(false);

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
                  width: 900,
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                  overflowY: 'auto', // Use 'auto' instead of 'scroll'
                  maxHeight: '99vh', // Ensure the modal is not too tall
              }}
          >
              <AddDonation/>
          </Box>
        </Modal>

         <div className='w-[80%] bg-gray-300 flex flex-col rounded-3xl mx-auto justify-center items-center p-4'>
                <h4 className='text-xl font-bold mt-4'>Total Donaton</h4>
                <div className='my-2 text-lg font-semibold'>{`${currentDonation}/${totaldonate}`}</div>
                <div className='flex justify-center items-center space-x-5 w-full p-5'>
                    <LinearProgress className='w-[90%] py-2 rounded-full'  variant="determinate" value={percentage.toFixed(0) < 100 ? percentage.toFixed(0) : 100} />
                    <span >{percentage.toFixed(0) < 100 ? percentage.toFixed(0) : 100}%</span>
                </div>
                  <button onClick={handleOpen} className='px-5 w-[90%] py-2  rounded-2xl bg-green-800 mx-auto text-white'>Donate Now</button>
        </div>
    </>
  )
}

export default DonationProgress