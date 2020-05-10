import SessionManager from '../utils/sessionManager';
import Response from '../utils/response';
import UserService from '../services/userService';

const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const payload = await SessionManager.decodeToken({ token });
    const result = await SessionManager.checkToken(payload.userEmail);

    if (result === 'null') {
      return Response.authenticationError(res, 'User not logged in');
    }

    const { userEmail } = payload;
    // check db for updated user roles and emailAllowed status not from token
    const { userRoles, emailAllowed } = await UserService.findUser({
      userEmail
    });
    payload.userRoles = userRoles;
    payload.emailAllowed = emailAllowed;

    req.user = payload;
    next();
  } catch (error) {
    return Response.authenticationError(res, 'Invalid or expired token');
  }
};

export default verify;
