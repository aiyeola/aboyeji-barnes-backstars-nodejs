/* eslint-disable*/
import database from '../database/models';
import UserProfile from '../services/userProfileService';

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

      // Create user profile
      await UserProfile.updateOrCreate(createdUser.id);
      
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Finds a user
   * @param {string} param - param to find user
   * @returns {object} user.
   */
  static async findUser(param) {
    try {
      const user = await Users.findOne({ where: { param } });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
