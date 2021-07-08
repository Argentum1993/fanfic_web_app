import React from 'react'
import {
    CardMedia, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    IconButton,
    useMediaQuery,
    useTheme
} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CloseIcon from '@material-ui/icons/Close'
import {makeStyles} from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import {Rating} from "@material-ui/lab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialog: {
      padding: theme.spacing(1)
    },
    titleFanfic: {
        maxWidth: 200,
        marginBottom: theme.spacing(1)
    },
    descriptionFanfic: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 3,
        wordBreak: "break-all",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginBottom: theme.spacing(2)
    },
    fandomFanfic: {
      marginLeft:  theme.spacing(2),
    },
    containerFandomRating: {
        justifyContent: "center",
    },
    content: {
        justifyContent: "center",
        justifyItems: "center"
    },
    readButton: {
        margin: theme.spacing(2),
        width: 50,
    },
    img: {
        maxWidth: 267,
        height: 418,
    }
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

const FanficDialog = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const showText = useMediaQuery(theme.breakpoints.up('sm'))
    const history = useHistory()

    const handleClose = () => {
        props.closeHandler()
    }

    const onDetail = () => {
        history.push('/fanfic', { fanfic: props.fanfic })
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            {props.fanfic &&
            <Grid className={classes.dialog} container direction={showText ? "row" : "column"} alignItems="center">
                <Grid item xs>
                    <CardMedia
                        className={classes.img}
                        component="img"
                        alt="Contemplative Reptile"
                        image={props.fanfic.img}
                        title="Contemplative Reptile"
                    />
                </Grid>
                <Grid item xs>
                    <DialogContent>
                            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                            <Typography className={classes.titleFanfic} noWrap={true} variant="h5">
                                {props.fanfic.title}
                            </Typography>
                            {console.log(props.fanfic.rating)}
                            <Grid container direction="row" alignItems="center" >
                                <Rating
                                    name="customized-icons"
                                    value={props.fanfic.rating}
                                    getLabelText={(value) => value > 0 ? customIcons[value].label : "" }
                                    IconContainerComponent={IconContainer}
                                    readOnly
                                />
                                <Chip
                                    className={classes.fandomFanfic}
                                    label={props.fanfic.fandom.name}
                                    variant="outlined"
                                />
                            </Grid>
                            <Box
                                display="flex"
                                justifyContent="center"
                                justifyItems="center">
                            <Button className={classes.readButton}  variant="contained" color="secondary">
                                Read
                            </Button>
                            </Box>
                            <Typography className={classes.descriptionFanfic} component="div" gutterBottom>
                                {props.fanfic.description}
                            </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={onDetail} color="primary">
                            More details <ArrowForwardIosIcon/>
                        </Button>
                    </DialogActions>
                </Grid>
            </Grid>
            }
        </Dialog>
    )
}

export default FanficDialog;