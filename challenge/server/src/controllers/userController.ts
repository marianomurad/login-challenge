import { validationResult } from 'express-validator';
import { getUser, getUserInfo, saveUser } from '../repositories/userRepository';
import { IRepositoryResponse } from '../models/interfaces/IRepositoryError';
import { Error } from 'mongoose';
import {IClientUser} from "../models/interfaces/IUserClient";


export const loginController = async (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const cb = (err: Error, token: string) => {
        if (err) throw err;
        res.status(200).json({
            token
        });
    }

    const errorResult: IRepositoryResponse | undefined = await getUser(req.body, cb);

    if(errorResult?.message) {
        res.status(errorResult?.statusCode).json({
            message: errorResult?.message
        });
    }
}

export const signUpController = async (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const cb = (err: Error, token: string) => {
        if (err) throw err;
        res.status(200).json({
            token
        });
    }

    const errorResult: IRepositoryResponse | undefined = await saveUser(req.body, cb);

    if(errorResult?.message) {
        res.status(errorResult?.statusCode).json({
            message: errorResult?.message
        });
    }
}

export const getUserController = async (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const userId = req.user.id;

    const userResponse: IRepositoryResponse | undefined = await getUserInfo(userId);

    if(userResponse?.message && userResponse.statusCode === 404) {
        res.status(userResponse?.statusCode).json({
            message: userResponse?.message
        });
    } else {

        res.status(userResponse?.statusCode).json({
            userInfo: {
                id: userResponse?.userInfo?.id,
                name: userResponse?.userInfo?.name,
                surname: userResponse?.userInfo?.surname,
                email: userResponse?.userInfo?.email,
                age: userResponse?.userInfo?.age,
                role: userResponse?.userInfo?.role,
                avatar: userResponse?.userInfo?.avatar
            }
        });
    }
}
