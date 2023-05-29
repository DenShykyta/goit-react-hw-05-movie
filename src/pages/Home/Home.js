import { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/api';
import MoviesList from 'components/MoviesList/MoviesList';
import Loader from '../../components/Loader';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    const fetchTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setMovies(movies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      {loader && <Loader />}
      <h1>Trending today</h1>
      {movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
};
export default Home;
