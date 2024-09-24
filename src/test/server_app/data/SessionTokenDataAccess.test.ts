import { DataBase } from '../../../app/server_app/data/DataBase';
import { SessionTokenDataAccess } from '../../../app/server_app/data/SessionTokenDataAccess';
import { Account } from '../../../app/server_app/model/AuthModel';

const mockInsert = jest.fn();
const mockGetBy = jest.fn();
const mockUpdate = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: mockInsert,
        getBy: mockGetBy,
        update: mockUpdate,
      };
    }),
  };
});

describe('SessionTokenDataAccess test suite', () => {
  let sut: SessionTokenDataAccess;

  const someUser: Account = {
    id: '',
    userName: 'someUser',
    password: '',
  };

  const someToken = 'asda';

  const someUserValidToken = {
    id: someToken,
    userName: someUser.userName,
    valid: true,
    expirationDate: new Date(),
  };

  beforeEach(() => {
    sut = new SessionTokenDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a token', async () => {
    mockInsert.mockResolvedValueOnce(someToken);
    const actual = await sut.generateToken(someUser);
    expect(actual).toBe(someToken);
  });

  it('shoud invalid token', async () => {
    await sut.invalidateToken(someToken);
    expect(mockUpdate).toHaveBeenCalledWith(someToken, 'valid', false);
  });

  it('should isValidToken return true', async () => {
    mockGetBy.mockResolvedValueOnce(someUserValidToken);
    const actual = await sut.isValidToken(someToken);
    expect(actual).toBe(true);
  });

  it('should isValidToken return false', async () => {
    mockGetBy.mockResolvedValueOnce(undefined);
    const actual = await sut.isValidToken(someToken);
    expect(actual).toBe(false);
  });
});
