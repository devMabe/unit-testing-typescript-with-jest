import { Reservation } from '../../app/server_app/model/ReservationModel';

expect.extend({
  toBeValidReservation(reservation: Reservation) {
    const validId = reservation.id.length > 5 ? true : false;
    const validUser = reservation.user.length > 5 ? true : false;

    return {
      pass: validId && validUser,
      message: () => 'expected reservation to have valid id and user',
    };
  },
  toHaveUser(reservation: Reservation, user: string) {
    const hasRigthUser = reservation.user === user;
    return {
      pass: hasRigthUser,
      message: () =>
        `expected reservation to have user ${user}, recieved ${reservation.user}`,
    };
  },
});

interface CustomMatchers<R> {
  toBeValidReservation(): R;
  toHaveUser(user: string): R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}

const someReservation: Reservation = {
  id: '123456',
  user: 'someUser',
  room: 'someRoom',
  startDate: 'someStartDate',
  endDate: 'someEndDate',
};

describe('Custom Matchers', () => {
  it('check for valid reservations', () => {
    expect(someReservation).toBeValidReservation();
  });

  it('check for valid user', () => {
    expect(someReservation).toHaveUser('someUser');
  });
});
