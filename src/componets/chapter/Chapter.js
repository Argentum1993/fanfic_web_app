import React, {useEffect, useState} from 'react'
import {Redirect, useHistory, useLocation} from "react-router-dom"
import Box from "@material-ui/core/Box"
import {makeStyles} from "@material-ui/core/styles"

import ApiService from '../../service/api.service'
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import {CardMedia, CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(2),
        maxWidth: 800
    },
    container: {
        marginTop: theme.spacing(2)
    },
    img: {
        maxWidth: 130,
        height: 180,
        marginBottom: theme.spacing(2)
    }
}));

const ChapterBody = ({chapterNum, fanficId}) => {
    const classes = useStyles()
    const [chapter, setChapter] = useState()
    const nextChapter = chapterNum + 1
    const prevChapter = chapterNum - 1
    const history = useHistory()

    useEffect(() => {
        ApiService.getChapter(fanficId, chapterNum = chapterNum)
            .then(r => {
                const str = r.data.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")

                //TODO del сrutch
                setChapter(JSON.parse(str))
            })
    }, [chapterNum, fanficId])

    const onPrev = () => {
        history.push('/chapter', {chapterNum: prevChapter, fanficId: fanficId})
    }

    const onNext = () => {
        history.push('/chapter', {chapterNum: nextChapter, fanficId: fanficId})
    }

    return(
        <>
            {chapter ?
                <Container>
                    <Grid className={classes.container} container justify="center">
                        <Grid item>
                            <Typography align="center" variant="h3"  gutterBottom>
                                {chapter.name}
                            </Typography>
                            {chapter.img &&
                            <CardMedia
                                className={classes.img}
                                component="img"
                                alt={chapter.name + "-img"}
                                image={chapter.img}
                                title={chapter.name}
                            />
                            }
                        </Grid>
                        <Grid item>
                            <Box borderTop={1}>
                                <Typography className={classes.text} align="left" gutterBottom>
                                    {chapter.text}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    {prevChapter > 0 &&
                    <Button onClick={onPrev}>
                        <ArrowBackIosIcon/>Prev
                    </Button>
                    }
                    <Button onClick={onNext}>
                        Next<ArrowForwardIosIcon/>
                    </Button>
                </Container>
                :
                    <CircularProgress />
            }
        </>
    )
}


const Chapter = () => {
    const location = useLocation()
    const { chapterNum, fanficId } = location.state

    return (
        <>
            {fanficId ?
                <ChapterBody fanficId={fanficId} chapterNum={chapterNum ? chapterNum : 1}/>
                :
                <Redirect to="/" />
            }
        </>
    )
}

export default Chapter