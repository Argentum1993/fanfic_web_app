import React from 'react'
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import logo from '../logo.png'
import {Link} from "react-router-dom";

const Navigation= (props) => {
    return (
        <Navbar bg='light' expand='lg'>
            <LinkContainer to='/'>
                <Navbar.Brand><img src={logo} alt={'logo'}/>Mordor</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <NavDropdown title='Fandoms' id='basic-nav-dropdown'>
                        <LinkContainer to='/test'>
                            <NavDropdown.Item>Fandom 1</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/test1'>
                            <NavDropdown.Item >Fandom 2</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/test2'>
                            <NavDropdown.Item>Fandom 3</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type='text' placeholder='Search' className='mr-sm-2' />
                    <Button variant='outline-success'>Search</Button>
                </Form>
                <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/sign-up'>
                    <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation