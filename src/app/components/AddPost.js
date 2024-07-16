'use client'
import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/joy/CircularProgress';
import { PostProvider } from '../providers/PostProvider';
import { useAuth } from '../providers/AuthProvider';
import { useForm } from 'react-hook-form';


const AddPost = () => {

 const { currentUser } = useAuth()
 const {addPost} = useContext(PostProvider)
 const { register, handleSubmit,  formState: { errors }, watch, setValue  } = useForm();

//  const [isEmergency, setIsEmergency] = useState('');
//  const [emiratesId, setEmiratesId] = useState('');
//  const [recipientDescription, setRecipientDescription] = useState('');
//  const [totaldonate, setTotaldonate] = useState('');
//  const [title, setTitle] = useState('');
 const [document, setDocument] = useState('');
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
        handleImageUpload(event, setDocument);
    };

    const onSubmit = (data) => {
        console.log(data);
        setIsLoading(true);
        const post = {
            ...data,
            uid: currentUser.uid,
            userName: currentUser.displayName,
            email: currentUser.email,
            profileImg: currentUser.photoURL,
            thumbnail,
            document,
            currentDonation: 0,
            date: new Date().toISOString(),
        };

        // const post = {
        //     isEmergency,
        //     title,
        //     emiratesId,
        //     recipientDescription,
        //     totaldonate,
        //     uid: currentUser.uid,
        //     userName: currentUser.displayName,
        //     email: currentUser.email,
        //     profileImg: currentUser.photoURL,
        //     document,
        //     thumbnail
        //    }
        console.log(post);

        addPost(post).finally(() => setIsLoading(false));
    };


  
//   console.log({isEmergency});


  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className='flex flex-col'>
                <h3 className='text-xl my-3 font-semibold'>Post Request</h3>
                <hr className='border-2 mb-3 border-blue-400' />

                <div className="my-2 flex justify-between items-center space-x-3">
                    <div className='w-1/4'>
                        <label htmlFor="thumbnail" className='flex my-4 items-center justify-center cursor-pointer bg-[#1212] rounded-lg'>
                            {thumbnail === '' ? (
                                <div>
                                    <ImageIcon className='h-[40px] w-[40px] mx-4 my-[100px]' />
                                    <input onChange={(e) => handleThumbnailUpload(e, setThumbnail)} className='border hidden' id='thumbnail' type="file" />
                                </div>
                            ) : (
                                <div className='bg-[#1212]'>
                                    <img src={thumbnail} alt="Thumbnail Preview" className="" />
                                </div>
                            )}
                        </label>
                        {thumbnail !== '' && (
                            <div className='flex justify-center items-center bg-red-500 py-1 text-white rounded-lg'>
                                <button type="button" onClick={() => setThumbnail('')}>Cancel</button>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col w-3/4 space-y-3'>
                        <div>
                            <label htmlFor='title'>Title</label>
                            <div className="flex flex-col">
                                <input {...register('title', { required: true })} type="text" id="title" className="w-full my-2 border rounded p-2" />
                                {errors.title && <p style={{ color: 'red' }}>Title is required.</p>}
                            </div>
                        </div>
                        <label htmlFor="recipientDescription">Description</label>
                        <textarea {...register('recipientDescription', { required: true })} className='border' id="recipientDescription" rows={'8'}></textarea>
                        {errors.recipientDescription && <p style={{ color: 'red' }}>Description is required.</p>}
                    </div>
                </div>
            </div>

            <div className='flex justify-between space-x-2'>
                <div className='flex flex-col w-1/2 space-y-2 my-4'>
                    <label htmlFor="emiratesId">Emirates Id</label>
                    <input {...register('emiratesId', { required: true })} className='border rounded p-2' id='emiratesId' type="text" />
                    {errors.emiratesId && <p style={{ color: 'red' }}>Emirates ID is required.</p>}
                </div>
                
                <label htmlFor="document" className='flex w-1/2 cursor-pointer my-4 justify-between items-center bg-[#1212] px-4 rounded-lg'>
                    <div>
                 <div> Upload Documents {errors.document && <span style={{ color: 'red' }}>Document is required.</span>} </div>
                        <input {...register('document', { required: true })}  onChange={(e) => handleDocumentUpload(e, setDocument)} className='border hidden' id='document' type="file" />
                    </div>
                    <div>
                        {document === '' ? <AttachFileIcon /> : (
                            <div className='relative group'>
                                <button type="button" onClick={(e) => { e.preventDefault(); setDocument(''); }} className='absolute hidden group-hover:flex justify-center items-center w-full h-full group-hover:bg-red-500/50 group-hover:text-white z-20'>
                                    <CloseIcon />
                                </button>
                                <img src={document}  className='h-10 w-10' alt="Document Preview" />
                            </div>
                        )}
                    </div>
                </label>
            </div>

            <div className='flex justify-between space-x-2'>
                <div className='flex flex-col w-1/2 space-y-2'>
                    <label htmlFor="isEmergency">Is Emergency</label>
                    <select {...register('isEmergency', { required: true })} className='border rounded p-2' id='isEmergency'>
                        <option value="0">Not emergency</option>
                        <option value="1">Emergency</option>
                    </select>
                    {errors.isEmergency && <p style={{ color: 'red' }}>Emergency status is required.</p>}
                </div>

                <div className='flex flex-col w-1/2 space-y-2'>
                    <label htmlFor="totaldonate">Donation Amount</label>
                    <input {...register('totaldonate', { required: true })} className='border rounded p-2' id='totaldonate' type="number" />
                    {errors.totaldonate && <p style={{ color: 'red' }}>Donation amount is required.</p>}
                </div>
            </div>

            <div className='flex flex-col w-full space-y-2'>
                    <label htmlFor="type">Type</label>
                    <select {...register('type', { required: true })} className='border rounded p-2' id='type'>
                        <option value="education">Education</option>
                        <option value="orphanage">Orphanage</option>
                        <option value="medical_support">Medical Support</option>
                        <option value="famine">famine</option>
                    </select>
                    {errors.type && <p style={{ color: 'red' }}>Type status is required.</p>}
                </div>

            <button disabled={isLoading} className='bg-green-700 disabled:bg-green-300 w-full my-6 py-3 px-4 rounded-lg text-white'>
                {!isLoading ? "Submit" : 'Submitting...'}
            </button>
        </form>
  )
}

export default AddPost