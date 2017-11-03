import App from 'App';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

describe('App rendering', () => {
  it('Renders OK', () => {
    const component = ReactTestRenderer.create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
