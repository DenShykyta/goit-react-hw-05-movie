import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovie } from '../../services/api';
import Loader from '../Loader';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchReviews = async () => {
      try {
        const Reviews = await getReviewsMovie(movieId);
        setReviews(Reviews);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}
      {reviews.length === 0 ? (
        <h3>We don't have any reviews for this movie.</h3>
      ) : (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h4>
                <span>Author:</span> {author}
              </h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Reviews;
