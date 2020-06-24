import swagger from './swagger.json';

import signup from './auth/signup.json';
import signin from './auth/signin.json';
import signout from './auth/signout.json';
import verify from './auth/verify.json';
import google from './auth/google.json';
import facebook from './auth/facebook.json';
import link from './auth/link.json';
import password from './auth/password.json';
import resetPassword from './auth/resetPassword.json';
import role from './auth/role.json';
import emailPref from './auth/emailPref.json';
import supplier from './auth/supplier.json';
import autofill from './auth/autofill.json';
import unsubscribe from './auth/unsubscribe.json';
import profile from './userProfile/profile.json';
import picture from './userProfile/picture.json';
// Accommodation
import createAccommodation from './accommodation/createAccommodation.json';
import getAccommodations from './accommodation/getAccommodations.json';
import getAccommodationById from './accommodation/getAccommodationById.json';
import createRoom from './accommodation/createRoom.json';
import getRooms from './accommodation/getRooms.json';
import getAllRooms from './accommodation/getAllRooms.json';
import updateRoom from './accommodation/updateRoom.json';
import rateAccommodation from './accommodation/rateAccommodation.json';
import addedFeedback from './accommodation/addedFeedback.json';
import getFeedback from './accommodation/getFeedback.json';
import likeOrUnlike from './accommodation/likeOrUnlike.json';
// Locations
import locations from './location/index.json';
// Booking
import booking from './booking/index.json';
import cancelBooking from './booking/cancelBooking.json';
// Requests
import myRequests from './requests/getMyRequest.json';
import pendingRequests from './requests/pendingRequest.json';
import getRequests from './requests/getRequests.json';

// User
swagger.paths['/auth/signup'] = signup;
swagger.paths['/auth/signin'] = signin;
swagger.paths['/auth/signout'] = signout;
swagger.paths['/auth/google'] = google;
swagger.paths['/auth/facebook'] = facebook;
swagger.paths['/auth/create-link'] = link;
swagger.paths['/auth/verify/?token={token}'] = verify;
swagger.paths['/auth/forgot-password'] = password;
swagger.paths['/auth/reset-password/:userId/:token'] = resetPassword;
swagger.paths['/auth/update-role'] = role;
swagger.paths['/auth/add-user'] = supplier;
swagger.paths['/auth/autofill-preference'] = autofill;
swagger.paths['/auth/email-preferences'] = emailPref;
swagger.paths['/auth/unsubscribe'] = unsubscribe;

// User Profile
swagger.paths['/profile'] = profile;
swagger.paths['/profile/picture'] = picture;

// Accommodation
swagger.paths['/accommodation/'] = createAccommodation;
swagger.paths['/accommodation/'] = getAccommodations;
swagger.paths['/accommodation/{id}'] = getAccommodationById;
swagger.paths['/accommodation/createroom'] = createRoom;
swagger.paths[
  '/accommodation/getrooms?accommodationid={accommodationid}'
] = getRooms;
swagger.paths['/accommodation/getallrooms'] = getAllRooms;
swagger.paths['/accommodation/rooms/{id}'] = updateRoom;
swagger.paths['/accommodation/{id}/ratings'] = rateAccommodation;
swagger.paths['/accommodation/{id}/feedback'] = addedFeedback;
swagger.paths['/accommodation/{id}/feedback'] = getFeedback;
swagger.paths['/accommodation/{id}/like'] = likeOrUnlike;

// Locations
swagger.paths['/locations'] = locations;

// Booking
swagger.paths['/booking/:id'] = booking;
swagger.paths['/booking/cancel/:id'] = cancelBooking;

// Requests
swagger.paths['/requests/my-requests'] = myRequests;
swagger.paths['/requests/pending'] = pendingRequests;
swagger.paths['/requests/:id'] = getRequests;

export default swagger;
