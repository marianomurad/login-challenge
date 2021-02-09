import React, { useReducer } from 'react';
import LandingView from "./views/LandingView";
import { initialUserState, UserContext } from './contexts/UserContext';
import { userReducer } from './reducers/UserReducer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import HomeScreenView from "./views/HomeScreenView";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";


function App() {
    const [state, userDispatch] = useReducer(userReducer, initialUserState)
    return (
        <Router>
            <UserContext.Provider value={{state, userDispatch}}>
                <div className="App">
                    <Switch>
                        <Route exact path='/' component={LandingView}/>
                        <Route exact path='/login' component={LoginComponent}/>
                        <Route exact path='/signup' component={SignUpComponent}/>

                        { //AuthedRoutes
                         state.isAuth
                             ? <Route exact path='/home'>
                                 <HomeScreenView/>
                               </Route>
                             : <Redirect from='/home' to='/'/>
                        }
                    </Switch>
                </div>
           </UserContext.Provider>
        </Router>
    );
}

export default App;
