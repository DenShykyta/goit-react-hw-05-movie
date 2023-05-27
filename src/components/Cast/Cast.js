import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastMovie } from '../services/api';
import css from './Cast.module.css';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const cast = await getCastMovie(movieId);
        setCast(cast);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <>
      <ul className={css.castList}>
        {cast.map(({ id, profile_path, original_name, character }) => (
          <li key={id}>
            <img
              src={BASE_POSTER_URL + profile_path}
              alt={original_name}
              width="124px"
            />
            <p>
              <span> Actor:</span> {original_name}
            </p>
            <p>
              <span>Character:</span> {character}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
