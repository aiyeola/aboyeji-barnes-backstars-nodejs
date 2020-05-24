import database from '../database/models';

const { Requests, Accommodations, AccommodationRequests, Rooms } = database;

/** Class representing Request services. */
class RequestService {
  /**
   * Get requests by user
   * @param {string} params to be checked against
   * @return {object} Object of request if found
   */
  static async findRequests(params) {
    try {
      const requests = await Requests.findAll({
        where: params
        // figure why this one is not working
        // include: [
        //   {
        //     model: Accommodations,
        //     as: 'accommodations'
        //   }
        // ]
      });

      return requests;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get request by user
   * @param {string} params to be checked against
   * @return {object} Object of request if found
   */
  static async findRequest(params) {
    try {
      const requests = await Requests.findOne({
        where: params
        // include: [
        //   {
        //     model: Accommodations,
        //     as: 'accommodations'
        //   }
        // ]
      });

      return requests;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Approve or Reject request
   * @param {Number} requestId to update
   * @param {String} status either 'Approved' or 'Rejected'
   * @returns {object} response
   */
  static async approveOrRejectRequest(requestId, status) {
    try {
      const request = await Requests.update(
        { status },
        { where: { id: requestId } }
      );
      return request;
    } catch (error) {
      throw error;
    }
  }

  /**
   * deletes request by id.
   * @param {number} id id of request.
   * @returns {object} deleted object.
   */
  static async deleteRequest(id) {
    try {
      const deleted = await Requests.destroy({
        where: [{ id }]
      });
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

export default RequestService;
