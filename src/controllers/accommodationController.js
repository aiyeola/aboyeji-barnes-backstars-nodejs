/* eslint-disable object-curly-newline */
import moment from 'moment';
import { Op } from 'sequelize';
import Response from '../utils/response';
import accommodationService from '../services/accommodationService';
import likeService from '../services/likeService';
import LocationService from '../services/locationService';
import requestService from '../services/requestService';
import { manyImages } from '../config/cloudinary';
import { turnArray } from '../utils/isArray';
import reviewController from './reviewController';

/** Class that handles accommodation */
class accommodationController {
  /**
   * Creates new accommodation
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async createAccommodation(req, res, next) {
    const {
      body: { locationId, name, lat, lng, amenities, services },
      user: { id }
    } = req;

    try {
      const location = await LocationService.getLocationById(locationId);
      if (!location) {
        return Response.notFoundError(res, 'Location not found');
      }
      const accommodationExist = await accommodationService.getAccommodation({
        name: name.toUpperCase(),
        locationId
      });
      if (accommodationExist) {
        return Response.conflictError(
          res,
          'This accommodation already exist in this location'
        );
      }
      req.body.imageUrl = await manyImages(req.files);
      req.body.mapLocations = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      };
      delete req.body.lat;
      delete req.body.lng;
      req.body.amenities = turnArray(amenities);
      req.body.services = turnArray(services);
      req.body.owner = id;
      req.body.name = name.toUpperCase();
      const accommodation = await accommodationService.createAccommodation(
        req.body
      );
      return Response.customResponse(
        res,
        '201',
        'Accommodation created successfully',
        accommodation
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Creates rooms for an accommodation
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async createRoom(req, res, next) {
    try {
      const { accommodationId, rooms } = req.body;
      const exist = await accommodationService.getAccommodation({
        id: accommodationId
      });
      if (!exist) {
        return Response.notFoundError(res, 'Accommodation not found');
      }
      const data = rooms.map((r) => {
        r.accommodationId = accommodationId;
        return r;
      });
      const room = await accommodationService.createRoom(data);
      return Response.customResponse(
        res,
        '201',
        'Room created successfully',
        room
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all accommodations
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async getAccommodations(req, res, next) {
    try {
      const data = await accommodationService.getAllAccommodations();
      return Response.customResponse(
        res,
        '200',
        'Accommodations fetched successfully',
        data
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get accommodation by id
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async getAccommodationById(req, res, next) {
    const id = parseInt(req.params.id, 10);
    const { id: userId } = req.user;
    try {
      const exist = await accommodationService.getAccommodation({
        id
      });
      if (!exist) {
        return Response.notFoundError(res, 'Accommodation not found');
      }
      delete exist.dataValues.like;
      delete exist.dataValues.requests;
      exist.dataValues.rating = reviewController.getAccommodationRating(
        exist,
        userId
      );
      return Response.customResponse(
        res,
        '200',
        'Accommodation fetched successfully',
        exist
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * like or unlike an accommodation
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async likeOrUnlike(req, res, next) {
    const {
      user: { id: userId },
      params: { id: accommodationId }
    } = req;
    try {
      const exist = await accommodationService.getAccommodation({
        id: accommodationId
      });
      if (!exist) {
        return Response.notFoundError(res, 'Enter a valid accommodation ID');
      }
      const like = { userId, accommodationId };
      const alreadyLiked = await likeService.countLikes(like);
      const likes = await likeService.countLikes({ accommodationId });
      if (!alreadyLiked) {
        await likeService.like(like);
        return Response.customResponse(
          res,
          200,
          `Successfully liked ${exist.name}`,
          {
            likes: likes + 1
          }
        );
      }
      await likeService.unlike(like);
      return Response.customResponse(
        res,
        200,
        `Successfully unliked ${exist.name}`,
        {
          likes: likes - 1
        }
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get most travelled destination(accommodation)
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async getMostTravelledDestination(req, res, next) {
    try {
      const final = [];
      let data = [];
      const requests = await requestService.findRequests({
        status: 'Approved',
        travelDate: {
          [Op.lt]: [moment().format('YYYY-MM-DD')]
        }
      });

      const accommodationRequest = requests.map((elem) => elem.accommodations);
      for (let i = 0; i < accommodationRequest.length; i += 1) {
        data = data.concat(accommodationRequest[i]);
      }
      if (data.length === 0) {
        return Response.customResponse(
          res,
          200,
          'There are currently no past travels',
          {
            data: final,
            count: 0
          }
        );
      }
      const counter = {};
      let maxCount = 1;
      let mostTravelled = [];

      for (let i = 0; i < data.length; i += 1) {
        const { name } = data[i];

        // eslint-disable-next-line no-unused-expressions
        counter[name] === undefined
          ? (counter[name] = 1)
          : (counter[name] += 1);

        if (counter[name] > maxCount) {
          mostTravelled = [name];
          maxCount = counter[name];
        } else if (counter[name] === maxCount) {
          mostTravelled.push(name);
          maxCount = counter[name];
        }
      }
      await Promise.all(
        mostTravelled.map(async (elem) => {
          const accommodation = await accommodationService.getAccommodation({
            name: elem.toUpperCase()
          });
          final.push(accommodation);
        })
      );
      return Response.customResponse(res, 200, 'Most travelled destination', {
        data: final,
        count: maxCount
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default accommodationController;
