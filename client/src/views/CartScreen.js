import axios from 'axios';
import React, { useContext } from 'react'
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/layout/MessageBox';
import { Store } from '../StoreProvider';
import { BsFillTrashFill, BsPlusLg, BsDashLg } from "react-icons/bs";



const CartScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;
    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/books/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Book is out stock');
            return;
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }
    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    }
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }
    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (



                        <MessageBox>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) :
                        (
                            <ListGroup>
                                {cartItems.map((item) => (
                                    <ListGroupItem key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={2}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="img-fluid rounded img-thumbnail"
                                                ></img>{' '}

                                            </Col>
                                            <Col md={3}><Link to={`/book/${item.slug}`}>{item.title}</Link></Col>
                                            <Col md={3}>
                                                <Button variant="Light" className='btn btn-secondary'
                                                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                                                    disabled={item.quantity === 1}>
                                                    <BsDashLg className="fas fa-minus-circle" />

                                                </Button>{' '}
                                                <span>{item.quantity}</span>{' '}
                                                <Button variant="Light"
                                                    className='btn btn-secondary'
                                                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                                                    disabled={item.quantity === item.countInStock}>
                                                    <BsPlusLg className="fas fa-plus-circle" />

                                                </Button>{' '}
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col mdd={2}>
                                                <Button variant="Light"
                                                    onClick={() => removeItemHandler(item)}
                                                    disabled={item.quantity === item.countInStock}> {/*item.quantity === item.countInStock */}
                                                    <BsFillTrashFill className="fas fa-trash" />
                                                </Button>{' '}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) : $
                                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={checkoutHandler}
                                            disabled={cartItems.length === 0}
                                        > Proceed to Checkout</Button>
                                    </div>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default CartScreen