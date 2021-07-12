import React, {useRef, useState} from 'react';
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
    }
}));

const InPlaceEditingField = ({defaultValue, label, saveChangeHandler }) => {
    const EDIT_LABEL = "Edit"
    const CONFIRM_LABEL = "Confirm"

    const classes = useStyles()
    const [edit, setEdit] = useState(true)
    const [fieldButton, setFieldButton] = useState("")
    const [value, setValue] = useState(defaultValue)
    const [waitConfirm, setWaitConfirm] = useState(false)

    const inputRef = useRef(null)

    const buttonFactory = (handler, label) => {
        let icon = null

        switch (label) {
            case CONFIRM_LABEL:
                icon = <DoneIcon/>
                break
            case EDIT_LABEL:
                icon = <EditIcon />
                break
        }
        return(
            <IconButton aria-label={label} onClick={handler}>
                {icon}
            </IconButton>
        )
    }

    const showEdit = (button) => {
        if (!waitConfirm)
            setFieldButton(button)
    }

    const hideEdit = () => {
        if (!waitConfirm)
            setFieldButton( "")
    }

    const confirmHandler = () =>{
        saveChangeHandler(inputRef.current.value)
        setWaitConfirm(false)
        setEdit(true)
    }

    const editHandler = () => {
        setWaitConfirm(true)
        setFieldButton(buttonFactory(confirmHandler, CONFIRM_LABEL))
        setEdit(false)
    }

    const changeHandler = (e) => {
        setValue(e.target.value)
    }

    return (
        <TextField
            className={classes.root}
            label={label}
            inputRef={inputRef}
            defaultValue={defaultValue}
            InputProps={{
                readOnly: edit,
                endAdornment: <InputAdornment position="end">{fieldButton}</InputAdornment>
            }}
            onMouseEnter={() => showEdit(buttonFactory(editHandler, EDIT_LABEL))}
            onMouseLeave={hideEdit}
        />
    );
};

export default InPlaceEditingField;