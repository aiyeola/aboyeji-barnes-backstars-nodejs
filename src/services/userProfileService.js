import database from '../database/models';

const { UserProfile, Users, ProfilePictures } = database;

/** Class that handles user profile service */
class UserProfileService {
  /**
   * creates or updates user profile
   * @param {number} userId - user id
   * @param {object} profileData - user profile data
   * @returns {object} updated profile
   */
  static async updateOrCreate(userId, profileData = null) {
    try {
      const profileFound = await UserProfile.findOne({ where: { userId } });

      if (!profileFound) await UserProfile.create({ userId });

      const updatedProfile = await UserProfile.update(profileData, {
        where: { userId }
      });
      return updatedProfile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * gets user profile
   * @param {number} userId - user id
   * @returns {object} user profile
   */
  static async getProfile(userId) {
    try {
      const profile = await Users.findOne({
        attributes: ['firstName', 'lastName', 'userEmail', 'userRoles'],
        where: { id: userId },
        include: [{ model: UserProfile, as: 'userProfile' }]
      });

      return profile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * creates or updates user profile picture
   * @param {number} userId - user id
   * @param {object} data - profile picture data
   * @returns {object} updated profile picture
   */
  static async updateOrCreatePicture(userId, data) {
    try {
      const profileFound = await ProfilePictures.findOne({ where: { userId } });
      if (!profileFound) await ProfilePictures.create({ userId });
      const updatedProfile = await ProfilePictures.update(data, {
        where: { userId },
        returning: true
      });
      return updatedProfile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * gets user profile picture
   * @param {number} userId - user id
   * @returns {object} profile picture
   */
  static async getPicture(userId) {
    try {
      return await ProfilePictures.findOne({
        where: { userId }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserProfileService;
