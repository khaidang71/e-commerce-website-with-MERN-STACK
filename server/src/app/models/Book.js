const mongoose = require('mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Review = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Image = new Schema({
  name: String,
  desc: String,
  img:
  {
    data: Buffer,
    contentType: String
  }
});

const Book = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  imageI: { Image },
  publishDate: { type: String },
  weight: { type: String },
  type: { type: String },
  pages: { type: Number },
  dimensions: { type: String },
  language: { type: String },
  publisher: { type: String },
  description: { type: String },
  price: { type: Number },
  author: { type: String },
  discount: { type: Number },
  slug: { type: String, required: true, slug: 'title' },
  rating: { type: Number },
  numReviews: { type: Number },
  reviews: [
    Review
  ],
  category: { type: String, },
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: "categorys"
  // },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "subcategorys"
  },
  // authors: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "authors"
  //   },
  // ],
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "suppliers"
  },
  countInStock: {
    type: Number
  },

  slug: { type: String, slug: 'title', unique: true }

}, {
  timestamps: true,
});
module.exports = mongoose.model('Book', Book);
