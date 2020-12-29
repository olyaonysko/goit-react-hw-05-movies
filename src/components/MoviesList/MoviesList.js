import MoviesListItem from './MoviesListItem/MoviesListItem';
import PropTypes from 'prop-types';

import s from './MoviesList.module.css';

const MoviesList = ({ movies, url }) => {
  return (
    <ul className={s.list}>
      {movies.map(({ title, poster_path, id }) => (
        <MoviesListItem
          key={id}
          title={title}
          id={id}
          poster={poster_path}
          url={url}
        />
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesList;
