/** supplier email template */
class SupplierEmail {
  /**
   * Generates new supplier email template
   * @param {object} user - user details
   * @param {string} loginLink  - login link
   * @returns {object} supplier email template
   */
  static supplierTemplate(user, loginLink) {
    const html = `
	<body style="margin: 0; padding: 0;">
	<table border="0" cellpadding="0" cellspacing="0" width="900px"
		style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
		<tr>
			<td align="center" style="background-color:#f9fcff; margin: 0 50px 0 50px;">
				<a>
					<img src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg" alt="Barnes Backstars" width="120" height="100" style="display: block;>
				</a>
        	</td>
		</tr>
		<td align=" center" style="padding: 0 50px 0 50px;">
					<table border="0" cellpadding="0" cellspacing="0" width="100%"
						style="background-color:#ffffff; padding: 0 0 0 20px;">
						<tr>
							<td align="center" style="font-family: Arial, sans-serif; font-size: 24px; color: #050505;">
								<p>Hi ${user.firstName},</p>
							</td>
						</tr>
						<tr>
							<td align="center"
								style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
								<p>You are invited to add your facility to our site</p>
							</td>
						</tr>
						<tr>
							<td align="center"
								style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
								<p>Below are your login credentials</p>
							</td>
						</tr>
						<tr>
							<td align="center">
								<p>
									<strong>Email: ${user.userEmail}</strong><br><strong>Password: ${user.password}</strong>
								</p>
							</td>
						</tr>
						<tr>
							<td align="center"
								style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
								<p>Looking forward to working with you.</p>
								<a href=${loginLink}>
									<button
										style="background-color: #1976D2; border-radius: 5px; width: 30%; font-size: 16px; height: 30px; color: white">
										Login
									</button>
								</a>
								<p>contact <a href=#>support@barnes-backstars</a> for more information</p>
								<p>Thank you for working with Barnes Backstars</p>
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
</body>`;

    return { html };
  }
}
export default SupplierEmail;
