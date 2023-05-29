import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastMovie } from '../../services/api';
import Loader from '../Loader';
import css from './Cast.module.css';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';
const DEFAULT_IMG = 'https://via.placeholder.com/124x186.png/CCCCCC/000000';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchCast = async () => {
      try {
        const cast = await getCastMovie(movieId);
        setCast(cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}
      <ul className={css.castList}>
        {cast.map(({ id, profile_path, name, character, original_name }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? BASE_POSTER_URL + profile_path
                  : `${DEFAULT_IMG}?text=${name}`
              }
              alt={name}
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
