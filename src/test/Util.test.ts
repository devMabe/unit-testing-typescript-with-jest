import { getStringInfo, StringUtils, toUpperCase } from '../app/Util';

describe('Utils test suite', () => {
  describe('StringUtils tests', () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
    });

    it('Should return correct upper case', () => {
      const actual = sut.toUpperCase('abc');
      expect(actual).toBe('ABC');
    });

    it('Should throw error on invalid argument  - function', () => {
      function expectError() {
        const actual = sut.toUpperCase('');
      }

      expect(expectError).toThrow();
      expect(expectError).toThrowError('Invalid argument');
    });

    it('Should throw error on invalid argument  - arrow function', () => {
      expect(() => {
        sut.toUpperCase('');
      }).toThrowError('Invalid argument');
    });

    it('Should throw error on invalid argument  - try catch block', (done) => {
      try {
        sut.toUpperCase('');
        done('GetStringInfo should thorw error for invalid argument');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Invalid argument');
        done();
      }
    });
  });

  it('should return uppercase of valid string', () => {
    const sut = toUpperCase;
    const expected = 'ABC';

    const actual = sut('abc');

    expect(actual).toBe(expected);
  });

  describe('ToUpperCase examples', () => {
    it.each([
      { input: 'abc', expected: 'ABC' },
      { input: 'My-String', expected: 'MY-STRING' },
      { input: 'def', expected: 'DEF' },
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe('getStringInfo for My-String should', () => {
    test('return rigth length', () => {
      const actual = getStringInfo('My-String');
      expect(actual.charachters).toHaveLength(9);
    });

    test('return rigth lower case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.lowerCase).toBe('my-string');
    });

    test('return rigth upper case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.upperCase).toBe('MY-STRING');
    });

    test('return rigth caracters', () => {
      const actual = getStringInfo('My-String');
      expect(actual.charachters).toEqual([
        'M',
        'y',
        '-',
        'S',
        't',
        'r',
        'i',
        'n',
        'g',
      ]);
      expect(actual.charachters).toContain<string>('M');
      expect(actual.charachters).toEqual(
        expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-'])
      );
    });

    test('return defined extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toBeDefined();
    });

    test('return rigth extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toEqual({});
    });
  });
});
