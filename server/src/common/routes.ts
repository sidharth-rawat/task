import { Router } from "express";
import { loginRouter } from "../app/login/login.routes";
import {employeeRoute} from '../app/employee/employee.routes'

export const allRoutes: Record<string, Router> = {
    'auth': loginRouter,
    'employee': employeeRoute
}
