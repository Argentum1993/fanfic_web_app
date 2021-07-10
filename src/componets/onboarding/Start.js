import React, {useEffect, useState} from 'react';
import {Checkbox, CircularProgress, FormControlLabel, GridList, GridListTile, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import CheckBoxPaper from "./CheckBoxPaper";

import ApiService from '../../service/api.service'
import AuthService from '../../service/auth.service'
import Button from "@material-ui/core/Button";
import StatusMassage from "./StatusMassage";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        marginBottom: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    paper2: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainPaper: {
        justifySelf: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        margin: theme.spacing(2),
    }
}));

let favorite = []

const Start = () => {
    const [fandoms, setFandoms] = useState()
    const [openMsg, setOpenMsg] = useState(false)
    const [msgProps, setMsgProps] = useState({
        open: false,
        title: '',
        msg: ''
    })

    const classes = useStyles()
    const user = AuthService.getCurrentUser()

    const history = useHistory()

    useEffect(() => {
        ApiService.getFandoms()
            .then( fandoms => setFandoms(fandoms.data) )
            //TODO handle error
            .catch((e) => history.push('/'))
    },[])

    const addFavorite = (idFavorite) => {
        favorite = [...favorite, idFavorite]
    }

    const removeFavorite = (idFavorite) => {
        const index = favorite.indexOf(idFavorite)
        if (index >= 0) {
            const part1 = favorite.slice(0, index)
            const part2 = favorite.slice(index + 1, favorite.length)
            favorite = [...part1, ...part2]
        }
    }

    const saveFavorite = () => {
        if(favorite.length < 1){
            setMsgProps(prevState => ({
                ...prevState,
                open: true,
                title: "Too few favorites selected",
                msg: "You must choose 1 or more chosen",
            }))
        } else {
            ApiService.saveUserFandoms(user.id, favorite.map(f => parseInt(f)))
                .then(r => history.push('/'))
                .catch((e) => {
                    let msg = "Can't put favorites. Place try later."
                    if (e.response && e.response.data) {
                        msg = e.response.data
                    }
                    setMsgProps(prevState => ({
                        ...prevState,
                        open: true,
                        title: "Error",
                        msg: msg
                    }))
                })
        }
    }

    const closeMsg = () => {
        setMsgProps(prevState => ({
            ...prevState,
            open: false
        }))
    }

    return (
        <Container component="div" maxWidth={ fandoms ? "md" : "xs"}>
            <CssBaseline />
            <StatusMassage values={msgProps} handleClose={closeMsg} key="modal"/>
            <Grid container spacing={0} justify="center" alignItems="center"  style={{ minHeight: '90vh'}}>
                { fandoms ?
                    <Box>
                        <Paper className={classes.paper} >
                            <p>Hi, {user.firstName}</p>
                            <p>Choose up to fandom that you enjoy reading. <br/> This will help us better recommend stories you'll love.</p>
                            <Grid container spacing={2}>
                                {
                                    fandoms.map((fandom, i) =>
                                        <CheckBoxPaper
                                            className={classes.paper}
                                            addFavoriteHandler={addFavorite}
                                            removeFavoriteHandler={removeFavorite}
                                            name={fandom.name}
                                            id={fandom.id}
                                            key={fandom.name + i}
                                        />
                                    )
                                }
                            </Grid>
                        </Paper>
                        <Button className={classes.submitButton} variant="contained" onClick={saveFavorite}>Save</Button>
                    </Box>
                    : <CircularProgress />
                }
            </Grid>
        </Container>
    );
};

export default Start;