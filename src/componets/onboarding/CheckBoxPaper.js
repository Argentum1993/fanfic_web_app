import React, {useState} from 'react';
import {Checkbox, FormControlLabel, Paper} from "@material-ui/core";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";

const CheckBoxPaper = (props) => {
    const [checkbox, setCheckbox] = useState()

    const handleCheckbox = (e) => {
        const { target } = e
        if (target.checked)
            props.addFavoriteHandler(target.value)
        else
            props.removeFavoriteHandler(target.value)
    };
    return (
        <Grid item>
            <Paper className={props.className}>
                <FormControlLabel
                    control={
                        <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                            name={props.name + props.id}
                            value={props.id}
                            onChange={handleCheckbox}
                        />
                    }
                    label={props.name}
                />
            </Paper>
        </Grid>
    );
};

export default CheckBoxPaper;