import { Document, model, Schema } from 'mongoose';
import {z} from 'zod';
import { SignupValidator } from './login.validator';
import * as bcrypt from 'bcrypt';

type _Login = z.infer<typeof SignupValidator>

export interface ILogin extends Document, _Login {}

const LoginSchema = new Schema<ILogin>({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: 2,
        maxlength: 50,
    },
    lastName:{
        type: String,
        required: false,
        lowercase: true,
        trim: true,
        default: "",
    },
    userName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

// this is advance DB helper functions. 
// please use them wisely.
LoginSchema.pre("save", function(next){
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
    })
})

LoginSchema.methods.comparePassword = function(candidatePassword: string, cb: Function) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
        cb(null, isMatch);
    });
};

export const Login = model<ILogin>("Login", LoginSchema);

// nosql is literraly schema-less!!
// const tempSchema = new Schema({})
// export const Temp = model<any>("Any", tempSchema);
