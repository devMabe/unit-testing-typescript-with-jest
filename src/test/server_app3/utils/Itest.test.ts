import * as generated from '../../../app/server_app/data/IdGenerator';
import { Account } from '../../../app/server_app/model/AuthModel';
import { Reservation } from '../../../app/server_app/model/ReservationModel';
import {
  HTTP_CODES,
  HTTP_METHODS,
} from '../../../app/server_app/model/ServerModel';
import { Server } from '../../../app/server_app/server/Server';
import { makeAwesomeRequest } from './http-client';

describe('Server app integration tests', () => {
  let server: Server;

  beforeAll(() => {
    server = new Server();
    server.startServer();
  });

  afterAll(() => {
    server.stopServer();
  });

  const someUser: Account = {
    id: '',
    userName: 'someUserName',
    password: 'somePassword',
  };

  const someReservation: Reservation = {
    id: '',
    user: 'someUser',
    startDate: 'someStartDate',
    endDate: 'someEndDate',
    room: 'someRoom',
  };

  it('should register new user', async () => {
    const result = await fetch('http://localhost:8080/register', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.userId).toBeDefined();
  });

  it('should register new user with awesomeRequest', async () => {
    const result = await makeAwesomeRequest(
      {
        host: 'localhost',
        port: 8080,
        method: HTTP_METHODS.POST,
        path: '/register',
      },
      someUser
    );

    expect(result.statusCode).toBe(HTTP_CODES.CREATED);
    expect(result.body.userId).toBeDefined();
  });

  let token: string;
  it('should login a register user', async () => {
    const result = await fetch('http://localhost:8080/login', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.token).toBeDefined();
    token = resultBody.token;
  });

  let reservationId: string;
  it('should  create reservation if authorized', async () => {
    const result = await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.reservationId).toBeDefined();
    reservationId = resultBody.reservationId;
  });

  it('should get reservation if authorized', async () => {
    const result = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );
    const resultBody = await result.json();

    const exppectedReservation = structuredClone(someReservation);
    exppectedReservation.id = reservationId;

    expect(result.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toEqual(exppectedReservation);
  });

  it('should create and retrive multiple reservations if authorize', async () => {
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    const getAllResult = await fetch(`http://localhost:8080/reservation/all`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    });

    const resultBody = await getAllResult.json();
    expect(getAllResult.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toHaveLength(5);
  });

  it('should update reservation if authorized', async () => {
    const updateResult = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.PUT,
        body: JSON.stringify({
          startDate: 'otherStartDate',
        }),
        headers: {
          authorization: token,
        },
      }
    );

    expect(updateResult.status).toBe(HTTP_CODES.OK);

    const getResult = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );
    const getRequestBody: Reservation = await getResult.json();
    expect(getRequestBody.startDate).toBe('otherStartDate');
  });

  it('should delete reservation if authorized', async () => {
    const deleteResult = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.DELETE,
        headers: {
          authorization: token,
        },
      }
    );

    expect(deleteResult.status).toBe(HTTP_CODES.OK);

    const getResult = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );
    expect(getResult.status).toBe(HTTP_CODES.NOT_fOUND);
  });

  it('snapshot demo', async () => {
    jest.spyOn(generated, 'generateRandomId').mockReturnValueOnce('12345');
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    const getResult = await fetch(`http://localhost:8080/reservation/12345`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    });
    const getRequestBody: Reservation = await getResult.json();

    expect(getRequestBody).toMatchSnapshot();
    expect(getRequestBody).toMatchSnapshot();
  });
});
