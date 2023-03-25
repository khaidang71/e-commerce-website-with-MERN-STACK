import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { booksReducer } from '../reducers/booksReducer';
// import data from '../data'
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Book from '../components/Book';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/layout/LoadingBox';
import MessageBox from '../components/layout/MessageBox';
const HomeScreen = () => {
    const [{ loading, error, books }, dispatch] = useReducer(logger(booksReducer), {
        books: [],
        loading: true,
        error: '',
    })
    // const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/books');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message });
            }

            // setBooks(result.data);
        };
        fetchData();
    }, []);
    return (
        <div>
            <Helmet>
                <title>
                    BookStore
                </title>
            </Helmet>
            <h1> Featured Books</h1>
            <div className='books'>
                {
                    loading ? (<LoadingBox />
                    ) : error ? (
                        <MessageBox variant='danger'>{error}</MessageBox>
                    ) : (
                        <Row >

                            {books.map((book) => (
                                <Col key={book.slug} sm={6} md={4} lg={3} className="mb-3 item-container " >

                                    <Book book={book}></Book>

                                </Col>

                            ))}


                        </Row>
                    )}
            </div>
        </div>
    )
}

export default HomeScreen