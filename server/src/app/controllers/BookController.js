const Book = require('../models/Book');
const { mongooseToObject } = require('../../util/mongoose');
const PAGE_SIZE = 5;

class BookController {
    async show(req, res, next) {
        const books = await Book.find();
        res.send(books);
        if (books) {
            res.send(books);
        } else {
            res.status(404).send({ message: 'book Not Found' });
        }
    }
    async search(req, res, next) {
        const { query } = req;
        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const category = query.category || '';
        const price = query.price || '';
        const author = query.author || '';
        const rating = query.rating || '';
        const order = query.order || '';
        const searchQuery = query.query || '';

        const queryFilter =
            searchQuery && searchQuery !== 'all'
                ? {
                    title: {
                        $regex: searchQuery,
                        $options: 'i',
                    },
                }
                : {};
        const categoryFilter = category && category !== 'all' ? { category } : {};
        const ratingFilter =
            rating && rating !== 'all'
                ? {
                    rating: {
                        $gte: Number(rating),
                    },
                }
                : {};
        const priceFilter =
            price && price !== 'all'
                ? {
                    // 1-50
                    price: {
                        $gte: Number(price.split('-')[0]),
                        $lte: Number(price.split('-')[1]),
                    },
                }
                : {};
        const authorFilter =  author && author !== 'all' ? { author } : {};
        const sortOrder =
            order === 'featured'
                ? { featured: -1 }
                : order === 'lowest'
                    ? { price: 1 }
                    : order === 'highest'
                        ? { price: -1 }
                        : order === 'toprated'
                            ? { rating: -1 }
                            : order === 'newest'
                                ? { createdAt: -1 }
                                : { _id: -1 };
        const books = await Book.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...authorFilter,
            ...ratingFilter,
        })
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        const countBooks = await Book.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...authorFilter,
            ...ratingFilter,
        });
        res.send({
            books,
            countBooks,
            page,
            pages: Math.ceil(countBooks / pageSize),
        });
    }
    //[GET] /books/
    async FindAll(req, res, next) {
        const books = await Book.find();
        if (books) {
            res.send(books);
        } else {
            res.status(404).send({ message: 'book Not Found' });
        }
    }



    async create(req, res, next) {
        const newBook = new Book({
            title: 'sample title ' + Date.now(),
            image: "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png",
            price: 0,
            category: 'sample category',
            weight: '0.5 pounds',
            type: 'Paperback',
            pages: 0,
            author: 'author',
            countInStock: 0,
            publisher: 'sample publisher',
            publishDate: '2000',
            dimensions: '5.4 X 0.7 X 7.9 inches',
            language: 'English',
            description: 'sample description',
        });
        const book = await newBook.save();
        res.send({ message: 'Book Created', book });
    }

    async edit(req, res, next) {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if (book) {
            book.title = req.body.title;
            book.price = req.body.price;
            book.image = req.body.image;
            book.category = req.body.category;
            book.dimensions = req.body.dimensions;
            book.weight = req.body.weight;
            book.type = req.body.type;
            book.pages = req.body.pages;
            book.author = req.body.author;
            book.publisher = req.body.publisher;
            book.publishDate = req.body.publishDate;
            book.language = req.body.language;
            book.countInStock = req.body.countInStock;
            book.description = req.body.description;
            await book.save();
            res.send({ message: 'book Updated' });
        } else {
            res.status(404).send({ message: 'book Not Found' });
        }

    }
    //[PUT] /books/:id/
    async update(req, res, next) {
        // Book.updateOne({ _id: req.params.id}, req.body)
        //         .then(() => res.redirect('/me/stored/books'))
        //         .catch(next);
        try {
            const bookId = req.params.id;
            const book = await Book.findById(bookId);
            if (book) {
                book.title = req.body.title;
                book.price = req.body.price;
                book.image = req.body.image;
                book.category = req.body.category;
                book.dimensions = req.body.dimensions;
                book.weight = req.body.weight;
                book.type = req.body.type;
                book.pages = req.body.pages;
                book.author = req.body.author;
                book.publisher = req.body.publisher;
                book.publishDate = req.body.publishDate;
                book.language = req.body.language;
                book.countInStock = req.body.countInStock;
                book.description = req.body.description;
                await Book.save();
                res.send({ message: 'book Updated' });
            } else {
                res.status(404).send({ message: 'book Not Found' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'internal server error' })
        }

    }

    //[DELETE] /:id/
    async delete(req, res, next) {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.remove();
            res.send({ message: 'book Deleted' });
        } else {
            res.status(404).send({ message: 'book Not Found' });
        }
    }

    //[POST] /books/store
    store(req, res, next) {
        // res.json(req.body);
        const book = new Book(req.body);
        book.save()
            .then(() => res.redirect('/'))
            .catch(error => {

            });
    }
    async reviews(req, res, next) {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if (book) {
            if (book.reviews.find((x) => x.title === req.user.title)) {
                return res
                    .status(400)
                    .send({ message: 'You already submitted a review' });
            }

            const review = {
                name: req.user.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            book.reviews.push(review);
            book.numReviews = book.reviews.length;
            book.rating =
                book.reviews.reduce((a, c) => c.rating + a, 0) /
                book.reviews.length;
            const updatedbook = await book.save();
            res.status(201).send({
                message: 'Review Created',
                review: updatedbook.reviews[updatedbook.reviews.length - 1],
                numReviews: book.numReviews,
                rating: book.rating,
            });
        } else {
            res.status(404).send({ message: 'book Not Found' });
        }
    }

    async admin(req, res, next) {

        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const books = await Book.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        const countBooks = await Book.countDocuments();
        res.send({
            books,
            countBooks,
            page,
            pages: Math.ceil(countBooks / pageSize),
        });
    }


    async categories(req, res, next) {
        const categories = await Book.find().distinct('category');
        res.send(categories);
    }
    async FindOneSlug(req, res) {
        const book = await Book.findOne({ slug: req.params.slug });
        if (book) {
            res.send(book);
        } else {
            res.status(404).send({ message: 'Book Not Found ' });
        }

    }
    async FindOneId(req, res) {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.send(book);

        } else {
            res.status(404).send({ message: 'Book Not Found 1' });
        }
    }
    async FindId(req, res, next) {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send({ message: 'book Not Found' });
        }
    }
}
module.exports = new BookController;