import swagger from './swagger.json';
import signup from './auth/signup.json';
import createAccommodation from './accommodation/createAccommodation.json';
import getAccommodations from './accommodation/getAccommodations.json';
import getAccommodationById from './accommodation/getAccommodationById.json';
import createRoom from './accommodation/createRoom.json';
// import getRooms from './accommodation/getRooms.json';
import getAllRooms from './accommodation/getAllRooms.json';
import updateRoom from './accommodation/updateRoom.json';
import rateAccommodation from './accommodation/rateAccommodation.json';
import addedFeedback from './accommodation/addedFeedback.json';
import getFeedback from './accommodation/getFeedback.json';
import likeOrUnlike from './accommodation/likeOrUnlike.json';

swagger.paths['/auth/signup'] = signup;
swagger.paths['/accommodation/'] = createAccommodation;
swagger.paths['/accommodation/'] = getAccommodations;
swagger.paths['/accommodation/{id}'] = getAccommodationById;
swagger.paths['/accommodation/createroom'] = createRoom;
// swagger.paths['/accommodation/getrooms?accommodationid'] = getRooms;
swagger.paths['/accommodation/getallrooms'] = getAllRooms;
swagger.paths['/accommodation/rooms/{id}'] = updateRoom;
swagger.paths['/accommodation/{id}/ratings'] = rateAccommodation;
swagger.paths['/accommodation/{id}/feedback'] = addedFeedback;
swagger.paths['/accommodation/{id}/feedback'] = getFeedback;
swagger.paths['/accommodation/{id}/like'] = likeOrUnlike;

export default swagger;
