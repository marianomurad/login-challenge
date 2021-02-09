import {IClientUser} from "./IUserClient";

export interface IRepositoryResponse {
    statusCode: number,
    message?: string | undefined,
    userInfo?: IClientUser | undefined
}
