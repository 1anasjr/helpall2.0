'use client'
import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { PostProvider } from '../providers/PostProvider';
import Post from './Post';

const SearchSection = ({uid}) => {
    const [filterPost, setFilterPost] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const [error, setError] = useState('');
    const { posts } = useContext(PostProvider);

    useEffect(() => {
        filterPosts();
    }, [posts, searchTerm, activeFilters]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const toggleFilter = (filter) => {
        setActiveFilters(prevFilters => 
            prevFilters.includes(filter) 
                ? prevFilters.filter(f => f !== filter) 
                : [...prevFilters, filter]
        );
    };

    const filterPosts = () => {
        let filtered = posts;

        if (searchTerm) {
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(searchTerm)
            );
        }

        if (uid) {
            filtered = filtered.filter(post => post.uid === uid);
        }

        if (activeFilters.length > 0) {
            filtered = filtered.filter(post => 
                activeFilters.includes(post.type.toLowerCase())
            );
        }

        if (filtered.length === 0) {
            setError('No posts available for the selected filters.');
        } else {
            setError('');
        }

        setFilterPost(filtered);
    };

    return (
        <>
            <div className='w-full bg-gray-100 flex flex-col items-center p-4 dark:text-white dark:bg-[#121212] rounded-3xl shadow-xl'>
                <div className='bg-white py-2 rounded-full w-full flex justify-between'>
                    <input 
                        className='w-full border-none focus:outline-none focus:ring-0 mx-2 px-3' 
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by title"
                    />
                    <SearchIcon className='mx-2'/>
                </div> 
                <div className='w-full mt-4'>
                    <h4 className='text-2xl font-semibold'>Filters</h4>
                    <div className='flex space-x-2 my-2'>
                        <button 
                            type="button" 
                            onClick={() => toggleFilter('education')} 
                            className={`p-2 md:p-3 rounded-full ${activeFilters.includes('education') ? 'bg-blue-200 dark:bg-blue-700' : 'bg-gray-200 dark:bg-[#272727]'}`}
                        >
                            Education
                        </button>
                        <button 
                            type="button" 
                            onClick={() => toggleFilter('orphanage')} 
                            className={`p-2 md:p-3 rounded-full ${activeFilters.includes('orphanage') ? 'bg-blue-200 dark:bg-blue-700' : 'bg-gray-200 dark:bg-[#272727]'}`}
                        >
                            Orphanage
                        </button>
                        <button 
                            type="button" 
                            onClick={() => toggleFilter('medical_support')} 
                            className={`p-2 md:p-3 rounded-full ${activeFilters.includes('medical_support') ? 'bg-blue-200 dark:bg-blue-700' : 'bg-gray-200 dark:bg-[#272727]'}`}
                        >
                            Medical Support
                        </button>
                        <button 
                            type="button" 
                            onClick={() => toggleFilter('famine')} 
                            className={`p-2 md:p-3 rounded-full ${activeFilters.includes('famine') ? 'bg-blue-200 dark:bg-blue-700' : 'bg-gray-200 dark:bg-[#272727]'}`}
                        >
                            Famine
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full mt-4'>
                <h2 className='text-3xl my-3 font-semibold dark:text-white'>Posts</h2>
                <hr className='border-2 mb-3 border-blue-400' />

                {error && <p className='text-red-500'>{error}</p>}

                {filterPost.length > 0 && filterPost.map((post, index) => (
                    <Post  key={post.id} index={index} post={post} iswidget={false}/>
                ))}
            </div>
        </>
    );
}

export default SearchSection;
