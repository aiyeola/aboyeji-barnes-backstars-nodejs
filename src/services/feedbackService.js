/* eslint-disable require-jsdoc */
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
   * @param {object} data - rating object.
   * @returns {object} - created rating object
   */
  static async updateOrCreateRating(data) {
    try {
      let rating = await this.getUserAccommodationRating(
        data.userId,
        data.accommodationId
      );

      if (rating === null) return await Ratings.create(data);

      rating = await Ratings.update(
        { rating: data.rating },
        { where: { id: rating.id } }
      );
      return rating;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get accommodation Rating by user.
   * @param {id} userId user id.
   * @param {id} accommodationId accommodation id.
   * @returns {object} The rating object.
   */
  static async getUserAccommodationRating(userId, accommodationId) {
    try {
      const rating = await Ratings.findOne({
        where: { userId, accommodationId }
      });
      return rating;
    } catch (error) {
      throw error;
    }
  }
}

export default feedbackService;
