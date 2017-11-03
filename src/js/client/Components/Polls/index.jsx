import React from 'react';
import PropTypes from 'prop-types';
import Poll from '../Poll';

function Polls(props) {
  const polls = props.polls.map(p => (
    <Poll key={p._id} id={p._id} question={p.question} choices={p.choices} />
  ));

  return <div>{polls}</div>;
}

Polls.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.object),
};

Polls.defaultProps = {
  polls: [],
};

export default Polls;
