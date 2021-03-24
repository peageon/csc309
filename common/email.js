const nodemailer = require("nodemailer");

const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.ethereal.email";
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_SECURE = process.env.EMAIL_SECURE || false;
const EMAIL_USER = process.env.EMAIL_USER || "gilda0@ethereal.email";
const EMAIL_PASS = process.env.EMAIL_PASS || "zX8dn8qwb6erEVGMyX";
const EMAIL_FROM = '"Projects Admin" <admin@projects.com>';
const APP_HOST = process.env.APP_HOST || "http://localhost:3000";

// Semds am email
const sendEmail = (email) => {
  //const useEthereal = ((EMAIL_HOST === "smtp.ethereal.email" ) ? true : false );

  return new Promise((resolve, reject) => {

      let transporter = nodemailer.createTransport({
          host: EMAIL_HOST,
          port: EMAIL_PORT, //EMAIL_PORT,
          secure: EMAIL_SECURE, // true for 465, false for other ports (ex: 587)
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
          }
      });

      transporter.sendMail(email)
      .then(response => {
          console.log(response);
          resolve({status: response});
      })
      .catch(error => {
          console.log(error);
          resolve({error: error.message}); // server error
      });
   });
}

sendSignUpEmail = (user) => {
  const emailText1 = "Thanks for signing up with Projects!";
  const emailText2 = "You must follow this link to activate your account: ";
  const emailLink = APP_HOST + "/confirm/" + user._id ;

  // send an email
  const email = {
      from: EMAIL_FROM,
      to: user.email,
      subject: "Confirm your account on Projects",
      text: emailText1+" "+emailText2 + emailLink,
      html: "<b>" + emailText1 + "</br>" + emailText2 + "</b></br>" +
            "<a href=\"" + emailLink +"\">"+emailLink+"</a>"
  };

  sendEmail(email);
}

sendForgotPasswordEmail = (user) => {
  const emailText1 = "Click the link below to reset your password: ";
  const emailText2 = "";
  const emailLink = APP_HOST + "/resetpassword/" + user._id ;

  // send an email
  const email = {
      from: EMAIL_FROM,
      to: user.email,
      subject: "Forgot password for your account on Projects",
      text: emailText1+" "+emailText2 + emailLink,
      html: "<b>" + emailText1 + "</br>" + emailText2 + "</b></br>" +
            "<a href=\"" + emailLink +"\">"+emailLink+"</a>"
  };

  sendEmail(email);
}

module.exports = { sendEmail, sendSignUpEmail, sendForgotPasswordEmail }
