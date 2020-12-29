import PropTypes from 'prop-types';
import s from './Container.module.css';

const Container = ({ children }) => (
  <div className={s.Container}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
