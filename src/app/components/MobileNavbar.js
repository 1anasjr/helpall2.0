'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../providers/AuthProvider';
import SearchIcon from '@mui/icons-material/Search';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { usePathname } from 'next/navigation'

import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { PostProvider } from '../providers/PostProvider';
import Post from './Post';

const MobileNavbar = () => {
    const router = useRouter();
    const [menu, setMenu] = useState('');
    const { currentUser } = useAuth();
    const pathname = usePathname();
    const {posts} = useContext(PostProvider)

    const toggleMenu = (menuType) => {
        setMenu(prevMenu => (prevMenu === menuType ? '' : menuType));
    };

    useEffect(() => {
      setMenu('')
    }, [pathname])
    

    return (
        <>
            {menu === "ls" && (
                <nav className='fixed top-0 left-0 z-40 bg-[#181824] flex flex-col w-full h-screen py-5'>
                    <ul className='h-full p-3 flex flex-col justify-evenly'>
                        <li>
                            <Link href='/' passHref>
                                <div className={`flex items-center text-xl rounded-2xl py-4 px-5 space-x-3 ${pathname === '/' ? 'text-black bg-white' : 'text-white hover:text-black hover:bg-white'}`}>
                                    <HomeIcon />
                                    <span>Home</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href='/about_us' passHref>
                                <div className={`flex items-center text-xl rounded-2xl py-4 px-5 space-x-3 ${pathname === '/about_us' ? 'text-black bg-white' : 'text-white hover:text-black hover:bg-white'}`}>
                                    <InfoIcon />
                                    <span>About us</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href='/view_request' passHref>
                                <div className={`flex items-center text-xl rounded-2xl py-4 px-5 space-x-3 ${pathname === '/view_request' ? 'text-black bg-white' : 'text-white hover:text-black hover:bg-white'}`}>
                                    <LocalPostOfficeIcon />
                                    <span>View request</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href='/comunity' passHref>
                                <div className={`flex items-center text-xl rounded-2xl py-4 px-5 space-x-3 ${pathname === '/comunity' ? 'text-black bg-white' : 'text-white hover:text-black hover:bg-white'}`}>
                                    <Diversity3Icon />
                                    <span>Comunity</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}

            {menu === "rs" && (
                <div className='fixed bg-gray-200 top-0 left-0 z-40 flex flex-col w-full h-screen py-5'>
                    <div className='flex flex-col w-full h-[500px] my-5 py-5 mx-1 sticky top-[100px] right-1 z-10 p-3'>
                      <h1 className='text-2xl'>Emergency requests</h1>
                      <div className='rigthsidebar space-y-5 my-3 overflow-y-scroll'>
                        {posts.map((post) => (
                          post.isEmergency === 1 && <Post key={post.id} post={post} />
                        ))}
                      </div>
                    </div>
                </div>
            )}

            <div className='bg-[#181824] text-white p-5 md:hidden flex justify-evenly items-center w-full fixed bottom-0 z-50'>
                <button onClick={() => toggleMenu('ls')}><div><MenuIcon /></div></button>
                <Link href={"/search"}><SearchIcon /></Link>
                <button onClick={() => toggleMenu('rs')}><div><EmergencyShareIcon /></div></button>
                <button><div><Avatar alt={currentUser?.displayName} src={currentUser?.photoURL} /></div></button>
            </div>
        </>
    );
}

export default MobileNavbar;
