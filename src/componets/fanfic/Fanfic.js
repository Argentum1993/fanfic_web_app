import React, {useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router-dom"
import { Redirect } from 'react-router-dom'
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
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
    const history = useHistory()

    useEffect(() => {
        ApiService.getNameChapters(props.fanfic.id).then(r => {
            setChapters(r.data)
        })
    }, [])

    const onChapter = (chapterNum) => {
        history.push('/chapter', {chapterNum: chapterNum, fanficId: props.fanfic.id})
    }

    return(
        <Container>
            <CssBaseline />
            <HeaderFanfic fanfic={props.fanfic}/>
            <DescriptionFanfic fanfic={props.fanfic}/>
            {chapters &&
            <ChaptersFanfic
                className={classes.chaptersFanfic}
                chapters={chapters}
                clickHandler={onChapter}
            />}
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