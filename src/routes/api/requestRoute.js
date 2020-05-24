import express from 'express';
import Requests from '../../controllers/requestController';
import RequestValidation from '../../validation/requestValidation';
import verify from '../../middlewares/auth';
import Access from '../../middlewares/userRoles';
import method from '../../utils/method';
import profileAutofill from '../../middlewares/getProfileInfo';
import tripValues from '../../middlewares/tripValues';
// import Emitter from '../../utils/eventEmitter';

const router = express.Router();
// router.get('/emit', (req, res) => {
//   const dataValues = {
//     name: 'victor'
//   };
//   // event listener
//   Emitter.on('connect', (dataValues) => console.log('event fired', dataValues));

//   // Init event
//   Emitter.emit('connect', dataValues);

//   res.end();
// });

router.route('/my-requests').get(verify, Requests.getMyRequests).all(method);

router
  .route('/pending')
  .get(verify, Access.managerRole, Requests.getPendingApprovals)
  .all(method);

router
  .route('/:id')
  .get(
    verify,
    RequestValidation.validateGetRequest,
    Access.isOwnerOrManager,
    Requests.getRequest
  );

router
  .route('/approve/:requestId')
  .patch(
    verify,
    RequestValidation.requestApproval,
    Access.managerRole,
    Requests.acceptRequest
  )
  .all(method);

router
  .route('/reject/:requestId')
  .patch(
    verify,
    RequestValidation.requestApproval,
    Access.managerRole,
    Requests.rejectRequest
  )
  .all(method);

router
  .route('/:id')
  .put(
    verify,
    Access.isOwner,
    RequestValidation.validateEditRequest,
    tripValues.isValidLocation,
    tripValues.isValidAccommodation,
    tripValues.isValidDates,
    Requests.EditRequest
  );

router.route('/:id').delete(verify, Access.isOwner, Requests.deleteRequest);

router
  .route('/one-way')
  .post(
    verify,
    profileAutofill,
    RequestValidation.oneWay,
    tripValues.isValidLocation,
    tripValues.isValidAccommodation,
    tripValues.isValidDates,
    Requests.trip
  )
  .all(method);

router
  .route('/return-trip')
  .post(
    verify,
    profileAutofill,
    RequestValidation.returnTrip,
    tripValues.isValidLocation,
    tripValues.isValidAccommodation,
    tripValues.isValidDates,
    Requests.trip
  )
  .all(method);

router
  .route('/multi-city')
  .post(
    verify,
    profileAutofill,
    RequestValidation.multiCity,
    tripValues.isValidLocation,
    tripValues.isValidDates,
    tripValues.isValidAccommodation,
    Requests.trip
  )
  .all(method);

router
  .route('/trip-stats')
  .post(verify, RequestValidation.statistics, Requests.statistics)
  .all(method);

export default router;
