/* eslint-disable class-methods-use-this */
import UserProfileService from '../services/userProfileService';
import Response from '../utils/response';

/** Class that handles user profile */
class UserProfileController {
  /**
   *  Gets a users profile
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async userProfile(req, res, next) {
    try {
      const { id: userId } = req.body;
      const profile = await UserProfileService.getProfile(userId);

      return Response.customResponse(res, 200, 'User Profile', profile);
    } catch (error) {
      next(error);
    }
  }

  /**
   *  Update a users profile
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async updateProfile(req, res, next) {
    try {
      const { id: userId } = req.user;
      await UserProfileService.updateOrCreate(userId, req.body);
      const profile = await UserProfileService.getProfile(userId);
      const profileData = profile.dataValues.userProfile.dataValues;
      res.cookie('passportNumber', profileData.passportNumber);
      res.cookie('passportName', profileData.passportName);
      res.cookie('gender', profileData.gender);

      return Response.customResponse(res, 200, 'User Profile Updated', profile);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserProfileController();
