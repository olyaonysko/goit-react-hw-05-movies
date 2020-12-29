import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './MoviesListItem.module.css';
import noPosterImg from '../../../images/no-poster.jpg';

const MoviesListItem = ({ poster, id, title, url }) => (
  <li className={s.listItem}>
    <Link to={{ pathname: `${url}/${id}` }}>
      <img
        src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : noPosterImg}
        alt={title}
        className={s.poster}
      />
      <h2 className={s.title}>{title}</h2>
    </Link>
  </li>
);

MoviesListItem.propTypes = {
  poster: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default MoviesListItem;
