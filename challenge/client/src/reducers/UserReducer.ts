import {State} from "../types/UserTypes";
import {Action} from "../actions/UserActions";

export const userReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                email: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'userInteractionSuccess':
            return {
                ...state,
                token: action.payload.token,
                helperText: action.payload.helperText,
                isError: false
            };
        case 'userInteractionFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'userInfoRetrieved':
            return {
              ...state,
              userInfo: action.payload
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
        case 'authenticateUser':
            return {
                ...state,
                isAuth: action.payload
            };
    }
}
