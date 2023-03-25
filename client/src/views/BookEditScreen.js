import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/layout/LoadingBox';
import MessageBox from '../components/layout/MessageBox';
import { Store } from '../StoreProvider';
import getError from '../utils/getError';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
};
export default function BookEditScreen() {
    const navigate = useNavigate();
    const params = useParams(); // /book/:id
    const { id: bookId } = params;

    const { state } = useContext(Store);
    const { userInfo } = state;
    const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [pages, setPages] = useState('');
    const [author, setAuthor] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [weight, setWeight] = useState('');
    const [type, setType] = useState('');
    const [language, setLanguage] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/books/${bookId}`);
                setTitle(data.title);
                setPrice(data.price);
                setImage(data.image);
                setCategory(data.category);
                setPublisher(data.publisher);
                setPublishDate(data.publishDate);
                setPages(data.pages);
                setAuthor(data.author);
                setDimensions(data.dimensions);
                setWeight(data.weight);
                setType(data.type);
                setLanguage(data.language);
                setCountInStock(data.countInStock);
                //d;
                setDescription(data.description);
                dispatch({ type: 'FETCH_SUCCESS' });
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err),
                });
            }
        };
        fetchData();
    }, [bookId]);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'UPDATE_REQUEST' });
            await axios.put(
                `/api/books/${bookId}`,
                {
                    _id: bookId,
                    title,
                    price,
                    image,
                    category,
                    publisher,
                    publishDate,
                    pages,
                    author,
                    dimensions,
                    weight,
                    type,
                    language,
                    countInStock,
                    description,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            toast.success('Book updated successfully');
            navigate('/admin/books');
        } catch (err) {
            toast.error(getError(err));
            dispatch({ type: 'UPDATE_FAIL' });
        }
    };
    return (
        <Container classtitle="small-container">
            <Helmet>
                <title>Edit Book ${bookId}</title>
            </Helmet>
            <h1>Edit Book {bookId}</h1>

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group classtitle="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="title">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="image">
                        <Form.Label>Image File</Form.Label>
                        <Form.Control
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="publisher">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="publishDate">
                        <Form.Label>PublishDate</Form.Label>
                        <Form.Control
                            value={publishDate}
                            onChange={(e) => setPublishDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="pages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                            value={pages}
                            onChange={(e) => setPages(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="dimensions">
                        <Form.Label>Dimensions</Form.Label>
                        <Form.Control
                            value={dimensions}
                            onChange={(e) => setDimensions(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="weight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="language">
                        <Form.Label>Language</Form.Label>
                        <Form.Control
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="countInStock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group classtitle="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div classtitle="mb-3">
                        <Button disabled={loadingUpdate} type="submit">
                            Update
                        </Button>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                    </div>
                </Form>
            )}
        </Container>
    );

}
