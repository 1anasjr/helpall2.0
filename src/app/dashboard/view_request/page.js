'use client'
import { PostProvider } from '@/app/providers/PostProvider'
import React, { useContext, useEffect, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DashboardInfoModal from '@/app/components/DashboardInfoModal';
import DescriptionIcon from '@mui/icons-material/Description';
import PendingIcon from '@mui/icons-material/Pending';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from '@/app/providers/AuthProvider';
import getCommunityUid from '../../../../lib/comunity/getComunityByUid';
import { useNotification } from '@/app/providers/NotificationProvider';

const Page = () => {
    const { posts , editPost } = useContext(PostProvider);
    const [type, setType] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [anchorEl, setAnchorEl] = useState(null);
    const [postDetails, setPostDetails] = useState(null)
    const {currentUser} = useAuth();
    const [communities, setCommunities] = useState([]);
    const [isDisable, setDisable] = useState(false);
    let communityIds =  null
    let communityName = null

    if(communities){
     communityIds = communities[0]?.id
     communityName = communities[0]?.comunity_name
    }
    const {addNotification} = useNotification()


    useEffect(() => {
      const fetchCommunities = async () => {
        try {
          const communityData = await getCommunityUid(currentUser.uid);
          setCommunities(communityData);

        } catch (error) {
          console.error('Error fetching communities:', error);
        }
      };
        if(currentUser?.uid){
        fetchCommunities();
        }
    }, [currentUser]);

    // communities.map((u)=>console.log(u))
    // console.log(communities[0]?.id);/


    

    const copyToClipboard = (uid) => {
        navigator.clipboard.writeText(uid).then(() => {
            alert('UID copied to clipboard');
        });
    };

    const shortenUid = (uid) => {
        if (uid.length <= 10) return uid;
        return `${uid.slice(0, 5)}...${uid.slice(-5)}`;
    };

    const truncateText = (text, wordLimit) => {
        const words = text?.split(' ');
        if (words?.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
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

      const showPostDetails =(post,type)=>{
        setType(type)
        setPostDetails(post)
        console.log({type,post});
        handleOpenModal()
      }

      const handleStatus = async (post,status) =>{
        setDisable(true)
        const updated_post = {
            ...post,
            status:parseInt(status)
        }
        await editPost(post.uid,post.id,updated_post)

        let txt = `Your request is rejected by ${communityName}`

        if(status===1){
          txt =`Your request is approved by ${communityName}`
        }

        const link = `/post/${post.uid}/${post.id}`
        addNotification(post.uid,txt,link)
        setDisable(false)
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
                            width:  isMobile ? '90%' : 1000,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            overflowY: 'auto', // Use 'auto' instead of 'scroll'
                            maxHeight: '99vh', // Ensure the modal is not too tall
                        }}
                >
                    <DashboardInfoModal type = {type} post={postDetails}/>
                </Box>
            </Modal>  
            <div>
                <h1 className='text-4xl'>Request</h1>
                <hr className='border-2 mb-3 border-blue-400 my-2' />
                <div>
                    <table className='w-full'>
                        <thead>
                            <tr className=''>
                                <th className='text-left p-2'>uid</th>
                                <th className='text-left p-2'>Username</th>
                                <th className='text-left p-2'>Title</th>
                                <th className='text-left p-2'>Reason</th>
                                <th className='text-left p-2'>Emergency</th>
                                <th className='text-left p-2'>Type</th>
                                <th className='text-left p-2'>Documents</th>
                                <th className='text-left p-2'>Donation</th>
                                <th className='text-left p-2'>status</th>
                                <th className='text-left p-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {posts && posts.map((post, index) => (
                            <>
                            {/* {console.log(communityIds === post.comunity_id,communityIds,post.comunity_id)} */}
                               {communityIds === post.comunity_id && <tr key={index}>
                                    <td className='p-2 text-sm cursor-pointer' onClick={() => copyToClipboard(post.uid)}>
                                        {shortenUid(post.uid)}
                                    </td>
                                    <td className='p-2'>{post.userName}</td>
                                    <td className='p-2'>{post.title}</td>
                                    <td className='p-2'><button onClick={()=>showPostDetails(post,"description")}>{truncateText(post.recipientDescription,10)}</button></td>
                                    <td className='p-2'>{post.isEmergency === 0? 'not emergency':'emergency'}</td>
                                    <td className='p-2'>{post.type}</td>
                                    <td className='p-2 text-center text-blue-400'><button onClick={()=>showPostDetails(post,"document")}><DescriptionIcon/></button></td>
                                    <td className='p-2'>{post.totaldonate}</td>
                                    <td className='p-2'>
                                        {post.status ===0  &&  <span className='w-6 px-2 py-0.5 rounded-3xl border border-yellow-500 bg-yellow-200'>Pending</span>}
                                        {post.status ===-1 &&  <span className='w-6 px-2 py-0.5 rounded-3xl border border-red-500 bg-red-200'>Reject</span>}
                                        {post.status ===1  &&  <span className='w-6 px-2 py-0.5 rounded-3xl border border-green-500 bg-green-200'>Approve</span>}
                                    </td> 
                                    <td className='p-2'>
                                        <ul className='flex space-x-2'>
                                            <li><button><InfoIcon className='h-5 w-5 text-blue-600'/></button></li>
                                            <li><button disabled={isDisable} onClick={()=>{handleStatus(post,-1)}}><ClearIcon className='h-5 w-5 text-red-600'/></button></li>
                                            <li><button disabled={isDisable} onClick={()=>{handleStatus(post,1)}}><DoneIcon className='h-5 w-5 text-green-600'/></button></li>
                                            <li><button disabled={isDisable} onClick={()=>{handleStatus(post,0)}}><PendingIcon className='h-5 w-5 text-yellow-600'/></button></li>
                                        </ul>
                                    </td>
                                </tr>}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Page
