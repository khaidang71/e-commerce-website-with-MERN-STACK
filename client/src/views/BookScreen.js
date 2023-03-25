import axios from 'axios';
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { Badge, Button, Card, Col, FloatingLabel, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import LoadingBox from '../components/layout/LoadingBox';
import MessageBox from '../components/layout/MessageBox';
import Rating from '../components/Rating';
import { bookReducer } from '../reducers/bookReducer';
import { Store } from '../StoreProvider';
import getError from '../utils/getError';


const BookScreen = () => {
    let reviewsRef = useRef();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, book, loadingCreateReview }, dispatch] =
        useReducer(bookReducer, {
            book: [],
            loading: true,
            error: '',
        });
    // const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/books/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const addToCartHandler = async () => {

        const exitsItem = cart.cartItems.find((x) => x._id === book._id);
        const quantity = exitsItem ? exitsItem.quantity + 1 : 1;

        const { data } = await axios.get(`/api/books/${book._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry. Book is out stock');
            return;
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...book, quantity } });

        navigate('/cart');
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!comment || !rating) {
            toast.error('Please enter comment and rating');
            return;
        }
        try {
            const { data } = await axios.post(
                `/api/books/${book._id}/reviews`,
                { rating, comment, name: userInfo.name },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );

            dispatch({
                type: 'CREATE_SUCCESS',
            });
            toast.success('Review submitted successfully');
            book.reviews.unshift(data.review);
            book.numReviews = data.numReviews;
            book.rating = data.rating;
            dispatch({ type: 'REFRESH_BOOK', payload: book });
            window.scrollTo({
                behavior: 'smooth',
                top: reviewsRef.current.offsetTop,
            });
        } catch (error) {
            toast.error(getError(error));
            dispatch({ type: 'CREATE_FAIL' });
        }
    };
    return (
        loading ? (<LoadingBox />
        ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
        ) :
            <div>
                <Row>
                    <Col md={4}>
                        <img className='img-large'
                            src={book.image}
                            alt={book.title}
                        ></img>
                    </Col>
                    <Col md={5}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Helmet>
                                    <title>
                                        {book.title}
                                    </title>
                                </Helmet>
                                <h1>{book.title}</h1>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating
                                    rating={book.rating}
                                    numReviews={book.numReviews} />

                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Book Details</h2>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${book.price}</Col>
                                </Row>
                                <Row>
                                    <Col>Author:</Col>
                                    <Col>{book.author}</Col>
                                </Row>
                                <Row>
                                    <Col>Category:</Col>
                                    <Col>{book.category}</Col>
                                </Row>
                                <Row>
                                    <Col>Publisher:</Col>
                                    <Col>{book.publisher}</Col>
                                </Row>
                                <Row>
                                    <Col>Publish Date:</Col>
                                    <Col>{book.publishDate}</Col>
                                </Row>
                                <Row>
                                    <Col>Pages:</Col>
                                    <Col>{book.pages}</Col>
                                </Row>
                                <Row>
                                    <Col>Dimensions:</Col>
                                    <Col>{book.dimensions}</Col>
                                </Row>
                                <Row>
                                    <Col>Weight:</Col>
                                    <Col>{book.weight}</Col>
                                </Row>
                                <Row>
                                    <Col>Language:</Col>
                                    <Col>{book.language}</Col>
                                </Row>
                                <Row>
                                    <Col>Type:</Col>
                                    <Col>{book.type}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h5>Description:</h5>
                                <p>{book.description}</p>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>${book.price}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {1 > 0 ?
                                                    <Badge bg='success'>In Stock</Badge>
                                                    : <Badge bg='danger'>Dager</Badge>
                                                }</Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <div className='d-grid'>
                                            <Button onClick={addToCartHandler} variant='primary'>
                                                Add to Cart
                                            </Button>

                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div className="my-3">
                    <h2 ref={reviewsRef}>Reviews</h2>
                    <div className="mb-3">
                        {book.reviews.length === 0 && (
                            <MessageBox>There is no review</MessageBox>
                        )}
                    </div>
                    <ListGroup>
                        {book.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} caption=" "></Rating>
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="my-3">
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <h2>Write a customer review</h2>
                                <Form.Group className="mb-3" controlId="rating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Select
                                        aria-label="Rating"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="1">1- Poor</option>
                                        <option value="2">2- Fair</option>
                                        <option value="3">3- Good</option>
                                        <option value="4">4- Very good</option>
                                        <option value="5">5- Excelent</option>
                                    </Form.Select>
                                </Form.Group>
                                <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="Comments"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </FloatingLabel>

                                <div className="mb-3">
                                    <Button disabled={loadingCreateReview} type="submit">
                                        Submit
                                    </Button>
                                    {loadingCreateReview && <LoadingBox></LoadingBox>}
                                </div>
                            </form>
                        ) : (
                            <MessageBox>
                                Please{' '}
                                <Link to={`/signin?redirect=/book/${book.slug}`}>
                                    Sign In
                                </Link>{' '}
                                to write a review
                            </MessageBox>
                        )}
                    </div>
                </div>
            </div>
    )
}

export default BookScreen;