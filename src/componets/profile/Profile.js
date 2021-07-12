import React from 'react';
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import InPlaceEditingField from "./InPlaceEditingField";
import ApiService from "../../service/api.service"
import AuthService from "../../service/auth.service"
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PaginationFanfics from "./PaginationFanfics";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    info: {
      margin: theme.spacing(2),
    },
    fanficContainer:{
    },
    avatar:{
        minWidth: 150,
        minHeight: 150,
        maxWidth: 150,
        maxHeight:150,
        margin: theme.spacing(2),
        [theme.breakpoints.down(300)]: {
            minWidth: 0,
            minHeight: 0,
        },
    },
    infoPaper:{
        minWidth: 300,
        minHeight: 300,
        [theme.breakpoints.down(300)]: {
            minWidth: 0,
            minHeight: 0,
        },
    },
    fanficsContainer: {
        minWidth: 300,
        [theme.breakpoints.down(300)]: {
            minWidth : 0
        },
    },
    fanfics: {
        margin: theme.spacing(2),
    }
}));

const Profile = () => {
    const classes = useStyles()

    const user = AuthService.getCurrentUser()

    const saveUserInfoChanges = (data) => {
        //TODO handle Error
        ApiService.updateUser(data).then()
    }

    return (
        <Container className={classes.container}>
            <Grid container justify="center" direction="row">
                <Grid item>
                    <Paper className={classes.info}>
                        <Box
                            className={classes.infoPaper}
                            display="flex"
                            alignContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <Avatar className={classes.avatar}></Avatar>
                            <InPlaceEditingField
                                defaultValue={user.firstName}
                                label="First Name"
                                saveChangeHandler={(value) => saveUserInfoChanges({firstName: value})}
                            />
                            <InPlaceEditingField
                                defaultValue={user.lastName}
                                label="Last Name"
                                saveChangeHandler={(value) => saveUserInfoChanges({lastName: value})}
                            />
                            <InPlaceEditingField
                                defaultValue={user.email}
                                label="E-mail"
                                saveChangeHandler={(value) => saveUserInfoChanges({email: value})}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.fanfics}>
                        <Box
                            className={classes.fanficsContainer}
                            display="flex"
                            alignContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            Fanfics
                            <PaginationFanfics/>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;