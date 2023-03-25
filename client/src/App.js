import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/esm/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
// import LoginForm from './components/account/LoginForm';
// import Landing from './components/layout/Landing';
// import Account from './views/Account';
// import Header from './components/layout/Header';
// import AccountScreen from './views/AccountScreen';
// import AccContextProvider from './contexts/AccContext';
import BookScreen from './views/BookScreen';
import CartScreen from './views/CartScreen';
// import Dashboard from './views/Dashboard';
import HomeScreen from './views/HomeScreen';
import SigninScreen from './views/SigninScreen';
import ShippingAddress from './views/ShippingAddress';
import SignupScreen from './views/SignupScreen';
import PaymentMethodScreen from './views/PaymentMethodScreen';
import PlaceOrderScreen from './views/PlaceOrderScreen';
import OrderScreen from './views/OrderScreen';
import OrderHistoryScreen from './views/OrderHistoryScreen';
import ProfileScreen from './views/ProfileScreen';
import ProtectedRoute from './components/Route/ProtectedRoute';
import DashboardScreen from './views/DashboardScreen';
import AdminRoute from './components/Route/AdminRoute';
import BookListScreen from './views/BookListScreen';
import BookEditScreen from './views/BookEditScreen';
import OrderListScreen from './views/OrderListScreen';
import UserListScreen from './views/UserListScreen';
import UserEditScreen from './views/UserEditScreen';
import SearchScreen from './views/SearchScreen';
import { Store } from './StoreProvider';
import axios from 'axios';
import getError from './utils/getError';
import { Badge, Button, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import SearchBox from './components/searchbox/SearchBox';
import { Link } from 'react-router-dom';
import { BsCart2, BsList } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
// import Footer from './components/layout/Footer';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
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
    // <AccContextProvider>
    <Router>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar bg='dark' variant='dark' expand="lg" className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <BsList className="fas fa-bars"></BsList>
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
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item  key={category}>
                <NavLink
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <NavItem>{category}</NavItem>
                </NavLink>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className='mt-3'>
            <Routes>
              {/* <Route exact path='/' element={<Landing />} /> */}
              <Route exact path='/book/:slug' element={<BookScreen />} />
              <Route exact path='/cart' element={<CartScreen />} />
              <Route exact path='/search' element={<SearchScreen />} />
              <Route exact path='/shipping' element={<ShippingAddress />} />
              <Route exact path='/payment' element={<PaymentMethodScreen />} />
              <Route exact path='/order/:id' element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
              <Route exact path='/placeorder' element={<PlaceOrderScreen />} />
              <Route exact path='orderhistory' element={<ProtectedRoute><OrderHistoryScreen /></ProtectedRoute>} />
              <Route exact path='/signin' element={<SigninScreen />} />
              <Route exact path='/signup' element={<SignupScreen />} />
              <Route exact path='/profile' element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
              {/*  Admin Routes */}
              <Route exact path='/admin/dashboard' element={<AdminRoute><DashboardScreen /></AdminRoute>} />
              <Route exact path='/admin/books' element={<AdminRoute><BookListScreen /></AdminRoute>} />
              <Route exact path='/admin/book/:id' element={<AdminRoute><BookEditScreen /></AdminRoute>} />
              <Route exact path='/admin/orders' element={<AdminRoute><OrderListScreen /></AdminRoute>} />
              <Route exact path='/admin/users' element={<AdminRoute><UserListScreen /></AdminRoute>} />
              <Route exact path='/admin/user/:id' element={<AdminRoute><UserEditScreen /></AdminRoute>} />

              <Route exact path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className='text-center'>
          ALL rights reserved
          {/* <Footer/> */}
        </footer>
      </div>


    </Router>
    // </AccContextProvider>
  );
}

export default App;
