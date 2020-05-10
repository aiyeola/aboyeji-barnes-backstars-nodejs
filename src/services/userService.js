import database from '../database/models';
import UserProfile from './userProfileService';

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
   * @param {object} param - param to find user
   * @returns {object} user.
   */
  static async findUser(param) {
    try {
      const user = await Users.findOne({ where: param });
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a user
   * @param {object} param - param to update
   * @param {object} userDetails - new user details
   * @returns {object} user
   */
  static async updateUser(param, userDetails) {
    try {
      return await Users.update(userDetails, {
        returning: true,
        where: param
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
