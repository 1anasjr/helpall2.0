"use client"
import React, { useContext } from 'react';
import Post from './Post';
import { PostProvider } from '../providers/PostProvider';

const Feed = () => {
    const {posts} = useContext(PostProvider)
    console.log(posts);
  return (
    <div>
      <h2 className='text-3xl my-3 font-semibold dark:text-white'>Feeds</h2>
      <hr className='border-2 mb-3 border-blue-400' />

      {posts.length > 0 && posts.map((post, index) => (
        post.isEmergency === 0 && post.status === 1 && <Post key={post.id} iswidget={false} index={index} post={post} />
      ))}
    </div>
  );
};

export default Feed;
