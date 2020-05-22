/* eslint-disable*/
import database from '../database/models';

const { Feedbacks, Ratings } = database;

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

  /**
   * @param {object} rating - rating object.
   * @returns {object} - created rating object
   */
  static async updateOrCreateRating(rating) {
    try {
      //TODO- Check if rating exists for accommodationId and user

      const data = await Ratings.create(rating);

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default feedbackService;
