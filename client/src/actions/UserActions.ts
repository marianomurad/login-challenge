import { UserInfo } from "../types/UserTypes";

type successResponse = {
    token: string,
    helperText: string
}


export type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'userInteractionSuccess', payload: successResponse }
    | { type: 'userInteractionFailed', payload: string }
    | { type: 'setIsError', payload: boolean }
    | { type: 'userInfoRetrieved', payload: UserInfo }
    | { type: 'authenticateUser', payload: boolean };

