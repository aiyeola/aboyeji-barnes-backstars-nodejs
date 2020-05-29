import Response from '../utils/response';

const getProfileInfo = (req, res, next) => {
  const { userRoles } = req.user;
  if (req.query.autofill === 'true') {
    const { gender, passportName, passportNumber } = req.cookies;
    if (!gender || !passportName || !passportNumber) {
      return Response.badRequestError(
        res,
        'You need to fill in your gender, passport name and number in your profile to use autofill'
      );
    }

    req.body = {
      ...req.body,
      gender,
      passportName,
      passportNumber
    };
  }
  req.body.role = userRoles;

  next();
};

export default getProfileInfo;
