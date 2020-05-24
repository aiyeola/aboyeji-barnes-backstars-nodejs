/* eslint-disable operator-linebreak */
import RequestService from '../services/requestService';
import Response from '../utils/response';
import UserService from '../services/userService';
import Email from '../utils/mails/email';
import ApprovalEmail from '../utils/mails/approval.email';
// import UpdateEmail from '../utils/mails/update.email';
// import Emitter from '../utils/eventEmitters/emitter';
// import moment from 'moment';
// import { Op } from 'sequelize';

/** Class that handles requests */
class RequestController {
  /**
   *  Gets all users request
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async getMyRequests(req, res, next) {
    try {
      const data = await RequestService.findRequests({ userId: req.user.id });
      return Response.customResponse(
        res,
        200,
        'Your requests was retrieved successfully',
        data
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  Gets a users request
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async getRequest(req, res, next) {
    try {
      const data = await RequestService.findRequests({ id: req.params.id });
      if (!data[0]) {
        return Response.notFoundError(res, 'Request is not found');
      }
      return Response.customResponse(
        res,
        200,
        'Request found successfully',
        data
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  Manager approves a users request
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async acceptRequest(req, res, next) {
    try {
      const {
        body: { reason },
        params: { requestId }
      } = req;
      const manager = req.user;
      const request = await RequestService.findRequest({
        id: requestId
      });
      if (!request) {
        return Response.notFoundError(res, 404, 'Request not found');
      }
      if (request.status === 'Approved') {
        return Response.conflictError(res, 'Request already approved');
      }
      if (request.status === 'Rejected') {
        return Response.conflictError(res, 'Request already rejected');
      }
      const requesterId = request.userId;
      const requester = await UserService.findUser({ id: requesterId });
      if (requester.emailAllowed) {
        const unsubscribeUrl = Email.unsubscribeUrl({
          userEmail: requester.userEmail
        });
        await RequestService.approveOrRejectRequest(requestId, 'Approved');
        const header = Email.header({
          from: manager.userEmail,
          to: requester.userEmail,
          subject: 'Request approved'
        });
        const msg = ApprovalEmail.rejectAcceptRequestTemplate(
          reason,
          requester,
          unsubscribeUrl
        );
        await Email.sendMail(res, header, msg);
      }
      return Response.customResponse(
        res,
        200,
        'Request approved successfully',
        { requestId }
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  Manager rejects a users request
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async rejectRequest(req, res, next) {
    try {
      const {
        body: { reason },
        params: { requestId }
      } = req;
      const manager = req.user;
      const request = await RequestService.findRequest({
        id: requestId
      });
      if (!request) {
        return Response.notFoundError(res, 404, 'Request not found');
      }
      if (request.status === 'Approved') {
        return Response.conflictError(res, 'Request already approved');
      }
      if (request.status === 'Rejected') {
        return Response.conflictError(res, 'Request already rejected');
      }
      const requesterId = request.userId;
      const requester = await UserService.findUser({ id: requesterId });
      if (requester.emailAllowed) {
        const unsubscribeUrl = Email.unsubscribeUrl({
          userEmail: requester.userEmail
        });
        await RequestService.approveOrRejectRequest(requestId, 'Rejected');
        const header = Email.header({
          from: manager.userEmail,
          to: requester.userEmail,
          subject: 'Request rejected'
        });
        const msg = ApprovalEmail.rejectAcceptRequestTemplate(
          reason,
          requester,
          unsubscribeUrl
        );
        await Email.sendMail(res, header, msg);
      }
      return Response.customResponse(
        res,
        200,
        'Request rejected successfully',
        { requestId }
      );
    } catch (error) {
      return next(error);
    }
  }

  /** deletes a users request
   * @param {object} req request
   * @param {object} res response
   * @param {object} next response
   * @return {function} requests
   */
  static async deleteRequest(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await RequestService.deleteRequest(id);
      if (!deleted) throw Error('Could not delete the request');
      return Response.customResponse(
        res,
        200,
        'The request has been deleted successfully',
        deleted
      );
    } catch (error) {
      return next(error);
    }
  }

  /** Get requests with pending status
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next middleware
   * @return {object} response object
   */
  static async getPendingApprovals(req, res, next) {
    try {
      const field = { status: 'Pending' };
      const data = await RequestService.findRequests(field);
      const message =
        data.length > 0 ? 'Requests retrieved ' : 'No request pending approval';
      delete data.accommodations;
      return Response.customResponse(res, 200, message, data);
    } catch (error) {
      return next(error);
    }
  }

  // eslint-disable-next-line require-jsdoc
  static async EditRequest(req, res, next) {
    console.log('req.body', req.body);
    console.log('req.user', req.user);
  }

  // eslint-disable-next-line require-jsdoc
  static async trip(req, res, next) {
    console.log('req.body', req.body);
    console.log('req.user', req.user);
  }

  // eslint-disable-next-line require-jsdoc
  static async statistics(req, res, next) {
    return Response.customResponse(res, 200);
  }
}

export default RequestController;
