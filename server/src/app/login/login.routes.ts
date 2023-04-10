import { Request, Response, Router } from "express";
import { _loginController } from "./login.controller";
import { loginValidatorMiddleware, signupValidatorMiddlware } from "./login.validator";

export const loginRouter = Router();

loginRouter.post('/signup', 
    signupValidatorMiddlware, 
    (req: Request, res: Response ) => _loginController.create(res, req.body)
);

loginRouter.post('/login', loginValidatorMiddleware, _loginController.login);