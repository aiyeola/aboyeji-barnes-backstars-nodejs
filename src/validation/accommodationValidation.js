/* eslint-disable */
import Joi from '@hapi/joi';
import validator from '../utils/validator';


class accommodationValidator {
    static validateRoomData(req, res, next) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            type: Joi.string().required(),
            accommodationId: Joi.string().alphanum().required(),
            status: Joi.boolean().required(),
            price: Joi.number().required()
        }, {})
        validator(schema, req.body, res, next)
    }
}

export default accommodationValidator