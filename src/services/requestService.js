import database from '../database/models';

const {
  Requests,
  Accommodations,
  AccommodationRequests,
  Location,
  Users
} = database;

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
        where: params,
        include: [
          {
            model: Accommodations,
            as: 'accommodations',
            include: [
              {
                model: Location
              }
            ]
          }
        ]
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
        where: params,
        include: [
          {
            model: Accommodations,
            as: 'accommodations'
          }
        ]
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
   * Get requests by user
   * @param {string} request to be created
   * @param {Array} accommodation to array of accommodations
   * @return {object} Object of request if found
   */
  static async addRequest(request, accommodation) {
    try {
      const newRequest = await Requests.create(request);
      await newRequest.addAccommodation(accommodation);

      return await Requests.findByPk(newRequest.id, {
        include: [
          {
            model: Accommodations,
            as: 'accommodations',
            attributes: ['id', 'name', 'status', 'imageUrl', 'locationId'],
            include: [
              {
                model: Location
              }
            ]
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a user's request
   * @param {string} data - request object.
   * @param {number} id - id of the request.
   * @returns {object} object of updated request
   */
  static async updateRequest(data, id) {
    try {
      const result = await Requests.update(
        { ...data },
        {
          where: { id },
          returning: true
        }
      );

      if ('accommodations' in data || 'to' in data) {
        await AccommodationRequests.destroy({
          where: [{ requestId: id }]
        });
        const accommodations = [];
        data.accommodations.map(async (elem) => {
          const accommodation = {
            requestId: result[1][0].dataValues.id,
            accommodationId: elem
          };
          accommodations.push(accommodation);
        });
        await AccommodationRequests.bulkCreate(accommodations);
        return await Requests.findByPk(result[1][0].dataValues.id, {
          include: [
            {
              model: Accommodations,
              as: 'accommodations',
              attributes: ['id', 'name', 'status', 'imageUrl', 'locationId'],
              include: [
                {
                  model: Location
                }
              ]
            }
          ]
        });
      }
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

  /**
   * marks a request as booked
   * @param {number} id id of the request
   * @param {string} booked is the status
   * @returns {object} object or updated request
   */
  static async markRequestAsBooked(id, booked) {
    try {
      return Requests.update({ booked }, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get requests by field
   * @param {object} field to be search with
   * @return {object} Object of request if found
   */
  static async search(field) {
    try {
      const result = await Requests.findAll({
        where: field,
        include: [
          {
            model: Users,
            as: 'requester',
            attributes: ['firstName', 'lastName']
          },
          {
            model: Accommodations,
            as: 'accommodations',
            attributes: ['id', 'name', 'status', 'imageUrl', 'locationId'],
            include: [
              {
                model: Location
              }
            ]
          }
        ]
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default RequestService;
