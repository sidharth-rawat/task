 // ! let's define CRUD methods.

import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Document, Model, ObjectId } from "mongoose";
import { http_formatter } from "../util";
import { logger } from "./logger";

// we have created a generic base controller.
export class BaseController<T> {
    
    private DEFAULT_ERROR_MSG: string = 'Something went wrong';
    // this is nothing but collection.
    constructor(public model: Model<T>) {
    }
    
    public errorHandler(res: Response, error: any, statusCode: StatusCodes = StatusCodes.BAD_REQUEST){
        logger.debug('[ERROR]', error);
        return res.status(statusCode).json(http_formatter(error, this.DEFAULT_ERROR_MSG, false));
    }

    public async find(res: Response, query: any){
        try {
            const queriedRes = await this.model.find(query);
            return res.status(StatusCodes.OK).json(http_formatter(queriedRes));
        } catch (error) {
            this.errorHandler(res, error);
        }
    }

    public async findOne(res: Response, query: any){
        try {
            const queriedRes = await this.model.findOne(query);
            return res.status(StatusCodes.OK).json(http_formatter(queriedRes));
        } catch (error) {
            this.errorHandler(res, error)
        }
    }

    public async create(res: Response, document: Document<T>){
        try {
            const createdDoc = await this.model.create(document);
            logger.debug(createdDoc);
            return res.status(StatusCodes.CREATED).json(http_formatter(createdDoc))
        } catch (error) {
            this.errorHandler(res, error)
        }
    }

    public async update(res: Response, id: ObjectId | string, document: any) {
        try {
            const updatedDocument = await this.model.findByIdAndUpdate(id, document);
            return res.status(StatusCodes.OK).json(http_formatter(updatedDocument))
        } catch (error) {
            this.errorHandler(res, error)
        }
    }

    public async delete(res: Response, id: ObjectId | string){
        try {
            // ! we should 'NEVER' delete an entry from the DB!
            const updatedDocument = await this.model.findByIdAndUpdate(id, {isDeleted: true});
            return res.status(StatusCodes.OK).json(http_formatter(updatedDocument))
        } catch (error) {
            this.errorHandler(res, error)
        }
    }
}