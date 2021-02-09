import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

export const useUserStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10),
            width: 475,
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        avatar: {
            backgroundColor: red[500],
        },
    })
);
