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
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes';
import logger from './utils/logger';
import socket from './utils/chat/socket';
import notifications from './utils/notifications';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.enable('trust proxy');
app.use(cors());
app.use(helmet.dnsPrefetchControl({ allow: false }));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.xssFilter());
app.use(compression({ level: 9, threshold: 0 }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorhandler());
}

// Running all event listeners
notifications();

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

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});

socket.socketFunction.socketStartUp(server);

export default { app };
