import database from '../database/models';

const { UserProfile, Users } = database;

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
}

export default UserProfileService;
