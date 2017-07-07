import * as utils from './utils.js';
test('It should replace underscores with spaces', () => {
  const actual = utils.capitaliseAndSpace('test_word');
  const expected = 'Test word';
  expect(expected).toEqual(actual);
});
