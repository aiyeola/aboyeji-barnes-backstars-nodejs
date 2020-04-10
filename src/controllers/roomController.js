/* eslint-disable*/
import Response from '../utils/response';
import accommdationService from ''

/** Class that handles rooms */
class Rooms {
    static async getAllRooms(req, res, next) {
        const accommdationId = req.params.accommdationid;
        try {
            // get accommodation rooms from database
            const data = await accommdationService.getAllRooms(accommdationId);

            const message = `Rooms for accomodation with the id ${ accommdationId }`;

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