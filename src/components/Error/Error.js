import PropTypes from 'prop-types';
import s from './Error.module.css';

import NotFoundPic from '../../images/not-found.jpg';

function Error({ message }) {
  return (
    <div role="alert" className={s.wrapper}>
      <img
        src={NotFoundPic}
        width="650"
        alt="not found pic"
        className={s.img}
      />
      <p text={message} className={s.message}>
        {message}
      </p>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
