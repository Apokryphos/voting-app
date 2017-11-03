import Api from 'Api';
import mockFetch from './mock-fetch';

beforeEach(() => {
  jest.spyOn(window, 'fetch').mockImplementation(mockFetch({
    name: 'test name',
    question: 'test question',
    choices: ['a', 'b', 'c'],
  }));
});

afterEach(() => {
  window.fetch.mockRestore();
});

describe('getPolls method returns expected JSON', () => {
  it('Returns vaild JSON', () => {
    Api.getPolls().then((json) => {
      expect('test name').toEqual('test name');
      expect(json.name).toEqual('test name');
      expect(json.question).toEqual('test question');
      expect(json.choices.length).toEqual(3);
      expect(json.choices[0]).toEqual('a');
      expect(json.choices[1]).toEqual('b');
      expect(json.choices[2]).toEqual('c');
    });
  });
});
