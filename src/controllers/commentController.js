import Response from '../utils/response';
import UserService from '../services/userService';
import CommentService from '../services/commentService';

/** Class that handles comments */
class CommentController {
  /**
   * Creates a new comment.
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @returns {object} custom response
   */
  static async addComment(req, res, next) {
    try {
      const {
        body: comment,
        params: { id: requestId },
        user: { id }
      } = req;
      comment.requestId = requestId;
      comment.userId = id;
      const user = await UserService.findUser({ id });
      const addedComment = await CommentService.addComment(comment);
      delete addedComment.dataValues.deleted;
      addedComment.user = {
        firstName: user.firstName,
        lastName: user.lastName
      };
      return Response.customResponse(
        res,
        200,
        'Comment added successfully',
        addedComment
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * gets all comments by request
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @returns {object} custom response
   */
  static async getCommentsByRequests(req, res, next) {
    try {
      const { id: requestId } = req.params;
      const comments = await CommentService.getCommentsByRequest(requestId);
      return Response.customResponse(
        res,
        200,
        'Comments fetched successfully',
        comments
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * update a users comment
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @returns {object} custom response
   */
  static async updateComment(req, res, next) {
    try {
      const {
        params: { id },
        body: comment
      } = req;
      const commentExists = await CommentService.getCommentById(id);
      if (!commentExists) {
        return Response.notFoundError(res, 'Comment not found');
      }
      const updatedComment = await CommentService.updateComment(id, comment);
      return Response.customResponse(
        res,
        200,
        'Comment updated successfully',
        updatedComment[1][0]
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * delete a users comment
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @returns {object} custom response
   */
  static async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const commentExists = await CommentService.getCommentById(id);
      if (!commentExists) {
        return Response.notFoundError(res, 'Comment not found');
      }
      await CommentService.deleteComment(id);
      return Response.customResponse(res, 200, 'Comment deleted successfully');
    } catch (error) {
      return next(error);
    }
  }
}

export default CommentController;
