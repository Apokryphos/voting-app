import Api from 'Api';
import mockFetch from './mock-fetch';

beforeEach(() => {
  jest.spyOn(window, 'fetch').mockImplementation(mockFetch({
    createdBy: 'test user',
    question: 'test question',
    choices: [{ text: 'a', votes: [] }, { text: 'b', votes: [] }, { text: 'c', votes: [] }],
  }));
});

afterEach(() => {
  window.fetch.mockRestore();
});

describe('getPolls method returns expected JSON', () => {
  it('Returns vaild JSON', () => {
    Api.getPolls().then((json) => {
      expect(json.createdBy).toEqual('test user');
      expect(json.question).toEqual('test question');
      expect(json.choices.length).toEqual(3);
      expect(json.choices[0].text).toEqual('a');
      expect(json.choices[0].votes.length).toEqual(0);
      expect(json.choices[1].text).toEqual('b');
      expect(json.choices[1].votes.length).toEqual(0);
      expect(json.choices[2].text).toEqual('c');
      expect(json.choices[2].votes.length).toEqual(0);
    });
  });
});
