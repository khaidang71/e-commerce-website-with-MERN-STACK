import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
const Rating = (props) => {

    const { rating, numReviews, caption } = props;
    return (
        <div className="rating">
            <span>
                {rating >= 1 ? <BsStarFill />
                    : rating >= 0.5
                        ? <BsStarHalf />
                        : <BsStar />
                }
            </span>
            <span>
                {rating >= 2 ? <BsStarFill />
                    : rating >= 1.5
                        ? <BsStarHalf />
                        : <BsStar />
                }
            </span>
            <span>
                {rating >= 3 ? <BsStarFill />
                    : rating >= 2.5
                        ? <BsStarHalf />
                        : <BsStar />
                }
            </span>
            <span>
                {rating >= 4 ? <BsStarFill />
                    : rating >= 3.5
                        ? <BsStarHalf />
                        : <BsStar />
                }
            </span>
            <span>
                {rating >= 5 ? <BsStarFill />
                    : rating >= 4.5
                        ? <BsStarHalf />
                        : <BsStar />
                }
            </span>
            {caption ? (
                <span>{caption}</span>
            ) : numReviews > 0 ? (
                <span>{' ' + numReviews + ' reviews'}</span>

            ) : (<span>{' reviews'}</span>)
            }
        </div>
    )
}

export default Rating