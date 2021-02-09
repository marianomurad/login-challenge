import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";
import {useUserStyles} from "../hooks/useUserStyles";
import { useHistory } from 'react-router-dom';

const SignInComponent = () => {
    let history = useHistory();
    const classes = useUserStyles();
    const handleLoginRedirect = () => {
        history.push('/login');
    }
    const handleSignUpRedirect = () => {
        history.push('/signup');
    }

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Challenge App" />
                <CardContent>
                    <div>
                        <p>Log in, or Sign Up to the Challenge App</p>
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.loginBtn}
                        onClick={handleLoginRedirect}>
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.loginBtn}
                        onClick={handleSignUpRedirect}>
                        Sign Up
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default SignInComponent;
