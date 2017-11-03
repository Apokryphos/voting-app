import Title from 'Components/Title';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

describe('Title rendering', () => {
  it('Renders OK', () => {
    const component = ReactTestRenderer.create(<Title />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
