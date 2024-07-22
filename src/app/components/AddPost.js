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
import { getAllCommunities } from '../../../lib/comunity/getAllComunities';
import { Cancel } from '@mui/icons-material';


const AddPost = ({handleClose}) => {

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
 const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchCommunities = async () => {
        const data = await getAllCommunities();
        setCommunities(data);        
        };

        fetchCommunities();
    }, []);



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
     
        setIsLoading(true);
        const comunity = communities[data.comunity];
        const post = {
            ...data,
            uid: currentUser.uid,
            userName: currentUser.displayName,
            email: currentUser.email,
            profileImg: currentUser.photoURL,
            comunity_id:comunity.id,
            comunity_name:comunity.comunity_name,
            thumbnail,
            document,
            currentDonation: 0,
            date: new Date().toISOString(),
        };

        console.log(post);

        addPost(post).finally(() => setIsLoading(false));
    };


  
//   console.log({isEmergency});


  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-xl my-3 font-semibold dark:text-white'>Post Request</h3>
                    <button onClick={handleClose} ><Cancel/></button>
                </div>
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
                            <label className='dark:text-white' htmlFor='title'>Title</label>
                            <div className="flex flex-col">
                                <input {...register('title', { required: true })} type="text" id="title" className="w-full my-2 border rounded p-2" />
                                {errors.title && <p style={{ color: 'red' }}>Title is required.</p>}
                            </div>
                        </div>
                        <label className='dark:text-white' htmlFor="recipientDescription">Description</label>
                        <textarea {...register('recipientDescription', { required: true })} className='border' id="recipientDescription" rows={'8'}></textarea>
                        {errors.recipientDescription && <p style={{ color: 'red' }}>Description is required.</p>}
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between space-x-2 space-y-2 md:space-y-0'>
                <div className='flex flex-col w-full md:w-1/2 space-y-2 my-4'>
                    <label className='dark:text-white' htmlFor="emiratesId">Emirates Id</label>
                    <input {...register('emiratesId', { required: true })} className='border rounded p-2' id='emiratesId' type="text" />
                    {errors.emiratesId && <p style={{ color: 'red' }}>Emirates ID is required.</p>}
                </div>
                
                <label htmlFor="document" className='flex w-full md:w-1/2 cursor-pointer my-4  justify-between items-center bg-[#1212] px-4 py-4 dark:bg-[#252525] md:py-0 rounded-lg'>
                    <div>
                 <div> <span className='dark:text-white'>Upload Documents</span> {errors.document && <span style={{ color: 'red' }}>Document is required.</span>} </div>
                        <input {...register('document', { required: true })}  onChange={(e) => handleDocumentUpload(e, setDocument)} className='border hidden' id='document' type="file" />
                    </div>
                    <div>
                        {document === '' ? <AttachFileIcon className='dark:text-white' /> : (
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

            <div className='flex flex-col md:flex-row my-4 md:my-2 justify-between space-x-2 space-y-2 md:space-y-0'>
                <div className='flex flex-col w-full md:w-1/2 space-y-2'>
                    <label className='dark:text-white' htmlFor="isEmergency">Is Emergency</label>
                    <select {...register('isEmergency', { required: true })} className='border rounded p-2' id='isEmergency'>
                        <option value="0">Not emergency</option>
                        <option value="1">Emergency</option>
                    </select>
                    {errors.isEmergency && <p style={{ color: 'red' }}>Emergency status is required.</p>}
                </div>

                <div className='flex flex-col w-full md:w-1/2 space-y-2'>
                    <label className='dark:text-white' htmlFor="totaldonate">Donation Amount</label>
                    <input {...register('totaldonate', { required: true })} className='border rounded p-2' id='totaldonate' type="number" />
                    {errors.totaldonate && <p style={{ color: 'red' }}>Donation amount is required.</p>}
                </div>
            </div>

            <div className='flex flex-col w-full space-y-2'>
                    <label className='dark:text-white' htmlFor="type">Type</label>
                    <select {...register('type', { required: true })} className='border rounded p-2' id='type'>
                        <option value="" >Choose...</option>
                        <option value="education">Education</option>
                        <option value="orphanage">Orphanage</option>
                        <option value="medical_support">Medical Support</option>
                        <option value="famine">famine</option>
                    </select>
                    {errors.type && <p style={{ color: 'red' }}>Type status is required.</p>}
            </div>

            <div className='flex flex-col w-full space-y-2'>
                    <label className='dark:text-white' htmlFor="comunity">comunity</label>
                    <select {...register('comunity', { required: true })} className='border rounded p-2' id='comunity'>
                        <option value="" >Choose...</option>
                        {
                            communities?.map((data,index)=>(
                                <option value={index} >{data.comunity_name}</option>
                            ))
                        }
                    </select>
                    {errors.comunity && <p style={{ color: 'red' }}>Comunity status is required.</p>}
            </div>

            <button disabled={isLoading} className='bg-green-700 disabled:bg-green-300 w-full my-6 py-3 px-4 rounded-lg text-white'>
                {!isLoading ? "Submit" : 'Submitting...'}
            </button>
        </form>
  )
}

export default AddPost