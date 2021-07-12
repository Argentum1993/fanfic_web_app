import {Card, CardActions, CardContent, CardHeader, CardMedia, Chip, makeStyles} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {useHistory} from "react-router-dom";
import Box from "@material-ui/core/Box";
import FanficRating from "../FanficRating/FanficRating";


const useStyles = makeStyles((theme) =>({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


const FanficCard = ({fanfic, ...other}) => {
    const classes = useStyles()
    const history = useHistory()

    const onFanfic = () => {
        history.push('/fanfic', {fanfic: fanfic})
    }

    return (
        <Card {...other} onClick={onFanfic}>
            <CardHeader
                title={fanfic.title}
            />
            <CardMedia
                className={classes.media}
                image={fanfic.img}
                title={fanfic.title}
            />
            <CardContent>
                <Box display="flex" flexDirection="row" alignContent="center">
                    <FanficRating rating={fanfic.rating} />
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                    {fanfic.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default FanficCard