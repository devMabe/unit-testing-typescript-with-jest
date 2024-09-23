import {
  calculateComplexity,
  OtherStringUtils,
  toUpperCaseWithCb,
} from '../../app/doubles/OtherUtils';

describe.skip('OtherUtils test suite', () => {
  describe.only('OtherStringUtils test with spies', () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test('use a spy to track calls', () => {
      const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
      sut.toUpperCase('abc');
      expect(toUpperCaseSpy).toBeCalledWith('abc');
    });

    test('use a spy to track calls to other module', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      sut.logString('abc');
      expect(consoleLogSpy).toBeCalledWith('abc');
    });

    test.only('use a spy to replace implemementation of a method', () => {
      jest.spyOn(sut, 'exernalService').mockImplementation(() => {
        console.log('External service called');
      });
      sut.exernalService();
    });
  });

  describe('Traking callbacks with jest mocks', () => {
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
