import React from 'react';
import PropTypes from 'prop-types';

function Poll(props) {
  //  Choices lists are static; just use an index
  let key = 0;
  const choices = props.choices.map(c => <li key={key++}>{c}</li>);

  return (
    <div>
      <h1>{props.question}</h1>
      <ul>{choices}</ul>
    </div>
  );
}

Poll.propTypes = {
  /* eslint react/no-unused-prop-types: 0 */
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Poll;
