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
      // Find a profile by userId
      const profileFound = await UserProfile.findOne({ where: { userId } });

      // Create one if not found
      if (!profileFound) await UserProfile.create({ userId });

      // Update profile by userId
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
   * @param {number} user - user id
   * @param {object} data - profile picture data
   * @returns {object} updated profile picture
   */
  static async updateOrCreatePicture(user, data) {
    try {
      const profileFound = await ProfilePictures.findOne({ where: { user } });
      if (!profileFound) await ProfilePictures.create({ user });
      const updatedProfile = await ProfilePictures.update(data, {
        where: { user },
        returning: true
      });
      return updatedProfile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * gets user profile picture
   * @param {number} user - user id
   * @returns {object} profile picture
   */
  static async getPicture(user) {
    try {
      return await ProfilePictures.findOne({
        where: { user }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserProfileService;
