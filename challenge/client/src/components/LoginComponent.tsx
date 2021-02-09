import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@material-ui/core";
import { useUserStyles } from "../hooks/useUserStyles";
import { userService } from "../services/userService";
import { useHistory } from "react-router-dom";

const LoginComponent = () => {
    const classes = useUserStyles();
    const {state, userDispatch} = useContext(UserContext);
    let history = useHistory()
    useEffect(() => {
        if (state.email.trim() && state.password.trim()) {
            userDispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        } else {
            userDispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        }
    }, [state.email, state.password]);

    const handleLogin = async () => {
        const cb = (res: any) => {
            if(res.statusCode !== 200) {
                userDispatch({
                    type: 'userInteractionFailed',
                    payload: res?.message
                });
            }
            if (res?.token) {
                userDispatch({
                    type: 'userInteractionSuccess',
                    payload: {
                        token: res.token,
                        helperText: 'Success!'
                    }
                });
                history.push('/home');
            }
        }
        const errCb = (err: Error) => {
            userDispatch({
                type: 'userInteractionFailed',
                payload: err?.message
            });
        };
        await userService.logIn({email: state.email, password: state.password}, cb, errCb);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleUsernameChange: ChangeEventHandler<HTMLInputElement> =
        (event) => {
            userDispatch({
                type: 'setUsername',
                payload: event.target.value
            });
        };

    const handlePasswordChange: ChangeEventHandler<HTMLInputElement> =
        (event) => {
            userDispatch({
                type: 'setPassword',
                payload: event.target.value
            });
        }

    const handleSignUp = (event: any) => {
        history.push('/signup');
    }

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Login to the Challenge App" />
                <CardContent>
                    <div>
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="username"
                            type="email"
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleUsernameChange(event)}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            helperText={state.helperText}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handlePasswordChange(event)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.loginBtn}
                        onClick={handleLogin}
                        disabled={state.isButtonDisabled}>
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.loginBtn}
                        onClick={handleSignUp}>
                        Sign Up
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default LoginComponent;
