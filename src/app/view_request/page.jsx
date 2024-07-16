'use client'
import React from 'react'
import SearchSection from '../components/SearchSection'
import { useAuth } from '../providers/AuthProvider';

const page = () => {
  const { currentUser } = useAuth()
  return (
    <div>
       <SearchSection uid ={currentUser?.uid}/>
    </div>
  )
}

export default page