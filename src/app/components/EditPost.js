import React, { useContext, useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress'; // Updated import
import { PostProvider } from '../providers/PostProvider';
import { useAuth } from '../providers/AuthProvider';
import { Cancel } from '@mui/icons-material';

const EditPost = ({ post,handleClose }) => {

  const [isEmergency, setIsEmergency] = useState(post.isEmergency);
  const [emiratesId, setEmiratesId] = useState(post.emiratesId);
  const [recipientDescription, setRecipientDescription] = useState(post.recipientDescription);
  const [totaldonate, setTotaldonate] = useState(post.totaldonate);
  const [title, setTitle] = useState(post.title);
  const [document, setDocument] = useState(post.document || ''); // Handle initial state properly
  const [thumbnail, setThumbnail] = useState(post.thumbnail || ''); // Handle initial state properly
  const [isLoading, setIsLoading] = useState(false);
  const { editPost } = useContext(PostProvider);
  const { currentUser } = useAuth()

  const handleImageUpload = (event, setFunc) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        setFunc(event.target.result);
      };
    }
  };

  const handleThumbnailUpload = (event) => {
    handleImageUpload(event, setThumbnail);
  };

  const handleDocumentUpload = (event) => {
    handleImageUpload(event, setDocument);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      
      const updatedPost = {
        isEmergency:parseInt(isEmergency),
        title,
        emiratesId,
        currentDonation:post.currentDonation,
        recipientDescription,
        totaldonate:parseInt(totaldonate),
        document,
        thumbnail
      };

      await editPost(post.uid,post.id, updatedPost);

    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.'); // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">

      <div className="flex flex-col">

      <div className='flex justify-between items-center'>
            <h3 className='text-xl my-3 font-semibold dark:text-white'>Update Request</h3>
            <button type='button' onClick={handleClose} ><Cancel/></button>
       </div>

        <div className="my-2 flex-col flex md:flex-row justify-between items-center space-x-3">

          <div className="w-full md:w-1/4">
            <label htmlFor="thumbnail" className="flex my-4 mx-auto items-center overflow-hidden  justify-center cursor-pointer bg-[#1212] dark:bg-gray-100 rounded-lg h-[200px] w-[200px]">
              {thumbnail === '' ? (
                <>
                  <ImageIcon className="h-[40px] w-[40px] mx-4 my-[100px]" />
                </>
              ) : (
                <div className='bg-[#1212] h-[200px] w-[200px]'>
                    <img src={thumbnail} alt="Thumbnail Preview "  className="object-cover" />
                 </div>
              )}
              <input onChange={handleThumbnailUpload} className="hidden" id="thumbnail" name="thumbnail" type="file" />
            </label>
            {thumbnail !== '' && (
              <div className="flex justify-center items-center bg-red-500 py-1 text-white rounded-lg">
                <button onClick={() => setThumbnail('')}>Cancel</button>
              </div>
            )}
          </div>

          <div className="flex flex-col w-full md:w-3/4 space-y-3 mt-2">
            <div>
              <label className='dark:text-white' htmlFor="title">Title</label>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" id="title" className="w-full my-2 border rounded p-2" name="title" required />
            </div>
            <label className='dark:text-white' htmlFor="description">Description</label>
            <textarea onChange={(e) => setRecipientDescription(e.target.value)} value={recipientDescription} className="border rounded p-2" name="recipientDescription" id="description" rows={8}></textarea>
          </div>

        </div>

      </div>

      <div className="flex flex-col md:flex-row justify-between space-x-2 space-y-2 md:space-y-0">

        <div className="flex flex-col w-full md:w-1/2 space-y-2 my-4">
          <label className='dark:text-white' htmlFor="emiratesId">Emirates Id</label>
          <input onChange={(e) => setEmiratesId(e.target.value)} value={emiratesId} className="border rounded p-2" required id="emiratesId" name="emiratesId" type="text" />
        </div>

        <label htmlFor="document" className="flex w-full md:w-1/2 cursor-pointer my-4  justify-between items-center bg-[#1212] px-4 py-4  dark:bg-[#252525] md:py-0 rounded-lg">
          <span  className='dark:text-white'>Upload Documents</span>
          <input onChange={handleDocumentUpload} className="hidden" id="document" name="document" type="file" />
          <div>
            {document === '' ? <AttachFileIcon  className='dark:text-white'/> :
              <div className="relative group">
                <button onClick={(e) => { e.preventDefault(); setDocument(''); }} className="absolute hidden group-hover:flex justify-center items-center w-full h-full group-hover:bg-red-500/50 group-hover:text-white z-20">
                  <CloseIcon />
                </button>
                <img src={document} className="h-10 w-10" alt="" />
              </div>
            }
          </div>
        </label>

      </div>

      <div className="flex flex-col md:flex-row my-4 md:my-2 justify-between space-x-2 space-y-2 md:space-y-0">

        <div className="flex flex-col w-full md:w-1/2 space-y-2">
          <label className='dark:text-white' htmlFor="isEmergency">Emergency Status</label>
          <select onChange={(e) => setIsEmergency(e.target.value)} value={isEmergency} className="border rounded p-2" id="isEmergency" name="isEmergency">
            <option value="0">Not emergency</option>
            <option value="1">Emergency</option>
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/2 space-y-2">
          <label className='dark:text-white' htmlFor="totaldonate">Donation Amount</label>
          <input onChange={(e) => setTotaldonate(e.target.value)} value={totaldonate} className="border rounded p-2" required id="totaldonate" name="totaldonate" type="number" />
        </div>

      </div>

      <div className='flex flex-col w-full space-y-2'>
                    <label  className='dark:text-white' htmlFor="type">Type</label>
                    <select className='border rounded p-2' id='type'>
                        <option selected={post.type === 'education'} value="education">Education</option>
                        <option selected={post.type === 'orphanage'} value="orphanage">Orphanage</option>
                        <option selected={post.type === 'medical_support'} value="medical_support">Medical Support</option>
                        <option selected={post.type === 'famine'} value="famine">famine</option>
                    </select>
                   
      </div>

      <button disabled={isLoading} className="bg-green-700 disabled:bg-green-300 w-full my-6 py-3 px-4 rounded-lg text-white">
        {!isLoading ? "Submit" : <CircularProgress size={24} />} {/* Updated CircularProgress usage */}
      </button>

    </form>
  );
};

export default EditPost;
