import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from 'jsonwebtoken';
import { http_formatter } from "../util";

export const isUserAuthorized = (req: Request, res: Response, next: NextFunction) => {
    try {
        // tokens are normally shared via headers;
        // 'Bearer <token>';
        const {token} = req.body;
        jwt.verify(token, <string>process.env.PASSWORD_HASH, function(err: any, decoded_token: any){
            if(err) {
                return res.status(StatusCodes.UNAUTHORIZED).json(
                    http_formatter({}, "You are not authorized, please login.", false)
                )
            }
            console.log(decoded_token);
            if(decoded_token.role === 'user'){
                // authorization successful.
                next();
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json(
                    http_formatter({}, "You are not authorized, please login.", false)
                )
            }
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            http_formatter({}, "Something went wrong.", false)
        )
    }
}