import React, {useContext, useEffect} from 'react';
import {UserContext} from "../contexts/UserContext";
import { Redirect } from "react-router-dom";
import SignInComponent from "../components/SignInComponent";

const LandingView = () => {
    const {state, userDispatch} = useContext(UserContext);

    useEffect(
        () => {
            if(state.token !== '') { //replace this with something less horrible || hackable
                userDispatch({
                    type: 'authenticateUser',
                    payload: true
                });
            }
        }
        ,[state.token]);
    return (
        <>
            { state.isAuth ?
                <Redirect to={{pathname: '/home'}}/>
                : <SignInComponent />
            }
        </>
    );
}

export default LandingView;
