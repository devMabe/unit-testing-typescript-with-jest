import {
  calculateComplexity,
  toUpperCaseWithCb,
} from '../../app/doubles/OtherUtils';

describe('OtherUtils test suite', () => {
  describe.only('Traking callbacks with jest mocks', () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('calls callback for invalid argument - track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toBeCalledWith('Invalid argument');
      expect(callBackMock).toBeCalledTimes(1);
    });

    it('calls callback for  valid argument - track calls', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(callBackMock).toBeCalledWith('Called function with abc');
      expect(callBackMock).toBeCalledTimes(1);
    });
  });

  describe('Tracking callbacks', () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it('To upper case with callback invalida argument - track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain('Invalid argument');
      expect(timesCalled).toBe(1);
    });

    it('To upper case with callback valid argument - track calls', () => {
      const actual = toUpperCaseWithCb('abc', () => callBackMock);
      expect(actual).toBe('ABC');
      expect(cbArgs).not.toContain('called function with abc');
    });
  });

  xit('Calculate complexity', () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: 'someInfo',
        field2: 'someInfo2',
      },
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
