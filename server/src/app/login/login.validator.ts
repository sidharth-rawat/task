import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AUTH_ERROR, http_formatter } from "../../util";
import {z} from 'zod';

// ? RULES FOR VALIDATION.
export const SignupValidator = z.object({
    firstName: z.string().min(2).max(50).trim(),
    lastName: z.string().optional(),
    userName: z.string().min(2).max(50).trim(),
    password: z.string().min(4),
    isDeleted: z.boolean().default(false).optional()
})

// * MIDDLEWARE FOR VALIDATION.
export const signupValidatorMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const isValid = SignupValidator.safeParse(req.body);
    if(isValid.success) {
        next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(
            http_formatter(isValid.error, "Signup validation failed, please check", false)
        )
    }
}

export const loginValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const loginValidator = z.object({
        userName: z.string(),
        password: z.string()
    })

    const isValid = loginValidator.safeParse(req.body);
    if(isValid.success) {
        next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(
            http_formatter(isValid.error, AUTH_ERROR, false)
        )
    }
}
