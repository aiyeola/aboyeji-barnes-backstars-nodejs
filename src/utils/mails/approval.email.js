/** manager approval email template */
class ApprovalEmail {
  /**
   * Template for rejecting or accepting requests
   * @param {string} reason
   * @param {object} requester
   * @param {string} unsubscribeUrl
   * @returns {object} email to be sent
   */
  static rejectAcceptRequestTemplate(reason, requester, unsubscribeUrl) {
    const html = `
	<body style="margin: 0; padding: 0;">
	  <table border="0" cellpadding="0" cellspacing="0" width="900px"
		  style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
		  <tr>
			  <td align="center" style="background-color:#f9fcff; margin: 0 50px 0 50px;">
				  <a><img src="" alt="Barnes Backstars" width="120" height="100" style="display: block;></a>
			  </td>
		  </tr>
		   <tr>
		   <td align = " center" style="padding: 0 50px 0 50px;">
					  <table border="0" cellpadding="0" cellspacing="0" width="100%"
						  style="background-color:#ffffff; padding: 0 0 0 20px;">
						  <tr>
							  <td align="center" style="font-family: Arial, sans-serif; font-size: 24px; color: #050505;">
								  <p>Hi ${requester.firstName},</p>
							  </td>
						  </tr>
						  <tr>
							  <td align="center"
								  style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
								  <p>${reason}</p>
							  </td>
						  </tr>
						  <tr>
							  <td align="center"
								  style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
								  <p>contact <a href=#>support@barnes-backstars</a> if you didn't initiate this request
								  </p>
								  <p>Don't want to receive such emails from barefootNomad?
									  <a href="${unsubscribeUrl}">Unsubscribe</a></p>
							  </td>
						  </tr>
					  </table>
		  </tr>
		  <tr>
			  <td align="center" style="padding: 30px 30px 30px 30px;">
				  Barnes Backstars,&copy; 2020<br />
			  </td>
		  </tr>
	  </table>
  </body>
  `;

    return { html };
  }
}

export default ApprovalEmail;
