/* eslint-disable */
import Response from '../utils/response';
import feedbackService from '../services/feedbackService';

class reviewController {
  //Feedback on an accommodation
  static async addedFeedback(req, res, next) {
    const id = parseInt(req.params.id);
    const rawData = req.body;
    rawData.accommodationId = id; // sets the "accommodationId" to the value of "id"
    try {
      const data = await feedbackService.addFeedback(rawData);

      return Response.customResponse(
        res,
        '201',
        `Accommodation feedback has been created successfully`,
        data
      );
    } catch (error) {
      return next(error);
    }
  }

  //Ratings on an accommodation
  static async rateCenter(req, res, next) {
    const id = parseInt(req.params.id);
    const rawData = req.body;
    rawData.accommodationId = id;

    try {
      const data = await feedbackService.updateOrCreateRating(rawData);

      return Response.customResponse(
        res,
        '201',
        `Accommodation has been rated successfully`,
        data
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default reviewController;
