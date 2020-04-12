/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
import database from '../database/models';

const { UserProfile, Users } = database;

class UserProfileService {
  static async updateOrCreate(userId, profileData = null) {
    try {
      // Find a profile by userId
      const profileFound = UserProfile.findOne({ where: { userId } });

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
}

export default UserProfileService;
