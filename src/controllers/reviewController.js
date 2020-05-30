/* eslint-disable operator-linebreak */
/* eslint-disable array-callback-return */
import Response from '../utils/response';
import feedbackService from '../services/feedbackService';
import AccommodationService from '../services/accommodationService';
import Search from '../utils/search';

/** Class that handles reviews: feedbacks and ratings */
class reviewController {
  /**
   * user can add feedback to an accommodation
   * @param {object} req -request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async addedFeedback(req, res, next) {
    const {
      params: { id },
      user: { id: userId }
    } = req;
    const rawData = req.body;
    rawData.accommodationId = parseInt(id, 10);
    rawData.userId = userId;
    try {
      const details = await AccommodationService.getAccommodation({
        id: rawData.accommodationId
      });
      if (!details) {
        return Response.notFoundError(res, "Accommodation doesn't exist");
      }
      const addedFeedback = await feedbackService.addFeedback(rawData);
      return Response.customResponse(
        res,
        201,
        'Feedback added successfully',
        addedFeedback
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * user can rate an accommodation already stayed
   * @param {object} req -request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async rateCenter(req, res, next) {
    const {
      params: { id },
      user: { id: userId },
      body: { rating }
    } = req;
    try {
      const accommodation = await AccommodationService.getAccommodation({ id });

      if (!accommodation) {
        return Response.notFoundError(res, 'Accommodation not found');
      }
      const currentDate = Search.formatDate(new Date());
      const accRequests = accommodation.requests.filter((el) => {
        if (
          el.status === 'Approved' &&
          el.travelDate <= currentDate &&
          el.userId === userId
        ) {
          return el.dataValues;
        }
      });

      if (accRequests.length <= 0) {
        return Response.authorizationError(
          res,
          "Can't rate center you have not stayed "
        );
      }
      const data = {
        userId,
        accommodationId: id,
        rating
      };

      const ratings = await feedbackService.updateOrCreateRating(data);
      return Response.customResponse(
        res,
        201,
        'Rating added successfully',
        ratings
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * calculates an accommodations average and user rating
   * @param {object} accommodation - accommodation
   * @param {number} userId - user id
   * @returns {number} rating
   */
  static getAccommodationRating(accommodation, userId) {
    const ratings = {};
    const accommodationRatings = accommodation.rating.map(
      (el) => el.dataValues
    );
    ratings.averageRating = Search.computeAverage(accommodationRatings);
    const userRating = accommodationRatings.filter(
      (el) => el.userId === userId
    );
    ratings.userRating = userRating.length > 0 ? userRating[0].rating : null;

    return ratings;
  }
}

export default reviewController;
