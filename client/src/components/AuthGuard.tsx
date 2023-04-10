import React, { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../services/auth.service'

export type AuthGuradType = {
    component: JSX.Element,
    guard?: Function,
}

export const AuthGuard: React.FC<AuthGuradType> = ({component, guard}) => {
    const navigate = useNavigate();
    let isValid = useRef(false); // useRef does not result in a re-render.

    useEffect(() => {
      if(!isAuthenticated()){
        toast.error("You are not authorized, please login.")
        navigate('/login')
        isValid.current = false;
      }
    }, [navigate])
    
    return isValid ? component : <></>;
}
