/* eslint-disable*/
import database from '../database/models';

const { Likes } = database;

class likeService {
  /**
   * Count the number of likes for a particular accommodation.
   * @param {id} id - accommodation id to count.
   * @returns {BigInt} - count of likes
   */
  static async count(id) {
    try {
      const data = await Likes.count({ where: { accommodationId: id } });

      return data;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Like an accommodation.
   * @param {object} id - accommodation object.
   * @returns {object} - accommodation liked
   */
  static async like(id) {
    id.status = true;
    let data;
    try {
      if (id.status == null) {
        data = await Likes.create(id);
      } else {
        await Likes.update(
          { status: id.status },
          {
            where: { userId: id.userId, accommodationId: id.accommodationId }
          }
        );
        data = await Likes.findOne({
          where: {
            userId: id.userId,
            accommodationId: id.accommodationId
          }
        });
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Unlike an accommodation.
   * @param {object} id - accommodation object.
   * @returns {object} - accommodation unliked
   */
  static async unlike(id) {
    try {
      await Likes.update(
        { status: false },
        {
          where: { userId: id.userId, accommodationId: id.accommodationId }
        }
      );
      const data = await Likes.findOne({
        where: {
          userId: id.userId,
          accommodationId: id.accommodationId
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default likeService;
