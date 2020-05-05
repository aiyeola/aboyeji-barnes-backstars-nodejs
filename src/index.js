/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import routes from './routes';
import logger from './utils/logger';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.enable('trust proxy');
app.use(cors());

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorhandler());
}

app.use(routes);
const PORT = process.env.PORT || 4000;

if (!isProduction) {
  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stack traces leaked to user
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default { app };
