/* eslint-disable*/
import database from '../database/models';

const { Likes } = database;

class likeService {
  static async like(id) {
    id.status = true;
    let data;
    // return 'Create or update';
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

      console.log(`Accommodation liked successfully`);
      return data;
    } catch (error) {
      throw error;
    }
  }

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

      console.log(`Accommodation unliked successfully`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default likeService;
