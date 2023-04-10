
import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Dashboard= () => {

  return (
    <>
      <div className='bg-gray-50 pt-[60px] h-screen w-full text-center'>
    <Link to='/dashboard/newuser'>  <button className='p-2 px-5 bg-red-500 float-right mt-7 mr-7 hover:bg-red-600 transition duration-150 text-white rounded' type='button'>
    Add</button></Link>
      <section className='bg-white p-10 m-10 font-semibold rounded-lg text-2xl'>
                
          
Dashboard
</section>
    </div></>
  )
}

export default Dashboard