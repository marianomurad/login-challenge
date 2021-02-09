import User from '../models/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IRepositoryResponse } from '../models/interfaces/IRepositoryError';
import { IServerUser } from '../models/interfaces/IServerUser';

export const saveUser = async (
    {
        id,
        avatar,
        age,
        email,
        name,
        role,
        surname,
        password
    }: IServerUser,
    cb: any): Promise<IRepositoryResponse | undefined>  => {
    try {
        let user = await User.findOne({ email });
        if (user) {
            return {
                statusCode: 400,
                message: 'User Already Exists'
            };
        }

        user = new User({
            id,
            avatar,
            age,
            email,
            name,
            role,
            surname,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        };

        const result = jwt.sign(
            payload,
            'magicPassword', //replace with real secret
            { expiresIn: 10000 },
            cb
        );
     } catch (err) {
        return {
            message: err.message,
            statusCode: 500
        }
    }
}

export const getUser = async ({email, password}: IServerUser, cb: any): Promise<IRepositoryResponse | undefined>  => {

    try {
        let user = await User.findOne({
            email
        });
        if (!user)
            return {
                statusCode: 400,
                message: 'User Not Exist'
            };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return {
                statusCode: 400,
                message: 'Incorrect Password!'
            };

        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(
            payload,
            'magicPassword',
            {
                expiresIn: 3600
            },
            cb
        );
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            message: 'Internal Server Error'
        };
    }
}

export const getUserInfo = async (userId: string): Promise<IRepositoryResponse | undefined>  => {

    let user = await User.findOne({
        _id: userId
    });
    if (!user)
        return {
            statusCode: 404,
            message: 'User Not Found'
        };

    return {
        statusCode: 200,
        userInfo: user
    };
}

