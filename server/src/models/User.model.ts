import mongoose from 'mongoose';
import {IServerUser} from './interfaces/IServerUser';


const UserSchema = new mongoose.Schema<IServerUser>({
        id: {
            type:String,
            required: true
        },
        avatar: {
            type:String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        email: {
            type:String,
            required: true
        },
        name: {
            type:String,
            required: true
        },
        role: {
            type: String,
            enum: [0,1],
            required: true
        },
        surname: {
            type:String,
            required: true
        },
        password: {
            type:String,
            required: true
        }
});

UserSchema.methods.getGender = function({ role: role }: IServerUser) {
    return role > 0 ? 'User' : 'Admin';
}

export default mongoose.model<IServerUser>('User', UserSchema)
