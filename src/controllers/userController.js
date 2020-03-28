/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import Response from '../utils/response';
import userService from '../services/userService';
import Password from '../utils/generatePassword';
/** Class that handle user */
class Users {
   async createUser(req, res, next) {
    const rawData = req.body;

    try {
      // generates hashes password
      const obj = new Password(rawData);
      const newPassword = await obj.encryptPassword();
      // update data
      rawData.userPassword = newPassword;
      const data = await userService.createUser(rawData);
      return Response.customResponse(res, '200', 'User created', data);
    } catch (error) {
      return next(error);
    }
  }
}

export default new Users();
