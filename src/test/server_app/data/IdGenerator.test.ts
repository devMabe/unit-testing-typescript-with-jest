import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

jest.mock('crypto', () => ({
  randomBytes: () => '12345bs',
}));

describe.only('IdGenerator test suite', () => {
  it('should generate a random id', () => {
    const actual = IdGenerator.generateRandomId();
    expect(actual).toBe('12345bs');
  });
});
