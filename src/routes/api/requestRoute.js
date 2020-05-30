import express from 'express';
import Requests from '../../controllers/requestController';
import Comments from '../../controllers/commentController';
import RequestValidation from '../../validation/requestValidation';
import CommentValidation from '../../validation/commentValidation';
import profileAutofill from '../../middlewares/getProfileInfo';
import tripValues from '../../middlewares/tripValues';
import Access from '../../middlewares/userRoles';
import verify from '../../middlewares/auth';
import method from '../../utils/method';

const router = express.Router();

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

router
  .route('/:id/comments')
  .post(
    verify,
    CommentValidation.addComment,
    Access.isOwnerOrManager,
    Comments.addComment
  );

router
  .route('/:id/comments')
  .get(
    verify,
    CommentValidation.getComments,
    Access.isOwnerOrManager,
    Comments.getCommentsByRequests
  );

router
  .route('/comments/:id')
  .put(
    verify,
    CommentValidation.updateComment,
    Access.isOwnerOrManager,
    Comments.updateComment
  );

router
  .route('/comments/:id')
  .delete(
    verify,
    CommentValidation.deleteComment,
    Access.isOwnerOrManager,
    Comments.deleteComment
  );

export default router;
