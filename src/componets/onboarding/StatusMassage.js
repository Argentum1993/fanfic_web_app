import React from 'react';
import {makeStyles, Modal} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const StatusMassage = (props) => {
    const classes = useStyles();

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">{ props.values && props.values.title && props.values.title }</h2>
            <p id="simple-modal-description">
                {props.values && props.values.msg && props.values.msg}
            </p>
            <button type="button" onClick={props.handleClose}>
                OK
            </button>
        </div>
    );

    return (
        <Modal
            className={classes.modal}
            open={props.values.open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
};

export default StatusMassage;