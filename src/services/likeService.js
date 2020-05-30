/* eslint-disable*/
import database from '../database/models';

const { Likes } = database;

class likeService {
  /**
   * Gets comment by id.
   * @param {object} like The id would be easier..
   * @returns {object} The comment object.
   */
  static async countLikes(like) {
    try {
      return await Likes.count({
        where: [like]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Like an accommodation.
   * @param {object} id - accommodation object.
   * @returns {object} - accommodation liked
   */
  static async like(like) {
    try {
      return await Likes.create(like);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Unlike an accommodation.
   * @param {object} id - accommodation object.
   * @returns {object} - accommodation unliked
   */
  static async unlike(like) {
    try {
      return await Likes.destroy({
        where: [like]
      });
    } catch (error) {
      throw error;
    }
  }
}

export default likeService;
