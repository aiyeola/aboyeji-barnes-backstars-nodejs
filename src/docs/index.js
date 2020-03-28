import swagger from './swagger.json';
import signup from './auth/signup.json';

swagger.paths['/auth/signup'] = signup;

export default swagger;
