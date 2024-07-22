'use client'
import { Avatar } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const DashboardSidebar = () => {
  const pathname = usePathname()

  return (
    <div>
        <div className='sticky top-0 left-0 z-10 bg-[#181824] flex flex-col  h-screen py-5 px-2 mr-1 rounded-br-xl rounded-tr-xl   shadow-lg'>
                <div className='mx-auto'>
                    <Avatar src='' sx={{ width: 140, height: 140 }}/>
                </div>
                <div className='flex flex-col space-y-5  my-6 h-full'> 
                    {/* <Link className={`flex items-center text-xl rounded-2xl py-4 px-5 space-x-3 ${pathname === '/' ? 'text-black bg-white' : 'text-white hover:text-black hover:bg-white'}`} href={"/dashboard"}>Analytic</Link> */}
                    <Link className={`flex items-center text-xl rounded-2xl py-4 px-5 space-x-3 ${pathname === '//dashboard/view_request' ? 'text-black bg-white' : 'text-white hover:text-black hover:bg-white'}`} href={"/dashboard/view_request"}>Requests</Link>
                    <Link className={`flex items-center text-xl rounded-2xl py-4 px-5 space-x-3 ${pathname === '/dashboard/create_comunity' ? 'text-black bg-white' : 'text-white hover:text-black hover:bg-white'}`} href={"/dashboard/create_comunity"}>Create Comunity</Link>
                    <Link className={`flex items-center text-xl rounded-2xl py-4 px-5 space-x-3 ${pathname === '/' ? 'text-black bg-white' : 'text-white hover:text-black hover:bg-white'}`} href={"/"}>To Website</Link>
                 </div>
        </div>
    </div>
  )
}

export default DashboardSidebar