import { Document, model,Schema } from 'mongoose';
import { z} from 'zod';

const employeeValidator =z.object({
    firstName: z.string().min(2).max(50).trim(),
    lastName: z.string().optional(),
    salary: z.number().min(10000).max(1000000),
    designation: z.string().trim()
})


type  _employe = z.infer<typeof employeeValidator>
export interface IEmployee extends Document,_employe {}
const EmployeeSchema = new Schema<IEmployee>({
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
    salary:{
        type:Number,
        required: true,
        min:10000,
        max:1000000,
    },
    designation:{
        type: String,
        required: true,
        trim: true,
    }
},{
    versionKey:false,
    timestamps:true
})

export const Empolyee = model<IEmployee>("Empolyee",EmployeeSchema)