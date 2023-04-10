import React, { memo,useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import {  home} from '../../services/auth.service';

const NewUser = () => {
  const navigate = useNavigate();
const {mutate,isLoading}= useMutation(home,{
    onSuccess: res=>{
        if(res.data.success){
            toast.success("Registeration successful")
            navigate('/dashboard')
        }
        else{
            toast.error(res.data.message)
        }
    },
        onError:(e:AxiosError)=>{
            const _error:any=e.response?.data;
            toast.error(_error.message|| "Please retry after sometime")
        }
    
})
const firstNameRef =useRef<HTMLInputElement>(null),
lastNameRef = useRef<HTMLInputElement>(null),
salary = useRef<HTMLInputElement>(null),
desigation =useRef<HTMLInputElement>(null);

const onEventSubmit =(e: any)=>{
    e.preventDefault();
    const userData: any = {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        salary: salary.current?.value,
        designation : desigation.current?.value
    }
    mutate(userData);
}
  return (
    <div className='bg-gray-50 pt-[60px] h-screen w-full text-center'>
      <section className='bg-white p-10 m-10 font-semibold rounded-lg text-2xl'>
      <div className='p-5 px-10 rounded-3xl border border-gray-100 shadow-2xl bg-white z-5 h-[610px] w-[520px] md:translate-x-1/2'>
        <h1 className='text-3xl font-semibold text-red-500'>
                            Employee
                        </h1>
                        {/* <p className='text-md text-gray-500'>Over <span className='font-semibold'>2 Million</span> customer trust our services, join the clan.</p> */}
                        <form onSubmit={onEventSubmit} className='p-5 my-3 bg-gray-50 rounded-xl'>
                            <div className='grid gap-2 mb-4 grid-cols-2'>
                                <div className=''>
                                    <label className='text-sm text-gray-700 mb-2'>First name <span className='text-red-500'>*</span></label>
                                    <input type="text" placeholder='John' name='firstName' className='border boder-gray-200 rounded-lg p-3 block w-full' ref={firstNameRef} />
                                </div>
                                <div className=''>
                                    <label className='text-sm text-gray-700 mb-2'>Last name</label>
                                    <input type="text" placeholder='Doe' name='lastName' className='border boder-gray-200 rounded-lg p-3 block w-full' ref={lastNameRef} />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label className='text-sm text-gray-700 mb-2'>Salary <span className='text-red-500'>*</span></label>
                                <input type="text" placeholder='Salary' name='Salary' className='border boder-gray-200 rounded-lg p-3 block w-full' ref={salary} />
                            </div>
                            <div className='mb-4'>
                                <label className='text-sm text-gray-700 mb-2'>Designation <span className='text-red-500'>*</span></label>
                                <input type="text" placeholder='Designation' name='Designation' className='border boder-gray-200 rounded-lg p-3 block w-full' ref={desigation} />
                            </div>
                            
                            <button disabled={isLoading} className='w-full text-lg rounded-xl bg-red-500 p-3 hover:bg-red-600 transition duration-150 ease-in mt-4 text-white border-0' type='submit'>
                                {isLoading ? 'Submitting...' :  'Add Empolyee'}
                            </button>
                        </form>
                    </div>
      </section>
    </div>
  )
}

export default memo( NewUser);