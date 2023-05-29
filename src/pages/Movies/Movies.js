import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieByQuery } from 'services/api';
import Form from 'components/searchForm/Form';
import Loader from '../../components/Loader';
import MoviesList from 'components/MoviesList';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentQuery = searchParams.get('query');
    if (!currentQuery) {
      return;
    }
    const fetchMovieByQuery = async () => {
      setLoader(true);
      try {
        const movieByQuery = await getMovieByQuery(currentQuery);
        setMovies(movieByQuery);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchMovieByQuery();
  }, [searchParams]);

  return (
    <div>
      <Form setSearchParams={setSearchParams} />
      {loader && <Loader />}
      <MoviesList movies={movies} />
    </div>
  );
};

export default Movies;
