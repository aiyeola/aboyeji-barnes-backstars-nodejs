/* eslint-disable class-methods-use-this */
import UserProfileService from '../services/userProfileService';
import Response from '../utils/response';
import { upload } from '../config/cloudinary';

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
      const { id: userId } = req.user;
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

  /**
   *  Update a users profile picture
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async updatePicture(req, res, next) {
    try {
      const { image } = req.files;
      const cloudFile = await upload(image.tempFilePath);
      req.body.url = cloudFile.url;
      const { id: userId } = req.user;
      const response = await UserProfileService.updateOrCreatePicture(
        userId,
        req.body
      );
      return Response.customResponse(
        res,
        200,
        'Profile Picture Updated',
        response[1][0]
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  Gets a users profile picture
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async getPicture(req, res, next) {
    try {
      const { id: userId } = req.user;
      const response = await UserProfileService.getPicture(userId);

      return Response.customResponse(
        res,
        200,
        'Profile Picture Retrieved',
        response
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserProfileController();
