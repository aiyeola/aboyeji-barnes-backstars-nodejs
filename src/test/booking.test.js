import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;
const { expect } = chai;

chai.use(chaiHttp);

let token;
let managerToken;
let requestId;
let requestId2;

const signInURL = '/api/v1/auth/signin';
const booking = '/api/v1/booking/';
const oneWay = '/api/v1/requests/one-way';
const multiCity = '/api/v1/requests/multi-city';
const cancelBooking = '/api/v1/booking/cancel/';

const book = {
  booking: [
    {
      room: 1,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const notAccommodation = {
  booking: [
    {
      accommodation: 'Rental',
      room: 1,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const bookedAccommodation = {
  booking: [
    {
      accommodation: 'mariot',
      room: 1,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const newAccommodation = {
  booking: [
    {
      accommodation: 'hotel',
      room: 1,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const wrongRoom = {
  booking: [
    {
      room: 2,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const notRoom = {
  booking: [
    {
      room: 200,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const bookedRoom = {
  booking: [
    {
      room: 3,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const wrongCheckIn = {
  booking: [
    {
      room: 1,
      checkIn: '2030-02-13',
      checkOut: '2030-09-12'
    }
  ]
};
const wrongBooking = {
  booking: 'booking'
};
const wrongRoomValue = {
  booking: [
    {
      room: 'redis',
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const wrongAccommodationValue = {
  booking: [
    {
      accommodation: 6,
      room: 1,
      checkIn: '2030-09-12',
      checkOut: '2030-09-13'
    }
  ]
};
const wrongCheckInValue = {
  booking: [
    {
      room: 1,
      checkIn: '2030',
      checkOut: '2030-09-12'
    }
  ]
};
const wrongCheckoutValue = {
  booking: [
    {
      room: 1,
      checkIn: '2030-09-12',
      checkOut: '2030'
    }
  ]
};
const alreadyBooked = {
  booking: [
    {
      room: 1,
      checkIn: '2030-08-12',
      checkOut: '2030-09-12'
    },
    {
      room: 2,
      checkIn: '2030-10-13',
      checkOut: '2030-11-12'
    }
  ]
};
const alreadyBooked2 = {
  booking: [
    {
      room: 1,
      checkIn: '2030-08-11',
      checkOut: '2030-08-22'
    },
    {
      room: 2,
      checkIn: '2030-10-13',
      checkOut: '2030-11-12'
    }
  ]
};
const book2 = {
  booking: [
    {
      room: 4,
      checkIn: '2030-08-11',
      checkOut: '2030-09-12'
    },
    {
      room: 2,
      checkIn: '2030-10-13',
      checkOut: '2030-11-12'
    }
  ]
};

describe.skip('Room Booking test', () => {
  before('Log In normal users and manager correct credentials', async () => {
    const user = {
      userEmail: 'danieldoe@gmail.com',
      userPassword: 'Root1123#'
    };
    const manager = {
      userEmail: 'marveldev53@gmail.com',
      userPassword: 'Root1123#'
    };
    const userRes = await chai.request(server).post(signInURL).send(user);
    token = userRes.body.data.userToken;

    const managerResponse = await chai
      .request(server)
      .post(signInURL)
      .send(manager);
    managerToken = managerResponse.body.data.userToken;
  });
  before('create a travel request', async () => {
    const request = {
      from: 'Rainbow, Rwanda',
      to: [
        {
          travelDate: '2030-08-12',
          location: 2,
          accommodation: 'sheraton'
        }
      ],
      reason:
        'travelling cause the company allows us to, i mean the company finances everything',
      passportNumber: '121HU3H3U32',
      passportName: 'Robben Bahati',
      gender: 'MALE'
    };
    const res = await chai
      .request(server)
      .post(oneWay)
      .set('Authorization', `Bearer ${token}`)
      .send(request);

    requestId = res.body.data.id;
  });
  it('should not book a request not yet approved', async () => {
    const res = await chai
      .request(server)
      .post(`${booking}${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(book);
    expect(res.status).to.equal(400);
  });
  it('should not book for a request does not exist', async () => {
    const res = await chai
      .request(server)
      .post(`${booking}1000`)
      .set('Authorization', `Bearer ${token}`)
      .send(book);
    expect(res.status).to.equal(404);
  });
  it('should not book for a request you do not own', async () => {
    const res = await chai
      .request(server)
      .post(`${booking}${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send(book);
    expect(res.status).to.equal(403);
  });

  describe('Booking After Approving', () => {
    before('Approve Request', async () => {
      const res = await chai
        .request(server)
        .patch(`/api/v1/requests/approve/${requestId}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .send({
          reason:
            'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
        });
      // expect(res.status).to.equal(200);
    });
    it('should not book a request accommodation does not exist', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(notAccommodation);
      expect(res.status).to.eq(404);
    });
    it('should not book a request accommodation which is unavailable', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(bookedAccommodation);
      expect(res.status).to.equal(400);
    });
    it('should not book a request when new accommodation is not in same location', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newAccommodation);
      expect(res.status).to.equal(404);
    });
    it('should not book a request when room is not in Accommodation', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongRoom);
      expect(res.status).to.equal(404);
    });
    it('should not book a request when room does not exist', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(notRoom);
      expect(res.status).to.equal(404);
    });
    it('should not book a request when room does not exist', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(bookedRoom);
      expect(res.status).to.equal(409);
    });
    it('should not book a request when check in date is before travel date', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongCheckIn);
      expect(res.status).to.eq(400);
    });
  });

  let bookingId;
  describe('Allow Booking', () => {
    it('should not book a room with wrong values', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongBooking);
      expect(res.status).to.equal(422);
    });
    it('should not book a room with wrong room value', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongRoomValue);
      expect(res.status).to.equal(422);
    });
    it('should not book a room with wrong accommodation value', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongAccommodationValue);
      expect(res.status).to.equal(422);
    });
    it('should not book a room with wrong check in value', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongCheckInValue);
      expect(res.status).to.equal(422);
    });
    it('should not book a room with wrong checkout value', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongCheckoutValue);
      expect(res.status).to.equal(422);
    });
    it('should book a room', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(book);
      expect(res.status).to.equal(200);
      bookingId = res.body.data.id;
    });
    it('should not book a room twice', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(book);
      expect(res.status).to.equal(409);
    });
  });

  describe('Book Another Request', () => {
    before('create a travel request', async () => {
      const multi = {
        from: 'Wesley, Rwanda',
        to: [
          {
            travelDate: '2030-08-10',
            location: 2,
            accommodation: 'sheraton'
          },
          {
            travelDate: '2030-10-12',
            location: 1,
            accommodation: 'hotel'
          }
        ],
        returnDate: '2040-12-02',
        reason:
          'iam travelling cause the company allows us to, i mean the company finances everything',
        passportNumber: '121HU3H3U32',
        passportName: 'Robben Bahati',
        gender: 'MALE'
      };
      const res = await chai
        .request(server)
        .post(multiCity)
        .set('Authorization', `Bearer ${token}`)
        .send(multi);
      requestId2 = res.body.data.id;
      const res2 = await chai
        .request(server)
        .patch(`/api/v1/requests/approve/${requestId2}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .send({
          reason:
            'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
        });
      // expect(res2.status).to.equal(200);
    });
    it('should not book a request when some accommodations are not booked', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(book);
      expect(res.status).to.equal(400);
    });
    it('should not book a request when room is booked in that period', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(alreadyBooked);
      expect(res.status).to.equal(409);
    });
    it('should not book a request when room is booked in that period', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(alreadyBooked2);
      expect(res.status).to.equal(409);
    });
    it('should book a room ', async () => {
      const res = await chai
        .request(server)
        .post(`${booking}${requestId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(book2);
      expect(res.status).to.equal(200);
    });
  });

  describe('Cancel Booking', () => {
    it('should not cancel booking', async () => {
      const res = await chai
        .request(server)
        .post(`${cancelBooking}${requestId}`)
        .set('Authorization', `Bearer ${managerToken}`);
      expect(res.status).to.equal(403);
    });
    it('should not cancel booking does not exist', async () => {
      const res = await chai
        .request(server)
        .post(`${cancelBooking}200`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(404);
    });
    it('should cancel booking ', async () => {
      const res = await chai
        .request(server)
        .post(`${cancelBooking}${requestId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
    });
  });
});
