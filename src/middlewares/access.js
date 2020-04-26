import SessionManager from '../utils/sessionManager';
import Response from '../utils/response';

const isRequester = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const payload = await SessionManager.decodeToken({ token });

    if (payload.userRoles !== 'Requester') {
      return Response.authenticationError(
        res,
        'Only a Requester can perform this action'
      );
    }
    // return res.status(200).json(payload);
    next();
  } catch (error) {
    return Response.authenticationError(res, 'Invalid or expired token');
  }
};

const isTravelAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const payload = await SessionManager.decodeToken({ token });

    if (payload.userRoles !== 'Travel Administrator') {
      return Response.authenticationError(
        res,
        'Only a Travel Administrator can perform this action'
      );
    }
    // return res.status(200).json(payload);
    next();
  } catch (error) {
    return Response.authenticationError(res, 'Invalid or expired token');
  }
};
module.exports = {
  isRequester,
  isTravelAdmin
};
