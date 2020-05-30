/* eslint-disable operator-linebreak */
import moment from 'moment';
import { Op } from 'sequelize';
import RequestService from '../services/requestService';
import Response from '../utils/response';
import UserService from '../services/userService';
import Email from '../utils/mails/email';
import ApprovalEmail from '../utils/mails/approval.email';
import UpdateEmail from '../utils/mails/update.email';
import Emitter from '../utils/eventEmitter';

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
   * @return {object} custom response
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
   * @return {object} custom response
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

  /** Edit a user request
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next middleware
   * @return {object} custom response
   */
  static async EditRequest(req, res, next) {
    const {
      body: { travelDates, reason },
      params: { id }
    } = req;
    try {
      const formattedData = {
        ...req.body,
        travelDate: travelDates,
        reason: reason.trim()
      };

      const data = await RequestService.updateRequest(formattedData, id);
      const roleDetails = await UserService.findUser({ userRoles: 'Manager' });
      const request = data.dataValues;
      await Emitter.emit('request edited', request);
      request.manager = roleDetails.dataValues.userEmail;
      request.user = req.user.firstName;
      if (roleDetails.emailAllowed) {
        const unsubscribeUrl = Email.unsubscribeUrl({
          userEmail: roleDetails.userEmail
        });
        const header = Email.header({
          to: roleDetails.dataValues.userEmail,
          subject: 'Barnes Update Notification'
        });
        const msg = UpdateEmail.updateTemplate({ ...data, unsubscribeUrl });
        await Email.sendMail(res, header, msg);
      }
      return Response.customResponse(
        res,
        200,
        'Update has been completed successfully',
        data
      );
    } catch (error) {
      next(error);
    }
  }

  /** Manages trips: one way, return & multi trips
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @return {object} custom response
   */
  static async trip(req, res, next) {
    const {
      body: {
        from,
        travelDates,
        gender,
        passportNumber,
        passportName,
        role,
        reason,
        returnDate,
        accommodations
      },
      user: { id }
    } = req;
    try {
      const request = await RequestService.findRequest({
        from: from.toUpperCase(),
        travelDate: travelDates,
        userId: id
      });
      if (request) {
        return Response.conflictError(res, 'Request already exists');
      }

      const oneWay = {
        from: from.toUpperCase(),
        travelDate: travelDates,
        reason: reason.trim(),
        userId: id,
        gender,
        passportNumber,
        passportName,
        role
      };

      const bothRequests = { ...oneWay, returnDate };

      const response = await RequestService.addRequest(
        bothRequests,
        accommodations
      );
      return Response.customResponse(
        res,
        200,
        'Your request has been forwarded successfully',
        response
      );
    } catch (error) {
      next(error);
    }
  }

  /** Get statistics of approved requests
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @return {object} custom response
   */
  static async statistics(req, res, next) {
    const {
      body: { parameter, value },
      user: { id }
    } = req;
    try {
      const params = {
        travelDate: {
          [Op.gte]: [moment().subtract(value, parameter).format('YYYY-MM-DD')],
          [Op.lt]: [moment().format('YYYY-MM-DD')]
        },
        status: 'Approved',
        userId: id
      };
      const data = await RequestService.findRequests(params);
      return Response.customResponse(
        res,
        200,
        'Trip statistics successfully retrieved',
        {
          total: data.length,
          trips: data
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

export default RequestController;
