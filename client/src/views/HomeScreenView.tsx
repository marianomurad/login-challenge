import React, {useContext, useEffect, useState} from 'react';
import { userService } from "../services/userService";
import { UserContext } from "../contexts/UserContext";
import { useUserStyles } from "../hooks/useUserStyles";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader, Collapse, List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import {UserRoles} from "../types/UserTypes";


const HomeScreenView = () => {
    const { state, userDispatch } = useContext(UserContext);
    const classes = useUserStyles();
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const getUserInfo = async () => {
        const cb = (res: any) => {
            if(res.statusCode !== 200) {
                userDispatch({
                    type: 'userInteractionFailed',
                    payload: res?.message
                });
            }
            if (res?.userInfo) {
                userDispatch({
                    type: 'userInfoRetrieved',
                    payload: res?.userInfo

                });
            }
        }
        const errCb = (err: Error) => {
            userDispatch({
                type: 'userInteractionFailed',
                payload: err?.message
            });
        };

        await userService.getUserInfo(cb, errCb, state.token);
    }

    useEffect(() => {
            getUserInfo();
        },
        [])
    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} src={state.userInfo.avatar}/>
                    }
                    title={state.userInfo.name}
                    subheader={state.userInfo.surname}
                />
                <CardContent>
                    <Typography variant="body2" component="p">
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText primary="Email" secondary={state.userInfo.email} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Age" secondary={state.userInfo.age} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Role" secondary={UserRoles[state.userInfo.role]} />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button onClick={handleClick}>
                            <ListItemText primary={open ? <p>Show Less</p> : <p>Show More</p>} />
                        </ListItem>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default HomeScreenView;
