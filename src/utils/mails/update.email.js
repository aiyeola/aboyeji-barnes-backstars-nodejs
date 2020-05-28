/** user update email template */
class UpdateEmail {
  /**
   * Template for notifying update of user requests
   * @param {object} data
   *  @returns {object} email to be sent
   */
  static updateTemplate(data) {
    const html = `
	  <body style="margin: 0; padding: 0;">
	<table border="0" cellpadding="0" cellspacing="0" width="900px"
		style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
		<tr>
			<td align="center" style="background-color:#f9fcff; margin: 0 50px 0 50px;">
				<a>
					<img src="" alt="Barnes Backstars" width="120" height="100" style="display: inline-block;>
              	</a>
			  </td>
		</tr>
			<tr>
			  <td align=" center" style="padding: 0 50px 0 50px;">
					<table border="0" cellpadding="0" cellspacing="0" width="100%"
						style="background-color:#ffffff; padding: 0 0 0 20px;">
						<tr>
							<td align="center"
								style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
							</td>
						</tr>
						<tr>
							<td align="center">
								<p style=" font-family: Arial, sans-serif; font-size: 16px;">User ${data.user} has made
									changes to their requests</p>
							</td>
						</tr>
						<tr>
							<td align="center"
								style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
								<p><strong>Updated At:</strong> ${data.updatedAt}</p>
								<p>Don't want to receive such emails from barefootNomad? <a
										href="${data.unsubscribeUrl}">Unsubscribe</a></p>
							</td>
						</tr>
					</table>
				</td>
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

export default UpdateEmail;
