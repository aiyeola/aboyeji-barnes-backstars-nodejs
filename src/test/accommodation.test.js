/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable no-else-return */
import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import { response } from 'express';

const server = index.app;
const { expect } = chai;

chai.use(chaiHttp);

const accommodationsURL = '/api/v1/accommodations/';
const createRoomURL = '/api/v1/accommodations/createroom';
const getRoomsURL = '/api/v1/accommodations/getrooms?accommodationid=';
const getAllRoomsURL = '/api/v1/accommodations/getallrooms';
const updateRoomURL = '/api/v1/accommodations/rooms/';

describe('/POST Accommodation', () => {
  const data = {
    name: 'Hotel b',
    status: 'Available',
    imageUrl: [
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765143/apl2muykitqk5kf6pnjg.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574961322/xr4b5emlpudqh1l9yrpa.jpg'
    ],
    locationId: 1,
    owner: 9,
    amenities: ['Gyn', 'Sauna', 'Steam bath', 'Spa', 'Free Wifi'],
    services: [
      'Free breakfast',
      'Room Delivery',
      'Free parking',
      'Snart Rooms'
    ],
    mapLocations: { lat: -1.9705786, lng: 30.10442880000005 },
    description:
      'The space will be entirely yours.There is a gateman at the place 24 hours and you can go in and out at any point. You do not share facilities with anyone.'
  };
  const wrongData = {
    name: 'Hotel b',
    status: 'Disvailable',
    imageUrl: [
      'https://res.cloudinary.com/dkabisw/image/upload/v1574961322/xr4b5emlpudqh1l9yrpa.jpg'
    ],
    locationId: '1',
    owner: 9,
    amenities: ['Gyn', 'Sauna', 'Steam bath', 'Spa', 'Free Wifi'],
    services: ['Free breakfast', 'Snart Rooms'],
    mapLocations: { lat: -1.9705786, lng: 30.10442880000005 },
    description: 'The space will be entirely yours.'
  };
  it('with valid properties', (done) => {
    chai
      .request(server)
      .post(accommodationsURL)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql('Accommodation has been created successfully');
        done();
      });
  });
  it('with wrong properties', (done) => {
    chai
      .request(server)
      .post(accommodationsURL)
      .send(wrongData)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});

describe('/GET Accommodations', () => {
  it('it should get all the accommodations', (done) => {
    chai
      .request(server)
      .get(accommodationsURL)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql('Getting all accommodations');
        done();
      });
  });
});

describe('/GET Accommodations by ID', () => {
  const id = 1;
  const wrongId = 'ID';
  it('with valid ID', (done) => {
    chai
      .request(server)
      .get(accommodationsURL + id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql(`Accommodation ${id} details`);
        done();
      });
  });

  it.skip('with wrong ID', (done) => {
    chai
      .request(server)
      .get(accommodationsURL + wrongId)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});

describe('/POST Room', () => {
  const data = {
    name: 'A102',
    type: 'Single',
    accommodationId: '13',
    status: false,
    price: 10000.0
  };
  it('with valid properties', (done) => {
    chai
      .request(server)
      .post(createRoomURL)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql('Room has been created successfully');
        done();
      });
  });
});

describe('/PATCH Room', () => {
  const data = {
    name: 'A102',
    type: 'Single',
    accommodationId: '13',
    status: false,
    price: 10000.0
  };
  it('with valid properties', (done) => {
    const id = 1;
    chai
      .request(server)
      .patch(updateRoomURL + id)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql('Room has been updated successfully');
        done();
      });
  });
});

describe('/GET All rooms', () => {
  it('it should get all the rooms', (done) => {
    chai
      .request(server)
      .get(getAllRoomsURL)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql('Rooms for all accommodations');
        done();
      });
  });
});

describe('/GET All rooms for an accommodationid', () => {
  const accommodationId = 1;
  const wrongAccommodationId = 'id';
  it('with correct query parameters', (done) => {
    chai
      .request(server)
      .get(getRoomsURL + accommodationId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql(`Rooms for accommodation with the id ${accommodationId}`);
        done();
      });
  });
  it.skip('with wrong query parameters', (done) => {
    chai
      .request(server)
      .get(getRoomsURL + wrongAccommodationId)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});

describe('/POST Rate accommodation', () => {
  const id = 1;
  const data = {
    userId: 4,
    rating: 6
  };
  it('with valid properties', (done) => {
    chai
      .request(server)
      .post(`${accommodationsURL}${id}/ratings`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql(`Accommodation ${id} has been rated successfully`);
        done();
      });
  });
});

describe('/POST Feedback on an accommodation', () => {
  const id = 1;
  const data = {
    userId: 1,
    feedback: 'This is a feedback'
  };
  it('with valid properties', (done) => {
    chai
      .request(server)
      .post(`${accommodationsURL}${id}/feedback`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql(
            `Feedback for Accommodation ${id} has been created successfully`
          );
        done();
      });
  });
});

describe('/GET Feedback on an accommodation', () => {
  const id = 1;

  it('feedback on accommodation', (done) => {
    chai
      .request(server)
      .get(`${accommodationsURL}${id}/feedback`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql(`Feedback on accommodation ${id}`);
        done();
      });
  });
});

describe('/PATCH Like/unlike an accommodation', () => {
  const id = 1;
  const data = {
    userId: 1
  };
  it('with valid properties', (done) => {
    chai
      .request(server)
      .patch(`${accommodationsURL}${id}/like`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .eql(`Accommodation ${id} liked successfully`);
        done();
      });
  });
});

// describe('/POST accommodation', () => {
//   it('with valid properties', async () => {
//     const res = await chai
//       .request(server)
//       .post(accommodationsURL)
//       .send(accommodationData);
//     expect(res.body.message).to.eq(
//       'Accommodation has been created successfully'
//     );
//     expect(res.status).to.equal(200);
//   });
// });

// describe('Get all accommodations2', () => {
//   it('with valid properties ', async () => {
//     const res = await chai.request(server).get(accommodationsURL);
//     expect(res.body.message).to.eq('Getting all accommodations');
//     expect(res.status).to.equal(200);
//   });
// });
