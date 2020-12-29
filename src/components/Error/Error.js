import PropTypes from 'prop-types';
import s from './Error.module.css';

import NotFoundPic from '../../images/not-found.jpg';

function Error({ message }) {
  return (
    <div role="alert" className={s.wrapper}>
      <p text={message} className={s.message}>
        {message}
      </p>
      <img
        src={NotFoundPic}
        width="650"
        alt="not found pic"
        className={s.img}
      />
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
