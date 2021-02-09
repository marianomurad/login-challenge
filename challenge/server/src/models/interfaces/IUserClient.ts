import {Document} from 'mongoose';
import {role} from '../enums/role.enum'

export interface IClientUser extends Document {
    id: string;
    avatar: string;
    age: number;
    email: string;
    name: string;
    role: role;
    surname: string;
}
