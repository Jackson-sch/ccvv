import { Button } from '@nextui-org/react'
import React from 'react'

export default function notfound() {
  return (
    <div className='text-default-500 m-auto flex flex-col w-4/12 h-auto items-center'>
      <h1>Not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button color='warning'>
        <a href='/dashboard'>Back to home</a>
      </Button>
    </div>
  )
}
