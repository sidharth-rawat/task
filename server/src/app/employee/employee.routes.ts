import {Request,Response, Router } from "express";
import {_employe} from "./employee.controller";

export const employeeRoute = Router();

employeeRoute.get('/',(req:Request,res:Response)=>_employe.find(res,{}))
.get('/:id',(req:Request,res:Response)=>_employe.findOne(res,{_id:req.params.id}))
.post('/',(req,res,next)=>{
    console.log(req.body);
    next();    
},(req:Request,res:Response)=>_employe.create(res,req.body))
.put('/:id',(req:Request,res:Response)=>_employe.update(res,req.params.id,req.body))
.delete('/:id',(req:Request,res:Response)=>_employe.delete(res,req.params.id))