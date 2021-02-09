import { createContext, Dispatch } from "react";
import { State, UserInfo } from "../types/UserTypes";
import { Action } from "../actions/UserActions";


const emptyClientUser: UserInfo =  {
    id: '',
    avatar: '',
    age: 0,
    email: '',
    name: '',
    role: 0,
    surname: ''
}

export const initialUserState: State =
    {
            isAuth: false,
            token: '',
            email: '',
            password: '',
            isButtonDisabled: true,
            helperText: '',
            isError: false,
            userInfo: emptyClientUser
    };

type UserContext = {
        state: State,
        userDispatch: Dispatch<Action>
}

export const UserContext = createContext<UserContext>({state: initialUserState, userDispatch: () => {}});
