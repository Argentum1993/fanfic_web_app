import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) =>({
    root: {
        maxWidth: 200,
        margin: theme.spacing(1)
    },
}));

const FanficItem = (props) => {
    const classes = useStyles();

    const clickHandler = () => {
        props.clickHandler(props.fanfic)
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={clickHandler}>
                <CardMedia
                    component="img"
                    alt= {props.fanfic.title + "-img"}
                    height="280"
                    image={props.fanfic.img}
                    title={props.fanfic.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.fanfic.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default FanficItem;