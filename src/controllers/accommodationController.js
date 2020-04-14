/* eslint-disable */
import Response from '../utils/response';
import accommodationService from '../services/accommodationService';
import database from '../database/models';
const { Feedbacks } = database;

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
      console.log(`Accommodation ${id} details`);
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
    console.log(`Accommodation ${id} details`);
    return res.status(200).send(`Accommodation ${id} details`);
  }

  static async likeOrUnlike(req, res, next) {
    const id = parseInt(req.params.id);
    console.log(`Accommodation ${id} liked/unliked`);
    return res.status(200).send(`Accommodation ${id} liked/unliked`);
  }

  static async getMostTravelledDestination(req, res, next) {
    console.log(`Most Travelled Destination`);
    return res.status(200).send(`Most Travelled Destination`);
  }

  static async getFeedback(req, res, next) {
    const id = parseInt(req.params.id);

    try {
      const data = await Feedbacks.findAll({ where: { accommodationId: id } });
      console.log(`Feedbacks on accommodation ${id}`);
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
