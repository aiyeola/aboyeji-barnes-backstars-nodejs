/* eslint-disable operator-linebreak */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Response from '../response';
import SessionManager from '../sessionManager';

dotenv.config();
const {
  GMAIL_EMAIL_ADDRESS,
  GMAIL_EMAIL_PASSWORD,
  FROM_EMAIL,
  BASE_URL
} = process.env;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_EMAIL_ADDRESS,
    pass: GMAIL_EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const URL =
  process.env.NODE_ENV === 'production' ? BASE_URL : 'http://localhost:4000';

/** Class that handles emails */
class Emails {
  /**
   * sets header for email
   * @param {object} data
   * @returns {object} email header
   */
  static header(data) {
    const from = data.from || FROM_EMAIL;
    const { to } = data;
    const { subject } = data;
    return {
      from,
      to,
      subject
    };
  }

  /**
   * sends email
   * @param {object} res - response object
   * @param {object} header - email headers
   * @param {object} template - email template
   * @returns {object} response
   */
  static async sendMail(res, header, template) {
    try {
      const response = await transporter.sendMail({ ...header, ...template });
      return response;
    } catch (error) {
      return Response.customResponse(res, 500, 'Email not delivered', error);
    }
  }

  /**
   * Creates a customized url
   * @param {Object} data object containing url details
   * @returns {string} customized url
   */
  static unsubscribeUrl(data) {
    const token = SessionManager.generateToken(data);
    return `https://${URL}/api/v1/auth/unsubscribe/?token=${token}`;
  }
}

export default Emails;
