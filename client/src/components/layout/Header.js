import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { Badge, Button, Nav, NavDropdown } from 'react-bootstrap';
import { Store } from '../../StoreProvider';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { BsCart2 } from "react-icons/bs";
import SearchBox from '../searchbox/SearchBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import getError from '../../utils/getError';
const Header = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = 'signin';
    }
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`/api/books/categories`);
                setCategories(data);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchCategories();
    }, []);
    return (
        <Navbar bg='dark' variant='dark' expand="lg" className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <Container>
                <Button
                    variant="dark"
                    onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                    <i className="fas fa-bars"></i>
                </Button>
                <LinkContainer to="/">
                    <Navbar.Brand>BookStore</Navbar.Brand>
                </LinkContainer>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav">
                    <SearchBox />
                    <Nav className='me-auto w-100 justify-content-end' >
                        <Link to='/cart' className='nav-link'>
                            <BsCart2 />
                            {cart.cartItems.length > 0 && (
                                <Badge pill bg='danger'>
                                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                </Badge>
                            )}
                        </Link>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">

                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/orderhistory">
                                    <NavDropdown.Item>order History</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Divider />
                                <Link
                                    className='dropdown-item'
                                    to="#signout"
                                    onClick={signoutHandler}
                                >
                                    Sign Out
                                </Link>

                            </NavDropdown>
                        ) : (
                            <Link className="nav-link" to="signin">
                                Sign In
                            </Link>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title="Admin" id="admin-nav-dropdown">
                                <LinkContainer to="/admin/dashboard">
                                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/books">
                                    <NavDropdown.Item>Book</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/orders">
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/users">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </NavbarCollapse>

            </Container>
        </Navbar>

    )
}

export default Header