// import { Button } from 'bootstrap';
import '../index.css'
import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Store } from '../StoreProvider';
import axios from 'axios';
import { CardImg } from 'react-bootstrap';
const Book = (props) => {
    const { book } = props;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => {

        const exitsItem = cartItems.find((x) => x._id === book._id);
        const quantity = exitsItem ? exitsItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/books/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Book is out stock');
            return;
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }
    return (
        <Card className='items-products'>
            <Link className='images' to={`/book/${book.slug}`}>
                <CardImg variant="top" src={book.image} className="card-img-top " alt={book.title}>
                </CardImg>
            </Link>
            <Card.Body>
                <Link to={`/book/${book.slug}`}>
                    <Card.Title>{book.title}</Card.Title>
                </Link>
                <Rating rating={book.rating} numReviews={book.numReviews} />
                <Card.Text>
                    ${book.price}
                </Card.Text>
                {book.countInStock === 0 ? <Button variant='light' disabled> Out of Stock</Button>
                    : <Button onClick={() => addToCartHandler(book)}>
                        Add to cart
                    </Button>
                }

            </Card.Body>
        </Card>

    )
}

export default Book;