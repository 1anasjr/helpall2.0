'use client'
import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { PostProvider } from '../providers/PostProvider';
import { useAuth } from '../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { createCommunity } from '../../../lib/comunity/createComunity';


const ComunityForm = () => {

 const { currentUser } = useAuth()
 const { register, handleSubmit,  formState: { errors }, watch, setValue  } = useForm();


 const [businessLicense, setBusinessLicense] = useState('');
 const [thumbnail, setThumbnail] = useState('');
 const [isLoading, setIsLoading] = useState(false); 

      const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };


    const handleImageUpload = (event,set) => 
        {
        const Reader = new FileReader()
        if(event.target.files[0]){
            Reader.readAsDataURL(event.target.files[0])
        }

        Reader.onload=(event)=>{
            console.log(event.target.name);
            set(event.target.result)
        }
    };

    const handleThumbnailUpload = (event) => {
        handleImageUpload(event, setThumbnail);
    };

    const handleDocumentUpload = (event) => {
        handleImageUpload(event, setBusinessLicense);
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
    
        const community = {
          ...data,
          uid: currentUser.uid,
          OwnerName: currentUser.displayName,
          email: currentUser.email,
          thumbnail,
          businessLicense,
          date: new Date().toISOString(),
        };
    
        try {
          await createCommunity(community);
        } catch (error) {
          console.error('Error saving community: ', error);
        } finally {
          setIsLoading(false);
          alert('Success')
        }
      };


  
//   console.log({isEmergency});


  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className='flex flex-col'>
                <h3 className='text-xl my-3 font-semibold dark:text-white'>Comunity Form</h3>
                <hr className='border-2 mb-3 border-blue-400' />

                <div className="my-2 flex-col flex md:flex-row justify-between items-center space-x-3">
                    <div className='w-full md:w-1/4'>
                        <label htmlFor="thumbnail" className='flex my-4 mx-auto items-center overflow-hidden  justify-center cursor-pointer bg-[#1212] dark:bg-gray-100 rounded-lg h-[200px] w-[200px]  ' >
                            {thumbnail === '' ? (
                                <div>
                                    <ImageIcon className='h-[40px] w-[40px] mx-4 my-[100px]' />
                                    <input onChange={(e) => handleThumbnailUpload(e, setThumbnail)} className='border hidden' id='thumbnail' type="file" />
                                </div>
                            ) : (
                                <div className='bg-[#1212] h-[200px] w-[200px]'>
                                    <img src={thumbnail} alt="Thumbnail Preview "  className="object-cover" />
                                </div>
                            )}
                        </label>
                        {thumbnail !== '' && (
                            <div className='flex justify-center items-center bg-red-500 py-1 text-white rounded-lg'>
                                <button type="button" onClick={() => setThumbnail('')}>Cancel</button>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col w-full md:w-3/4 space-y-3'>
                        <div>
                            <label className='dark:text-white' htmlFor='comunity_name'>Comunity Name</label>
                            <div className="flex flex-col">
                                <input {...register('comunity_name', { required: true })} type="text" id="comunity_name" className="w-full my-2 border rounded p-2" />
                                {errors.comunity_name && <p style={{ color: 'red' }}>Comunity Name is required.</p>}
                            </div>
                        </div>
                        <label className='dark:text-white' htmlFor="description">Description</label>
                        <textarea {...register('description', { required: true })} className='border' id="description" rows={'8'}></textarea>
                        {errors.description && <p style={{ color: 'red' }}>Description is required.</p>}
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between space-x-2 space-y-2 md:space-y-0'>
                <div className='flex flex-col w-full md:w-1/2 space-y-2 my-4'>
                    <label className='dark:text-white' htmlFor="passportid">Passport Id</label>
                    <input {...register('passportid', { required: true })} className='border rounded p-2' id='passportid' type="text" />
                    {errors.passportid && <p style={{ color: 'red' }}>Passport ID is required.</p>}
                </div>
                
                <label htmlFor="business_License" className='flex w-full md:w-1/2 cursor-pointer my-4  justify-between items-center bg-[#1212] px-4 py-4 dark:bg-[#252525] md:py-0 rounded-lg'>
                    <div>
                 <div> <span className='dark:text-white'>Upload Business License</span> {errors.business_License && <span style={{ color: 'red' }}>Business License is required.</span>} </div>
                        <input {...register('business_License', { required: true })}  onChange={(e) => handleDocumentUpload(e, businessLicense)} className='border hidden' id='business_License' type="file" />
                    </div>
                    <div>
                        {businessLicense === '' ? <AttachFileIcon className='dark:text-white' /> : (
                            <div className='relative group'>
                                <button type="button" onClick={(e) => { e.preventDefault(); setBusinessLicense(''); }} className='absolute hidden group-hover:flex justify-center items-center w-full h-full group-hover:bg-red-500/50 group-hover:text-white z-20'>
                                    <CloseIcon />
                                </button>
                                <img src={businessLicense}  className='h-10 w-10' alt="Document Preview" />
                            </div>
                        )}
                    </div>
                </label>
            </div>

            <div className='flex flex-col md:flex-row my-4 md:my-2 justify-between space-x-2 space-y-2 md:space-y-0'>

                <div className='flex flex-col w-full md:w-1/2 space-y-2'>
                    <label className='dark:text-white' htmlFor="visaId">Visa Id</label>
                    <input {...register('visaId', { required: true })} className='border rounded p-2' id='visaId' type="text" />
                    {errors.visaId && <p style={{ color: 'red' }}> Visa Id is required.</p>}
                </div>
            </div>

            <button disabled={isLoading} className='bg-green-700 disabled:bg-green-300 w-full my-6 py-3 px-4 rounded-lg text-white'>
                {!isLoading ? "Submit" : 'Submitting...'}
            </button>
        </form>
  )
}

export default ComunityForm