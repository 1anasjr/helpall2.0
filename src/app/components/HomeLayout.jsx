'use client'
import React from 'react'
import Header from './Header'
import { usePathname } from 'next/navigation'
import LeftSideBar from './LeftSideBar'
import RightSidebar from './RightSideBar'
import ChatBot from './ChatBot'
import MobileNavbar from './MobileNavbar'

const HomeLayout = ({children}) => {
    const pathname = usePathname()

  return (
    <>
     { 
      (pathname !== '/login' && !pathname.startsWith('/dashboard') ) ? <div className='w-s'>
          <Header/>
          <ChatBot/>
          <div className='flex justify-between'>
              <LeftSideBar/>
              <div className='w-full md:w-[60%] mx-4 mt-5'>
              {children}
              </div>
              <RightSidebar/> 
          </div>
          <MobileNavbar/>
      </div>:
      <div>
              {children}
      </div>
     }
    </>
  )
}

export default HomeLayout