import { DataBase } from '../../../app/server_app/data/DataBase';
import { ReservationsDataAccess } from '../../../app/server_app/data/ReservationsDataAccess';
import { Reservation } from '../../../app/server_app/model/ReservationModel';

const insertMock = jest.fn();
const updateMock = jest.fn();
const deleteMock = jest.fn();
const getByMock = jest.fn();
const getAllElementsMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        update: updateMock,
        delete: deleteMock,
        getBy: getByMock,
        getAllElements: getAllElementsMock,
      };
    }),
  };
});

describe.only('ReservationsDataAccess test suite', () => {
  let sut: ReservationsDataAccess;

  const someReservation: Reservation = {
    id: '',
    room: 'room',
    user: 'user',
    startDate: '2021-01-01',
    endDate: '2021-01-02',
  };

  const someReservation2: Reservation = {
    id: '',
    room: 'room2',
    user: 'user2',
    startDate: '2021-01-01',
    endDate: '2021-01-02',
  };

  const someId = '1234';

  beforeEach(() => {
    sut = new ReservationsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a reservation and return id', async () => {
    insertMock.mockResolvedValueOnce(someId);
    const actualId = await sut.createReservation(someReservation);

    expect(actualId).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someReservation);
  });

  it('should get reservation by id', async () => {
    getByMock.mockResolvedValueOnce(someReservation);
    const actualReservation = await sut.getReservation(someId);

    expect(actualReservation).toEqual(someReservation);
    expect(getByMock).toHaveBeenCalledWith('id', someId);
  });

  it('shoud get all reservations', async () => {
    getAllElementsMock.mockResolvedValueOnce([
      someReservation,
      someReservation2,
    ]);
    const actualReservations = await sut.getAllReservations();

    const expected = [someReservation, someReservation2];

    expect(actualReservations).toEqual(expected);
    expect(getAllElementsMock).toHaveBeenCalledTimes(1);
  });

  it('should delete reservation', async () => {
    await sut.deleteReservation(someId);
    expect(deleteMock).toHaveBeenCalledWith(someId);
  });

  it('should update reservation', async () => {
    const field = 'room';
    const value = 'newRoom';

    await sut.updateReservation(someId, field, value);
    expect(updateMock).toHaveBeenCalledWith(someId, field, value);
  });
});
