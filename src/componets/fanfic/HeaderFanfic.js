import React from 'react';
import Grid from "@material-ui/core/Grid";
import {CardMedia, Chip} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    img: {
        maxWidth: 180,
        height: 280,
    },
    container: {
        margin: theme.spacing(2)
    },
    info: {
        marginLeft: theme.spacing(2),
        maxWidth: 180
    },
    infoTitle: {
        fontWeight: 800,
        fontSize: 20,
        marginBottom: theme.spacing(1)
    },
    readButton: {
        margin:  theme.spacing(2)
    }
}));

const HeaderFanfic = (props) => {
    const classes = useStyles()

    return (
        <Grid className={classes.container} container justify="center">
            <Grid item>
                <CardMedia
                    className={classes.img}
                    component="img"
                    alt={props.fanfic.title + "-img"}
                    image={props.fanfic.img}
                    title={props.fanfic.title}
                />
            </Grid>
            <Grid className={classes.info}  conteiner>
                <Box
                    className={classes.infoTitle}
                    alignContent="left"
                    textAlign="left"
                >
                    {props.fanfic.title}
                </Box>
                <Box
                    display="flex"
                    alignContent="left">
                    <Chip
                        label={props.fanfic.fandom.name}
                        variant="outlined"
                    />
                </Box>
                <Box
                    className={classes.readButton}
                    display="flex"
                    alignContent="center"
                >
                    <Button  variant="contained" color="secondary">
                        Read
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default HeaderFanfic;