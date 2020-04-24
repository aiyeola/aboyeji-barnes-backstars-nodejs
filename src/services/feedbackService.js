/* eslint-disable*/
import database from '../database/models';

const { Feedbacks } = database;

class feedbackService {
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

export default feedbackService;
