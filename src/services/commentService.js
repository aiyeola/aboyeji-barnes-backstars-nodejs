import database from '../database/models';

const { Comments, Users } = database;

/** Class representing a Comment service */
class CommentService {
  /**
   * Creates a new comment.
   * @param {object} comment The first number.
   * @returns {object} The User object.
   */
  static async addComment(comment) {
    try {
      return await Comments.create(comment);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comments by request.
   * @param {object} requestId to be checked
   * @returns {object} The comment object.
   */
  static async getCommentsByRequest(requestId) {
    try {
      return await Comments.findAll({
        where: [
          {
            requestId,
            deleted: false
          }
        ],
        include: [
          {
            model: Users
          }
        ],
        order: [['createdAt', 'ASC']],
        attributes: ['id', 'comment', 'createdAt', 'updatedAt']
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comment by id.
   * @param {object} id to be checked against
   * @returns {object} The comment object.
   */
  static async getCommentById(id) {
    try {
      return await Comments.findOne({
        where: [
          {
            id,
            deleted: false
          }
        ],
        attributes: ['id', 'userId', 'comment', 'createdAt', 'updatedAt']
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * update comment
   * @param {object} id The id of the comment
   * @param {object} comment The new comment
   * @returns {object} The Comment object.
   */
  static async updateComment(id, comment) {
    try {
      return await Comments.update(comment, {
        returning: true,
        where: [{ id }]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * deletes a users comment
   * @param {object} id The id of the comment
   * @returns {object} The Comment object.
   */
  static async deleteComment(id) {
    try {
      return await Comments.update(
        {
          deleted: true
        },
        {
          where: [{ id }]
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default CommentService;
