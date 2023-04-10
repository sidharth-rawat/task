import { AxiosError } from 'axios';
import React, { memo, useLayoutEffect, useRef } from 'react'
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Github, Google } from '../components/icons';
import { isAuthenticated, login } from '../services/auth.service';
import { setAuthToken } from '../services/storage.service';

const Login = () => {
    const navigate = useNavigate();
    const { mutate, isLoading } = useMutation(login, {
        onSuccess: res => {
            if(res.data.success) {
                const { token } = res.data.data;
                toast.success("Welcome to the world of bright developer.", {className: 'p-3 bg-gray-800 text-white'})
                navigate('/dashboard');
                setAuthToken(token)
            } else {
                toast.error(res.data.message)
            }
        },
        onError: (err: AxiosError) => {
            const data: any = err.response?.data;  
            toast.error(data?.message || "Signup failed, please retry after sometime.")
        }
    });

    // TODO: you guys can check useForm() hook.
    const userNameRef = useRef<HTMLInputElement>(null), 
        passwrodRef = useRef<HTMLInputElement>(null);

    const onLoginSubmit = async (e: any) => {
        e.preventDefault();
        const userData: any = {
            userName: userNameRef.current?.value,
            password: passwrodRef.current?.value
        }

        Object.keys(userData).forEach(el => {
            if(!userData[el]) {
                toast.error(`${el} is required`);
                return;
            }
        })

        mutate(userData);
    }

    useLayoutEffect(() => {
        if(isAuthenticated()){
            navigate('/dashboard')
        }
    }, [])
    
    return (
        <section className='absolute top-0 left-0 z-1 pt-[100px] md:pt-[60px] h-screen w-screen'>
            <div className='grid md:grid-cols-3'>
                <div className='col-span-2 hidden md:block bg-blue-500 h-[95vh] w-full border rounded-r-3xl'></div>
                <div className='col-span-1 flex justify-center md:justify-start items-center w-full'>
                    <div className='p-5 px-10 rounded-3xl border border-gray-100 shadow-2xl bg-white z-5 h-[610px] w-[520px] md:-translate-x-1/2'>
                        <h1 className='text-3xl font-semibold text-blue-600'>
                            Login
                        </h1>
                        <p className='text-md text-gray-500'>We provide 100% safety and security to out customer.</p>
                        <form onSubmit={onLoginSubmit} className='p-5 my-3 bg-gray-50 rounded-xl'>
                            <div className='mb-4'>
                                <label className='text-sm text-gray-700 mb-2'>Username <span className='text-red-500'>*</span></label>
                                <input type="text" ref={userNameRef} placeholder='Username' name='username' className='border boder-gray-200 rounded-lg p-3 block w-full' />
                            </div>
                            <div className='mb-4'>
                                <label className='text-sm text-gray-700 mb-2'>Password <span className='text-red-500'>*</span></label>
                                <input type="password" ref={passwrodRef} placeholder='*****' name='password' className='border boder-gray-200 rounded-lg p-3 block w-full' />
                            </div>
                            <button disabled={isLoading} className='w-full text-lg rounded-xl bg-blue-500 p-3 hover:bg-blue-600 transition duration-150 ease-in mt-4 text-white border-0' type='submit'>
                                {isLoading ? 'submitting...' : 'Login'}
                            </button>
                            <div className='flex mt-3 justify-end text-gray-600'>
                                <span className='underline underline-offset-4 transition ease-in hover:no-underline cursor-pointer'>
                                    forgot password?
                                </span>
                            </div>
                        </form>
                        <hr />

                        <button disabled={isLoading} className='w-full mb-5 text-lg rounded-xl bg-white p-3 border border-gray-100 hover:border-gray-200 transition duration-150 ease-in mt-4 text-gray-700 flex items-center justify-center gap-3' type='submit'>
                            <Google /> Login with google
                        </button>

                        <button disabled={isLoading} className='w-full text-lg rounded-xl bg-white p-3 border border-gray-100 hover:border-gray-200 transition duration-150 ease-in mt-4 text-gray-700 flex items-center justify-center gap-3' type='submit'>
                            <Github /> Login with github
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default memo(Login);