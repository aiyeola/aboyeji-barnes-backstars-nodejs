import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

/** Class that validates comments  */
export default class commentValidator {
  /**
   * Schema to validate comment
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async addComment(req, res, next) {
    const schema = Joi.object()
      .keys({
        comment: Schema.string,
        id: Schema.id
      })
      .options({ allowUnknown: false });
    validator(schema, { ...req.body, ...req.params }, res, next);
  }

  /**
   * Schema to validate comment
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async getComments(req, res, next) {
    const schema = Joi.object()
      .keys({
        id: Schema.id
      })
      .options({ allowUnknown: false });
    validator(schema, req.params, res, next);
  }

  /**
   * Schema to validate comment
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async updateComment(req, res, next) {
    const schema = Joi.object()
      .keys({
        comment: Schema.string,
        id: Schema.id
      })
      .options({ allowUnknown: false });
    validator(schema, { ...req.body, ...req.params }, res, next);
  }

  /**
   * Schema to validate comment
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async deleteComment(req, res, next) {
    const schema = Joi.object()
      .keys({
        id: Schema.id
      })
      .options({ allowUnknown: false });
    validator(schema, req.params, res, next);
  }
}
