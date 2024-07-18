import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'

const layout = ({ children }) => {
  return (
    <div className='flex justify-between bg-[#ece5e5] max-h-screen'>
        <div className='w-[17%]'>
            <DashboardSidebar/>
        </div>
        <div className='flex-grow w-[50%] m-5 rounded-3xl p-5 bg-gray-100 shadow-xl overflow-y-auto '>
            {children}
        </div>
    </div>
  )
}

export default layout