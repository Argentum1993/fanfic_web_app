import React, {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom"
import { Redirect } from 'react-router-dom'
import Container from "@material-ui/core/Container";
import {CardMedia, Chip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HeaderFanfic from "./HeaderFanfic";
import DescriptionFanfic from "./DescriptionFanfic";
import CssBaseline from "@material-ui/core/CssBaseline";
import ChaptersFanfic from "./ChaptersFanfic";

import ApiService from '../../service/api.service'

const useStyles = makeStyles((theme) => ({
    chaptersFanfic: {
        marginTop: theme.spacing(2),
        maxWidth: 600,
        marginBottom: theme.spacing(2)
    },
}));

const FanficBody = (props) => {
    const classes = useStyles()
    const [chapters, setChapters] = useState()

    useEffect(() => {
        ApiService.getNameChapters(props.fanfic.id).then(r => {
            setChapters(r.data)
        })
    }, [])

    return(
        <Container>
            <CssBaseline />
            <HeaderFanfic fanfic={props.fanfic}/>
            <DescriptionFanfic fanfic={props.fanfic}/>
            {chapters && <ChaptersFanfic className={classes.chaptersFanfic} chapters={chapters}/>}
        </Container>
    )
}


const Fanfic = () => {
    const location = useLocation()
    const fanfic = location.state ? location.state.fanfic : null

    return (
        <>
            {fanfic ?
                <FanficBody fanfic={fanfic}/>
            :
                <Redirect to="/" />
            }
        </>
    )
}

export default Fanfic;