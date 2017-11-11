import Poll from 'Components/Poll';
import PollData from '../data/poll-data';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

describe('Poll rendering', () => {
  it('Renders OK', () => {
    const poll = PollData.valid();
    poll.id = '59fbcdb370318a44f5f911ea';

    const jsx = (
      <Poll
        createdBy={poll.createdBy}
        id={poll.id}
        question={poll.question}
        choices={poll.choices}
      />
    );
    const component = ReactTestRenderer.create(jsx);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
