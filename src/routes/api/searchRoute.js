import express from 'express';
import SearchValidator from '../../validation/searchValidation';
import Search from '../../controllers/searchController';
import verify from '../../middlewares/auth';
import method from '../../utils/method';

const router = express.Router();

router
  .route('/requests')
  .get(verify, SearchValidator.checkRequestParams, Search.searchRequests)
  .all(method);

export default router;
