import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller"
import { ILogin, Login } from "./login.schema"
import * as bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";
import * as jwt from 'jsonwebtoken';
import { AUTH_ERROR, http_formatter } from "../../util";
import { logger } from "../../common/logger";

class LoginController extends BaseController<ILogin>{
    /**
     * middleware to encrypt the password present in req.body
     * @param req : Request
     * @param res Response
     * @param next NextFunction
     */
    public encryptPassword = (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.password) { // over kill.
            return this.errorHandler(res, new Error("Password is required"), StatusCodes.BAD_REQUEST);
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            // Store hash in your password DB.
            if(err) {
                return this.errorHandler(res, err, StatusCodes.INTERNAL_SERVER_ERROR)
            }
            req.body.password = hash;
            delete req.body.confirmPassword;
            next()
        });
    }

    public login = async (req: Request, res: Response) => {
        const {userName, password} = req.body;
        logger.info(userName)
        logger.info(password)
        try {
            const user = await this.model.findOne({userName});
            const match = await bcrypt.compare(password, user?.password as string)
            if(!match || !user) {
                return res.status(StatusCodes.UNAUTHORIZED).json(
                    http_formatter(new Error(AUTH_ERROR), AUTH_ERROR, false)
                );
            }
            logger.info(user)

            const payload = {uid: user?._id};
            const token = jwt.sign(payload, process.env.AUTH_SECRET as string, { expiresIn: 60 * 60 });
            logger.debug(token)
            return res.status(StatusCodes.OK).json(
                
                http_formatter({token})
            );
        } catch (error) {
            logger.error(error)
            return this.errorHandler(res, error, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

export const _loginController = new LoginController(Login);