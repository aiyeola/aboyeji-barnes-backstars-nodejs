/* eslint-disable operator-linebreak */
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
const getRoomsURL = '/api/v1/accommodations/getrooms';
const getAllRoomsURL = '/api/v1/accommodations/getallrooms';
const updateRoomURL = '/api/v1/accommodations/rooms/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwidXNlckVtYWlsIjoiamFuZWRvZUBnbWFpbC5jb20iLCJ1c2VyUm9sZXMiOiJUcmF2ZWwgQWRtaW5pc3RyYXRvciIsImFjY291bnRWZXJpZmllZCI6dHJ1ZSwiZW1haWxBbGxvd2VkIjp0cnVlLCJpYXQiOjE1ODkxMzg5ODIsImV4cCI6MTU4OTIyNTM4Mn0.t3VYf-PHSBrnQFogn671VyxFAo1YKJFbKUqFDjymYFE';

const id = 1;
const wrongId = 'ID';
const accommodationData = {
  name: 'Hotel b',
  status: 'Available',
  imageUrl: [
    'https://res.cloudinary.com/dkabisw/image/upload/v1574961322/xr4b5emlpudqh1l9yrpa.jpg'
  ],
  locationId: 1,
  owner: 9,
  amenities: ['Gyn', 'Sauna', 'Steam bath', 'Spa', 'Free Wifi'],
  services: ['Free parking', 'Snart Rooms'],
  mapLocations: { lat: -1.9705786, lng: 30.10442880000005 },
  description: 'This is a description'
};
const wrongAccommodationData = {
  name: 'Hotel b',
  status: 'Disvailable',
  imageUrl: { lat: -1.9705786, lng: 30.10442880000005 },
  locationId: '1',
  owner: 9,
  amenities: ['Gyn', 'Sauna', 'Steam bath', 'Spa', 'Free Wifi'],
  services: ['Free breakfast', 'Snart Rooms'],
  mapLocations: [
    'https://res.cloudinary.com/dkabisw/image/upload/v1574961322/xr4b5emlpudqh1l9yrpa.jpg'
  ],
  description: true
};
const roomData = {
  name: 'A102',
  type: 'Single',
  accommodationId: '13',
  status: false,
  price: 10000.0
};
const wrongRoomData = {
  name: 'A102',
  type: ['Single', 'Complex'],
  accommodationId: false,
  status: 1,
  price: '10000.0'
};
const ratingData = {
  userId: 4,
  rating: 6
};

const wrongRatingData = {
  userId: 'Ok',
  rating: ['Hi', 'Hello']
};
const feedbackData = {
  userId: 1,
  feedback: 'This is a feedback'
};
const wrongFeedbackData = {
  userId: 1,
  feedback: 'This is a feedback'
};
const likeData = { userId: 1 };
const wrongLikeData = { userId: true };

describe.skip('/POST Create accommodation', () => {
  it('with valid properties and token', async () => {
    const res = await chai
      .request(server)
      .post(accommodationsURL)
      .set('Authorization', `Bearer ${token}`)
      .send(accommodationData);
    expect(res.body.message).to.equal(
      'Accommodation has been created successfully'
    );
    expect(res.status).to.equal(201);
  });

  it('with invalid properties and token', async () => {
    const res = await chai
      .request(server)
      .post(accommodationsURL)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongAccommodationData);
    expect(res.status).to.equal(422);
  });

  it('with valid properties and no/expired/wrong token', async () => {
    const res = await chai
      .request(server)
      .post(accommodationsURL)
      .send(accommodationData);
    expect(res.body.message).to.equal('Invalid or expired token');
    expect(res.status).to.equal(401);
  });

  it('with invalid properties and no/expired/wrong token', async () => {
    const res = await chai
      .request(server)
      .post(accommodationsURL)
      .send(wrongAccommodationData);
    expect(res.body.message).to.equal('Invalid or expired token');
    expect(res.status).to.equal(401);
  });
});

describe.skip('/GET Get all accommodations', () => {
  it('it should get all the accommodations', async () => {
    const res = await chai.request(server).get(accommodationsURL);
    expect(res.body.message).to.equal('Getting all accommodations');
    expect(res.status).to.equal(200);
  });
});

describe.skip('/GET Get accommodations by ID', () => {
  it('with valid accommodation ID', async () => {
    const res = await chai.request(server).get(accommodationsURL + id);
    expect(res.body.message).to.equal('Getting single accommodation details');
    expect(res.status).to.equal(200);
  });

  it('with invalid accommodation ID', async () => {
    const res = await chai.request(server).get(accommodationsURL + wrongId);
    expect(res.status).to.equal(500);
  });
});

describe.skip('/POST Create Room', () => {
  it('with valid properties and token', async () => {
    const res = await chai
      .request(server)
      .post(createRoomURL)
      .set('Authorization', `Bearer ${token}`)
      .send(roomData);
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('Room has been created successfully');
  });

  it('with valid properties and no/expired/wrong token', async () => {
    const res = await chai.request(server).post(createRoomURL).send(roomData);
    expect(res.body.message).to.equal('Invalid or expired token');
    expect(res.status).to.equal(401);
  });

  it('with invalid properties and token', async () => {
    const res = await chai
      .request(server)
      .post(createRoomURL)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongRoomData);
    expect(res.status).to.equal(422);
  });

  it('with invalid properties and no/expired/wrong token', async () => {
    const res = await chai
      .request(server)
      .post(createRoomURL)
      .send(wrongRoomData);
    expect(res.body.message).to.equal('Invalid or expired token');
    expect(res.status).to.equal(401);
  });
});

describe.skip('/PATCH Update a Room', () => {
  it('with valid properties and valid token and valid room ID', async () => {
    const res = await chai
      .request(server)
      .patch(updateRoomURL + id)
      .set('Authorization', `Bearer ${token}`)
      .send(roomData);
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('Room has been updated successfully');
  });

  it('with valid properties and valid token and invalid room ID', async () => {
    const res = await chai
      .request(server)
      .patch(updateRoomURL + wrongId)
      .set('Authorization', `Bearer ${token}`)
      .send(roomData);
    expect(res.status).to.equal(500);
  });

  it('with valid properties and no/expired/wrong token and valid room ID', async () => {
    const res = await chai
      .request(server)
      .patch(updateRoomURL + id)
      .send(roomData);
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid or expired token');
  });

  it('with valid properties and no/expired/wrong token and invalid room ID', async () => {
    const res = await chai
      .request(server)
      .patch(updateRoomURL + wrongId)
      .send(roomData);
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid or expired token');
  });

  it('with invalid properties and token and valid room ID', async () => {
    const res = await chai
      .request(server)
      .patch(updateRoomURL + id)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongRoomData);
    expect(res.status).to.equal(422);
  });

  it('with invalid properties and token and invalid room ID', async () => {
    const res = await chai
      .request(server)
      .patch(updateRoomURL + wrongId)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongRoomData);
    expect(res.status).to.equal(422);
  });

  it('with invalid properties and no/expired/wrong token and valid room ID', async () => {
    const res = await chai
      .request(server)
      .patch(updateRoomURL + id)
      .send(wrongRoomData);
    expect(res.body.message).to.equal('Invalid or expired token');
    expect(res.status).to.equal(401);
  });

  it('with invalid properties and no/expired/wrong token and invalid room ID', async () => {
    const res = await chai
      .request(server)
      .patch(updateRoomURL + wrongId)
      .send(wrongRoomData);
    expect(res.body.message).to.equal('Invalid or expired token');
    expect(res.status).to.equal(401);
  });
});

describe.skip('/GET All rooms', () => {
  it('it should get all the rooms, includes valid token', async () => {
    const res = await chai
      .request(server)
      .get(getAllRoomsURL)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.message).to.equal('Rooms for all accommodations');
    expect(res.status).to.equal(200);
  });

  it('it should get all the rooms, includes no/expired/wrong token', async () => {
    const res = await chai.request(server).get(getAllRoomsURL);
    expect(res.body.message).to.equal('Invalid or expired token');
    expect(res.status).to.equal(401);
  });
});

describe.skip('/GET All rooms for an accommodation ID', () => {
  it('with valid accommodation ID and valid token', async () => {
    const res = await chai
      .request(server)
      .get(`${getRoomsURL}?accommodationid=${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.message).to.equal('Rooms for single accommodation');
    expect(res.status).to.equal(200);
  });

  it('with valid accommodation ID and no/invalid/wrong token', async () => {
    const res = await chai
      .request(server)
      .get(`${getRoomsURL}?accommodationid=${id}`);
    expect(res.body.message).to.equal('Invalid or expired token');
    expect(res.status).to.equal(401);
  });

  it('with invalid accommodation ID and valid token', async () => {
    const res = await chai
      .request(server)
      .get(`${getRoomsURL}?accommodationid=${wrongId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).should.have.property('status');
  });
  it('with invalid accommodation ID and no/invalid/wrong token', async () => {
    const res = await chai
      .request(server)
      .get(`${getRoomsURL}?accommodationid=${wrongId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res).should.have.property('status');
  });
});

describe.skip('/POST Rate an accommodation', () => {
  it('with valid properties and valid accommodation ID and token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${id}/ratings`)
      .set('Authorization', `Bearer ${token}`)
      .send(ratingData);
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal(
      'Accommodation has been rated successfully'
    );
  });

  it('with valid properties and valid accommodation ID and no/expired/wrong token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${id}/ratings`)
      .send(roomData);

    expect(res.status).to.equal(401);
  });

  it('with valid properties and invalid accommodation ID and valid token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${wrongId}/ratings`)
      .set('Authorization', `Bearer ${token}`)
      .send(ratingData);
    expect(res.status).to.equal(500);
  });

  it('with valid properties and invalid accommodation ID and no/expired/wrong token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${wrongId}/ratings`)
      .send(ratingData);
    expect(res.status).to.equal(401);
    res.body.should.have.property('message');
  });

  it('with invalid properties and valid accommodation ID and token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${id}/ratings`)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongRatingData);
    expect(res.status).to.equal(422);
  });

  it('with invalid properties and valid accommodation ID and no/expired/wrong token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${id}/ratings`)
      .send(wrongRatingData);
    expect(res.body.message).to.equal('Invalid or expired token');
    expect(res.status).to.equal(401);
  });

  it('with invalid properties and invalid accommodation ID and token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${wrongId}/ratings`)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongRatingData);
    expect(res.status).to.equal(422);
  });

  it('with invalid properties and invalid accommodation ID and no/expire token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${wrongId}/ratings`)
      .send(wrongRatingData);
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid or expired token');
  });
});

describe.skip('/POST Add feedback on an accommodation', () => {
  it('with valid properties and valid accommodation ID and token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${id}/feedback`)
      .set('Authorization', `Bearer ${token}`)
      .send(feedbackData);
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal(
      'Accommodation feedback has been created successfully'
    );
  });

  it('with valid properties and valid accommodation ID and no/expired/wrong token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${id}/feedback`)
      .send(feedbackData);

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid or expired token');
  });
  it('with invalid properties and valid accommodation ID and valid token', async () => {
    const res = await chai
      .request(server)
      .post(`${accommodationsURL}${id}/feedback`)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongFeedbackData);
    expect(res.status).to.equal(422);
  });
});

describe.skip('/GET Get all feedback on an accommodation', () => {
  it('feedback on accommodation', async () => {
    const res = await chai
      .request(server)
      .get(`${accommodationsURL}${id}/feedback`);
    expect(res.body.message).to.equal(`Feedback on accommodation ${id}`);
    expect(res.status).to.equal(200);
  });
});

describe.skip('/PATCH Like/unlike an accommodation', () => {
  it('with valid properties and valid token', async () => {
    const res = await chai
      .request(server)
      .patch(`${accommodationsURL}${id}/like`)
      .set('Authorization', `Bearer ${token}`)
      .send(likeData);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Accommodation liked successfully');
  });
  it('with invalid properties and valid token', async () => {
    const res = await chai
      .request(server)
      .patch(`${accommodationsURL}${id}/like`)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongLikeData);
    expect(res.status).to.equal(422);
  });
});
