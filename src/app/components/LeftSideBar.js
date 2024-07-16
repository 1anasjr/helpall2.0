'use client'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import { usePathname } from 'next/navigation'

import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import Link from 'next/link';

const LeftSideBar = () => {
  const pathname = usePathname()
  return (
<nav className='sticky top-[100px] left-1 z-10 bg-[#181824] flex flex-col w-[20%] h-[530px] my-5 py-5 mx-1 rounded-2xl shadow-lg'>
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
                    <Link href='/search' passHref>
                        <div className={`flex items-center text-xl rounded-2xl py-4 px-5 space-x-3 ${pathname === '/about_us' ? 'text-black bg-white' : 'text-white hover:text-black hover:bg-white'}`}>
                            <SearchIcon />
                            <span>Search</span>
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
  )
}

export default LeftSideBar