import {IClientUser} from './IUserClient';

export interface IServerUser extends IClientUser {
    password: string;
}
