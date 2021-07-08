import React, {useState} from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FanficItem from "./FanficItem";
import FanficDialog from "./FanficDialog";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(1)
    }
}));

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 15
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const FanficCarousel = (props) => {
    const classes = useStyles()
    const [dialogProps, setDialogProps] = useState({open: false, fanfic: null})

    const openItemDialogHandler = (fanfic) => {
        setDialogProps( {open: true, fanfic: fanfic})
    }

    const closeItemDialogHandler = () => {
        setDialogProps(prevState => ({...prevState, open: false}))
    }

    return (
        <Grid className={classes.container} item>
            <FanficDialog
                open={dialogProps.open}
                fanfic={dialogProps.fanfic}
                closeHandler={closeItemDialogHandler}
            />
            <Typography align="left" variant="h4" gutterBottom>
                { props.title }
            </Typography>
            <Paper className={classes.paper}>
                <Carousel responsive={responsive}>
                    {props.items && props.items.map( (item, i) =>
                        <FanficItem
                            key={item.id + i}
                            fanfic={item}
                            clickHandler={openItemDialogHandler}
                        />)}
                </Carousel>
            </Paper>
        </Grid>
    );
};

export default FanficCarousel;