import css from './MoviesList.module.css';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';
const DEFAULT_IMG = 'https://via.placeholder.com/320x480.jpg/CCCCCC/000000';

const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.movie_list}>
      {movies.map(({ id, original_title, title, poster_path }) => (
        <li className={css.list_item} key={id}>
          <Link
            className={css.list_link}
            state={{ from: location }}
            to={`/movies/${id}`}
          >
            <img
              src={
                poster_path
                  ? BASE_POSTER_URL + poster_path
                  : `${DEFAULT_IMG}?text=${title}`
              }
              alt={title}
            />
            <h2 className={css.movie_title}>{title || original_title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ),
};
