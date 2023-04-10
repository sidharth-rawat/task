import React from 'react'

export const Loading = () => {
  return (
    <div className='text-xl flex justify-center'>
      <div className='bg-blue-300 w-[30px] h-[30px] rounded-full'>
        <span className="animate-ping inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      </div>
    </div>
  )
}
