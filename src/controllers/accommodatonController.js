/* eslint-disable */
import Response from '../utils/response';
import accommodationService from '../services/accommodationService';

class accommodationController {
  static async createRoom(req, res, next) {
    const rawData = req.body;

    try {
      const data = await accommodationService.createRoom(rawData);
      return Response.customResponse(
        res,
        201,
        'Room has been created successfully',
        data
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default accommodationController;
