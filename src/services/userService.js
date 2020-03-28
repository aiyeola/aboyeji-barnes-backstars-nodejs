/* eslint-disable*/
import database from '../database/models';

const { Users } = database;

/** Class representing UserService */
class UserService {
  /**
   * Creates a new user.
   * @param {object} user - user object.
   * @returns {object} - created user object 
   */
  static async createUser(user) {
    try {
      const createdUser = await Users.create(user);

      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
