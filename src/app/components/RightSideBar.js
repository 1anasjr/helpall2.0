'use client'
import React, { useState, useEffect, useContext } from 'react';
import Post from './Post';
import { PostProvider } from '../providers/PostProvider';


const RightSidebar = () => {

  const {posts} = useContext(PostProvider)


  return (
    <div className='flex flex-col w-[20%] h-[500px] my-5 py-5 mx-1 sticky top-[100px] right-1 z-10'>
      <h1 className='text-2xl'>Emergency requests</h1>
      <div className='rigthsidebar space-y-5 my-3 overflow-y-scroll'>
        {posts.map((post) => (
          post.isEmergency === 1 && <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
