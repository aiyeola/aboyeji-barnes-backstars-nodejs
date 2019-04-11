/* eslint-disable*/
import Response from '../utils/response';
import accommodationService from '../services/accommodationService'

/** Class that handles rooms */
class Rooms {
    static async getAllRooms(req, res, next) {
        const accommodationId = req.query.accommodationid;
        try {
            // get accommodation rooms from database
            const data = await accommodationService.getAllRooms(accommodationId);

            const message = `Rooms for accommodation with the id ${ accommodationId }`;

            return Response.customResponse(
                res,
                200,
                message,
                data
            );
        } catch (error) {
            return next(error);
        }
    }
}

export default Rooms;