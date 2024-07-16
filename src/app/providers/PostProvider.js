'use client'

import { createContext, useEffect, useState } from 'react'

export const PostProvider = createContext({});

export default function PostState({ children }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const [refresh, setRefresh] = useState(false); // Initialize loading state

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/generatePost', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const post = await response.json();
            // console.log('Fetched posts:', post); // Log the fetched data
            setPosts(post);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const addPost = async (post) => {
        try {
            const response = await fetch('/api/addPost', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(post),
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
    }

    const editPost = async (uid,id,post) => {
        try {
            const response = await fetch('/api/editPost', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({uid,id,post}),
            });

            if (!response.ok) {
                throw new Error('Failed to add post');
            }

            alert('Post updated successfully');
            setRefresh(true)

            // Optionally reset form fields or handle success state
        } catch (error) {
            console.error('Error updating post:', error.message);
            alert('Failed to update post');
        }
    }

    const deletePost = async (uid,id) => {
        try {
            const response = await fetch('/api/deletePost', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({uid,id}),
            });

            if (!response.ok) {
                throw new Error('Failed to add post');
            }

            alert('Post Deleted successfully');
            setRefresh(true)

            // Optionally reset form fields or handle success state
        } catch (error) {
            console.error('Error Deleteing post:', error.message);
            alert('Failed to update post');
        }
    }

    useEffect(() => {
        fetchPosts();
        setRefresh(false)
    }, [refresh]);

    return (
        <PostProvider.Provider value={{posts,loading,addPost,editPost,deletePost}}>
            {children}
        </PostProvider.Provider>
    );
}
