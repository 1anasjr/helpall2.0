'use client'

import React, { useEffect, useState } from 'react'
import getComments from '../../../lib/commets/getComments';
import { useAuth } from '../providers/AuthProvider';

const Comments = ({uid,postId,userName}) => {

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const {currentUser} = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getComments();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error.message);
            }
        };

        fetchData();
        setRefresh(false)
        setComment('')
    }, [refresh]);
    

    const handlerSubmit = async (e) => {
        e.preventDefault()
        if(!comment||comment=="") return alert('Enter comment')

        setLoading(true)
        const data = {
            comment,
            uid:currentUser.uid,
            postId,
            userName:currentUser.displayName
        }
        try {
            const response = await fetch('/api/addComment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(data),
            });
            

            if (!response.ok) {
                throw new Error('Failed to add post');
            }

            alert('Post added successfully');
            setRefresh(true)

            // Optionally reset form fields or handle success state
        } catch (error) {
            console.error('Error adding post:', error.message);
            alert('Failed to add post');
        }
        setLoading(false)
    }

  return (
    <div className='w-full flex flex-col  mx-auto justify-center items-center '>
        <form className='w-[80%] flex flex-col items-center' onSubmit={(e)=>handlerSubmit(e)}>
            <textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Enter comments' className='w-full bg-gray-100 px-4 py-2 rounded-2xl mt-[50px]' name="comment_box" id="comment_box" rows={5}></textarea>
            <button disabled={loading} className='px-4 py-2 mt-5 ml-auto disabled:bg-green-200 bg-green-700 text-white'>Comment</button>
        </form>
        <div className='w-[80%] flex flex-col space-y-2 mt-5 '>
            {comments?.map((comment)=>{
                if(postId===comment.postId){
                return (
                    <span className={`px-4 py-2 w-fit rounded-3xl ${comment.uid === currentUser.uid? "bg-blue-400" : "bg-green-400 ml-auto" }`} >{comment.userName} : {comment.comment}</span>
                )
            }
            })}
        </div>
    </div>
  )
}

export default Comments