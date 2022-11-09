const emailTemplates = {
    signUpAuth: {
        subject: process.env.APPLICATION_NAME + ' - OTP Verification',
        generateTemplate: (randomNumber) => {
            return `Thank You for choosing Piharwa <br>
            Your One Time Password (OTP) for Email Verification is <strong> ${randomNumber} </strong><br><br><p style="color:red;font-size:10px">Note : This OTP will expire in next 5 Minutes</p><br><br>
            Best Regards,<br>${process.env.APPLICATION_NAME} Admin Team`;
        }
    }

}

module.exports = emailTemplates;