import App from 'App';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import mockFetch from './mock-fetch';

//  TODO:
//  Fetch is called by App component and will show a network
//  error in tests if it's not available or mocked, BUT, the App
//  component test snapshot doesn't include the mocked data yet...
beforeEach(() => {
  jest.spyOn(window, 'fetch').mockImplementation(mockFetch([
    {
      _id: '59fa8d7305b9e712dea4e648',
      createdBy: 'test user',
      question: 'test question',
      choices: [
        { text: 'a', votes: ['59fa8d7305b9e712dea4e648'] },
        { text: 'b', votes: [] },
        { text: 'c', votes: [] },
      ],
    },
  ]));
});

afterEach(() => {
  window.fetch.mockRestore();
});

describe('App rendering', () => {
  it('Renders OK', () => {
    const component = ReactTestRenderer.create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
