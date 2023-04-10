import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const AdminAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { token } = req.headers;
    // Token - 'Bearer adncadkcn19212nlasncalASXSAxnasjnxasXASXnaoisxabnsx'
    if(token === 'admin'){
        next();        
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "you are not authorized",
            body: null,
            success: false,
        });
    }
}

