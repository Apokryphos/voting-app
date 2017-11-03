import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  return <h1>{props.text}</h1>;
}

Title.propTypes = {
  text: PropTypes.string,
};

Title.defaultProps = {
  text: 'Untitled',
};

export default Title;
