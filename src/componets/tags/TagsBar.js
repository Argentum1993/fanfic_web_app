import React from 'react';
import Box from "@material-ui/core/Box";
import {Chip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {deepOrange} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    tag: {
        margin: theme.spacing(0.2)
    }
}));

const TagsBar = (props) => {
    const classes = useStyles()
    const { tags, ...args} = props

    return(
        <Box
            alignContent="left"
            textAlign="left"
            {...args}
        >
            {tags && tags.map((tag, i) => {
                return(
                    <Chip className={classes.tag} key={tag.name + i} label={tag.name}/>
                )
            })}
        </Box>
    )
}

export default TagsBar;