import { lazy } from "react";

export const Home = lazy(() => import('./home.view'))
export const Login = lazy(() => import('./login.view'))
export const Signup = lazy(() => import('./signup.view'))
export const Dashboard = lazy(() => import('./dashboard/dashboard.view'));
export const NewUser = lazy(()=>import('./dashboard/newUser.view'))