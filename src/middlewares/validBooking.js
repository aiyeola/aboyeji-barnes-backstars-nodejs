import Response from '../utils/response';
import database from '../database/models';

const { Rooms, Location } = database;

const isAccommodationInLocation = async (req, res, next) => {
  try {
    const result = await Location.findOne({
      where: { id: req.body.locationId }
    });
    if (result === null) {
      return Response.customResponse(
        res,
        '201',
        'Location specified does not exist'
      );
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isValidRoom = async (req, res, next) => {
  try {
    const valid = false;

    if (valid === false) {
      return Response.badRequestError(res, 'invalid room');
    }

    next();
  } catch (error) {
    return next(error);
  }
};

// Work in progress
const isRoomFree = async (req, res, next) => {
  try {
    const result = await Rooms.findOne({
      where: { id: req.body.roomId }
    });
    if (result.status === false) {
      return Response.customResponse(res, '201', 'Room is not free');
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAccommodationInLocation,
  isValidRoom,
  isRoomFree
};
