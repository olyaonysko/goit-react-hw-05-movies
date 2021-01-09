import MoviesListItem from './MoviesListItem/MoviesListItem';
import PropTypes from 'prop-types';

import s from './MoviesList.module.css';

const MoviesList = ({ movies, url, location }) => {
  return (
    <ul className={s.list}>
      {movies.map(({ title, name, poster_path, id, release_date }) => (
        <MoviesListItem
          key={id}
          title={title}
          name={name}
          releaseDate={release_date}
          id={id}
          poster={poster_path}
          url={url}
          location={location}
        />
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesList;
