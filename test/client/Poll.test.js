import Poll from 'Components/Poll';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

describe('Poll rendering', () => {
  it('Renders OK', () => {
    const component = ReactTestRenderer.create(<Poll id="59fbcdb370318a44f5f911ea" question="Test Question" choices={['a', 'b', 'c']} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
