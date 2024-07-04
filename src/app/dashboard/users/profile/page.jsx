import Hero from '@/components/users/profile/Hero'
import Profile from '@/components/users/profile/Profile'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-4'>
    
    <Hero />
    <Profile />
    </div>
  )
}
