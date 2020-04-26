/* eslint-disable*/
import database from '../database/models';

const { Feedbacks } = database;

class accommodationService {
  /**
   * @param {object} feedback - feedback object.
   * @returns {object} - created feedback object
   */
  static async addFeedback(feedback) {
    try {
      const data = await Feedbacks.create(feedback);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default accommodationService;
