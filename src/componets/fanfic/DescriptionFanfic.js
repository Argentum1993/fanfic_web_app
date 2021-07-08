import React, {useEffect, useState} from 'react'
import {Chip, Paper} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Avatar from "@material-ui/core/Avatar"
import { deepOrange } from '@material-ui/core/colors'
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ChaptersFanfic from "./ChaptersFanfic";

const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: 200,
        paddingTop: theme.spacing(2)
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        height: 24,
        width: 24,
        fontSize: 10,
        marginRight: theme.spacing(1)
    },
    authorBar: {
        marginBottom: theme.spacing(2)
    },
    tag: {
        margin: theme.spacing(0.2)
    }
}));

const AuthorBar = (props) => {
    const classes = useStyles()

    return(
        <Box className={classes.authorBar} display="flex">
            <Avatar className={classes.avatar}>{props.author.substring(0,1).toUpperCase()}</Avatar>
            <Box>{props.author}</Box>
        </Box>
    )
}

const TagsBar = (props) => {
    const classes = useStyles()
    const { tags } = props

    return(
        <Box
            alignContent="left"
            textAlign="left"
        >
            {tags && tags.map(tag => {
                return(
                    <Chip className={classes.tag} label={tag.name}/>
                )
            })}
        </Box>
    )
}

const DescriptionFanfic = (props) => {
    const classes = useStyles()


    return (
        <Box>
            <Paper className={classes.paper} >
                <Container>
                    <AuthorBar author={props.fanfic.author}/>
                    <Typography align="left" gutterBottom>
                        {props.fanfic.description}
                    </Typography>
                    <TagsBar tags={props.fanfic.tags}/>
                </Container>
            </Paper>
        </Box>
    );
};

export default DescriptionFanfic;