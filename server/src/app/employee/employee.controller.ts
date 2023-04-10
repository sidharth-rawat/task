import { BaseController } from "../../common/base.controller";
import { IEmployee,Empolyee } from "./employee.schema";

class EmployeeController extends BaseController<IEmployee>{

}
export const _employe = new EmployeeController(Empolyee);