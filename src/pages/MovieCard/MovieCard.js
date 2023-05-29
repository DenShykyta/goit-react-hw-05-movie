import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { getMovieById } from 'services/api';
import Loader from '../../components/Loader';
import css from './MovieCard.module.css';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';
const DEFAULT_IMG = 'https://via.placeholder.com/320.png/CCCCCC/000000';

const MovieCard = () => {
  const [movie, setMovie] = useState({});
  const [loader, setLoader] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    setLoader(true);
    const fetchMovieById = async () => {
      try {
        const movieById = await getMovieById(movieId);
        setMovie(movieById);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchMovieById();
  }, [movieId]);

  return (
    <>
      <Link className={css.backLink} to={backLinkHref}>
        &#60; Go back
      </Link>
      {loader && <Loader />}
      <div className={css.generalInfo}>
        <img
          src={
            movie.poster_path
              ? BASE_POSTER_URL + movie.poster_path
              : `${DEFAULT_IMG}?text=${movie.title}`
          }
          alt={movie.title}
          width="320px"
        />
        <div className={css.generalInfo_text}>
          <h2>{movie.original_title}</h2>
          <p>Avarage: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <ul className={css.genresList}>
            {movie.genres?.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.addInfo}>
        <h5>Additional information</h5>
        <ul>
          <li>
            <NavLink to="cast" state={location.state}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={location.state}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieCard;
