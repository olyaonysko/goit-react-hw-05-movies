import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import s from './MoviesDetails.module.css';
import noPosterImg from '../../images/no-poster.jpg';

const MoviesDetails = ({ movie, url, location }) => {
  return (
    <>
      <div className={s.wrapper}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : noPosterImg
          }
          alt={movie.title && movie.original_name}
          width="350px"
          className={s.poster}
        />
        <div className={s.description}>
          <h2 className={s.title}>
            {movie.title && movie.original_nam}
            {movie.title}
            {movie.release_date && (
              <span> ({movie.release_date.slice(0, 4)})</span>
            )}
          </h2>
          <h3 className={s.title}>
            Rating:
            <span className={(s.info, s.rating)}>⭐{movie.vote_average}</span>
          </h3>
          <h3 className={s.title}>Overview</h3>
          <p className={s.info}>{movie.overview}</p>
          <h2 className={s.title}>
            Genres:
            <ul className={s.genreList}>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </h2>
        </div>
      </div>
      <ul className={s.navigation}>
        <li className={s.link}>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location.state ? location.state.from : '/' },
            }}
            activeClassName={s.activeLink}
          >
            Credits
          </NavLink>
        </li>
        <li className={s.link}>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location.state ? location.state.from : '/' },
            }}
            activeClassName={s.activeLink}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </>
  );
};

MoviesDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default MoviesDetails;
