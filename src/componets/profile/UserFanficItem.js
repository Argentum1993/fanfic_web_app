import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {CardMedia, Chip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FanficRating from "../FanficRating/FanficRating";
import TagsBar from "../tags/TagsBar";

const useStyles = makeStyles((theme) => ({
    img: {
        maxWidth: 96,
        height: 150,
    },
    infoFanfic: {
        margin: theme.spacing(1)
    },
    rating: {
        maxHeight: 10,
        fontSize:2
    },
    fandom: {
        marginRight: theme.spacing(2)
    },
    descriptionFanfic: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginBottom: theme.spacing(2)
    }
}));

const UserFanficItem = ({fanfic}) => {
    const classes = useStyles()

    return (
        <Container>
            <Grid container direction="row">
                <Grid item>
                    <CardMedia
                        component="img"
                        className={classes.img}
                        alt= {fanfic.title + "-img"}
                        image={fanfic.img}
                        title={fanfic.title}
                    />
                </Grid>
                <Grid className={classes.infoFanfic} item >
                    <Typography  component="div">
                        <Box  fontWeight="fontWeightBold" fontFamily="Roboto" marginLeft={2}>
                            {fanfic.title}
                        </Box>
                        <Box display="flex" justifyContent="center" margin={1} fontSize={5}>
                            <Chip className={classes.fandom} label={fanfic.fandom.name}  variant="outlined"  />
                            <FanficRating className={classes.rating} rating={fanfic.rating} />
                        </Box>
                        <Box>
                            <Typography className={classes.descriptionFanfic} component="div" gutterBottom>
                                {fanfic.description}
                            </Typography>
                        </Box>
                        <Box>
                            <TagsBar tags={fanfic.tags}></TagsBar>
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserFanficItem;