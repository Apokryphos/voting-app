import PollData from '../data/poll-data';
import Polls from 'Components/Polls';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

describe('Polls rendering', () => {
  const pollData = PollData.valid();
  pollData._id = '59fbcdb370318a44f5f911ea';

  const pollsData = [pollData];

  it('Renders OK', () => {
    const component = ReactTestRenderer.create(<Polls polls={pollsData} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
