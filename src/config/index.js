/* eslint-disable operator-linebreak */
/* eslint-disable import/prefer-default-export */
export const FRONTEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : 'http://localhost:3000';
