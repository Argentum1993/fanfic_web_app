import React, {useState} from 'react'
import {Menu, MenuItem, Select} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import AuthService from '../../service/auth.service'
import Avatar from "@material-ui/core/Avatar"
import {makeStyles} from "@material-ui/core/styles"
import {deepOrange} from "@material-ui/core/colors"
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        height: 44,
        width: 44,
        fontSize: 10,
        marginRight: theme.spacing(1)
    }
}))

const UserMenu = ({logoutHandler}) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory()

    const user = AuthService.getCurrentUser()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRedirect = (to) => {
        history.push(to)
    };

    const onClickHandler = ({handles, params}) => {
        for (let i = 0; i < handles.length; i++) {
            const args = params[i]
            if (Boolean(args)) {
                handles[i](...args)
            } else {
                handles[i]()
            }
        }
        handleClose()
    }

    return (
        <>
            <Button
                style={{textTransform: 'none'}}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                startIcon={<Avatar className={classes.avatar}>{user.firstName.substring(0,1).toUpperCase()}</Avatar>}
            >
                {user.firstName}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => onClickHandler({
                        handles: [handleRedirect],
                        params: [['/profile']]
                    })
                    }
                >
                    Profile
                </MenuItem>
                <MenuItem onClick={() => onClickHandler({
                        handles: [handleRedirect, logoutHandler],
                        params: [['/'], null]
                    })
                }
                >
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;