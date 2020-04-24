/* eslint-disable */
import Response from '../utils/response';
import accommodationService from '../services/accommodationService';
import likeService from '../services/likeService';
import database from '../database/models';
const {
  Feedbacks,
  Ratings,
  Likes,
  AccommodationRequests,
  Accommodations
} = database;

class accommodationController {
  static async createAccommodation(req, res, next) {
    const rawData = req.body;
    try {
      const data = await accommodationService.createAccommodation(rawData);
      console.log('Accommodation has been created successfully');
      return Response.customResponse(
        res,
        '200',
        'Accommodation has been created successfully',
        data
      );
    } catch (error) {
      return next(error);
    }
  }

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

  static async updateRoom(req, res, next) {
    const id = parseInt(req.params.id);
    const rawData = req.body;
    try {
      const data = await accommodationService.updateRoom(id, rawData);
      return Response.customResponse(
        res,
        201,
        'Room has been updated successfully',
        data
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getAccommodations(req, res, next) {
    try {
      const data = await accommodationService.getAllAccommodations();
      return Response.customResponse(
        res,
        '200',
        'Getting all accommodations',
        data
      );
    } catch (error) {
      return next(error);
    }
  }
  static async getAccommodationById(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      const data = await accommodationService.getAccommodation(id);

      return Response.customResponse(
        res,
        '200',
        `Accommodation ${id} details`,
        data
      );
    } catch (error) {
      return next(error);
    }
  }
  static async rateAccommodation(req, res, next) {
    const id = parseInt(req.params.id);
    const rawData = req.body;
    rawData.accommodationId = id; //ignores accommodationId value in the request body and sets it to 'id'

    try {
      const data = await Ratings.create(rawData);

      return Response.customResponse(
        res,
        201,
        `Accommodation ${id} has been rated successfully`,
        data
      );
    } catch (error) {
      return next(error);
    }
  }

  static async likeOrUnlike(req, res, next) {
    const id = parseInt(req.params.id);
    const rawData = { userId: req.body.userId, accommodationId: id };
    let likedOrUnLiked;

    try {
      //Check if a user has liked an accommodation
      const data = await Likes.findOne({
        where: { accommodationId: id, userId: req.body.userId }
      });

      if (data == null || data.status == false) {
        likedOrUnLiked = await likeService.like(rawData);
        return Response.customResponse(
          res,
          '200',
          `Accommodation ${id} liked successfully`,
          likedOrUnLiked
        );
      } else {
        likedOrUnLiked = await likeService.unlike(rawData);
        return Response.customResponse(
          res,
          '200',
          `Accommodation ${id} unliked successfully`,
          likedOrUnLiked
        );
      }
    } catch (error) {
      return next(error);
    }
  }

  static async getMostTravelledDestination(req, res, next) {
    try {
      const counts = [];
      // Get the counts of all the places (accommodation) travelled to
      const result = await AccommodationRequests.aggregate(
        'accommodationId',
        'COUNT',
        { plain: false, group: ['accommodationId'] }
      );

      for (let i of result) {
        counts.push(i.COUNT);
      }
      const max = Math.max(...counts).toString();
      const maxAccommodationId = counts.indexOf(max);
      const id = result[maxAccommodationId].accommodationId;

      const data = await Accommodations.findOne({
        where: { id: id }
      });

      return Response.customResponse(
        res,
        '200',
        `Most liked destination`,
        data
      );
    } catch (error) {
      throw error;
    }
  }

  static async getFeedback(req, res, next) {
    const id = parseInt(req.params.id);

    try {
      const data = await Feedbacks.findAll({ where: { accommodationId: id } });

      return Response.customResponse(
        res,
        '200',
        `Feedbacks on accommodation ${id}`,
        data
      );
    } catch (error) {
      throw error;
    }
  }
}

export default accommodationController;
