import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './MoviesListItem.module.css';
import noPosterImg from '../../../images/no-poster.jpg';

const MoviesListItem = ({
  poster,
  id,
  title,
  name,
  releaseDate,
  url,
  location,
}) => (
  <li className={s.listItem}>
    <Link to={{ pathname: `${url}/${id}`, state: { from: location } }}>
      <img
        src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : noPosterImg}
        alt={title || name}
        className={s.poster}
      />
      <h2 className={s.title}>
        {title || name}
        {releaseDate && <span> ({releaseDate.slice(0, 4)})</span>}
      </h2>
    </Link>
  </li>
);

MoviesListItem.propTypes = {
  poster: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default MoviesListItem;
