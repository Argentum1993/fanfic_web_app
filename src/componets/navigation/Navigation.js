import React, {useEffect, useState} from 'react'
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import logo from '../../logo.png'
import {Link, Route, Switch, useHistory} from "react-router-dom";
import Registration from "../Registration";
import Home from "../home/Home";
import Fanfic from "../fanfic/Fanfic";
import Chapter from "../chapter/Chapter";
import UserMenu from "./UserMenu";
import Profile from "../profile/Profile";
import AuthService from '../../service/auth.service'
import ApiService from '../../service/api.service'
import {CircularProgress} from "@material-ui/core";
import SearchResults from "../search_results/SearchResults";

const Navigation= (props) => {
    const [user, setUser] = useState(AuthService.getCurrentUser())
    const [fandoms, setFandoms] = useState(null)
    const history = useHistory()

    useEffect(() => {
        ApiService.getFandoms()
            .then(r => setFandoms(r.data))
    }, [])

    const logout = () => {
        AuthService.logout()
        setUser(null)
    }

    const onFandom = (fandom) => {
        history.push('/results', { fandom: fandom })
    }

    return (
        <>
            <Navbar bg='light' expand='lg'>
                <LinkContainer to='/'>
                    <Navbar.Brand><img src={logo} alt={'logo'}/>Mordor</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <NavDropdown title='Fandoms' id='basic-nav-dropdown'>
                            {fandoms ?
                                fandoms.map((fandom) => {
                                    return(
                                        <NavDropdown.Item onClick={()=> onFandom(fandom)}>{fandom.name}</NavDropdown.Item>
                                    )}
                                )
                                :
                                <CircularProgress />
                            }
                        </NavDropdown>
                    </Nav>
                    { !user ?
                        <>
                            <LinkContainer to='/login'>
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/sign-up'>
                                <Nav.Link>Sign up</Nav.Link>
                            </LinkContainer>
                        </>
                        :
                        <UserMenu logoutHandler={logout}/>
                    }
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/fanfic" component={Fanfic} />
                <Route exact path="/chapter" component={Chapter} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/results" component={SearchResults} />
            </Switch>
        </>
    )
}

export default Navigation