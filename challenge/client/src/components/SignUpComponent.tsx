import React, {ChangeEvent, KeyboardEvent, useContext} from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, MenuItem, TextField} from "@material-ui/core";
import {useUserStyles} from "../hooks/useUserStyles";
import {UserContext} from "../contexts/UserContext";
import { useHistory } from 'react-router-dom'
import {userService} from "../services/userService";

const SignUpComponent = () => {
    let history = useHistory();
    const classes = useUserStyles();
    const { state, userDispatch } = useContext(UserContext);
    const inputFields: Array<{id: string, type: string, placeholder: string, label: string, options?: Array<{label: string, value: string}>}> = [
        {
            id: "name",
            type: "text",
            placeholder: 'Name',
            label: 'Name',
        },
        {
            id: "surname",
            type: "text",
            placeholder: 'Surname',
            label: 'Surname',
        },
        {
            id: "email",
            type: "email",
            placeholder: 'Email',
            label: 'Email',
        },
        {
            id: "password",
            type: "password",
            placeholder: 'Password',
            label: 'Password',
        },
        {
            id: "age",
            type: "number",
            placeholder: 'Age',
            label: 'Age',
        },
        {
            id: "avatar",
            type: "text",
            placeholder: 'Avatar',
            label: 'Avatar',
        },
        {
            id: "role",
            type: "select",
            placeholder: 'Role',
            label: 'Select Role',
            options: [{value: 'Admin', label: 'Admin'}, {value: 'User', label: 'User'}]
        },
        {
            id: "name",
            type: "text",
            placeholder: 'Name',
            label: 'Name',
        },
    ]

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target);
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleSignUp();
        }
    };

    const handleLogin = () => {
        history.push('/login');
    }
    const handleSignUp = async () => {
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
            }
        }
        const errCb = (err: Error) => {
            userDispatch({
                type: 'userInteractionFailed',
                payload: err?.message
            });
        };
        await userService.signUp({} ,cb, errCb);
    }
    // @ts-ignore
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Signup to the Challenge App" />
                <CardContent>
                    <div>
                        { inputFields.map(field =>
                        <TextField
                            error={state.isError}
                            fullWidth
                            id={field.id}
                            type={field.type}
                            label={field.label}
                            placeholder={field.placeholder}
                            margin="normal"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFieldChange(event)}
                            onKeyPress={handleKeyPress}
                        >
                            {
                                field.options
                                && field?.options.map(
                                    ({value, label}: any) =>
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                )
                            }

                        </TextField>)
                        }

                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.loginBtn}
                        onClick={handleLogin}>
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
};

export default SignUpComponent;
