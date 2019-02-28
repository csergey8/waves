const mailer = require('nodemailer');
const { purchase } = require("./purchase_template");
const  { resetPass } = require("./reset_password_template");
require('dotenv').config();
 
const getEmailData = (to, name, token, template, actionData) => {
  let data = null;

  switch(template) {
    case "welcome":
      data = {
        from: "Waves",
        to,
        subject: `Welocome to waves, ${name}`,
        html: "<bold>Welcome to our site. Thank you for register</bold>"
      }
    break;
    case "purchase":
      data = {
        from: "Waves",
        to,
        subject: `Thanks for shopping, ${name}`,
        html: purchase(actionData)
      }
    break;
    case "reset_password":
      data = {
        from: "Waves",
        to,
        subject: `Hey, reset your password`,
        html: resetPass(actionData)
      }  
    break;
    default:
      data;
  }

  return data
}

 const sendEmail = (to, name, token, type, actionData = null) => {

  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, (err,  res) => {
  if(err) {
    console.log(err)
  } else {
    console.log('Email send');
  }
  smtpTransport.close();
})

}

 module.exports = { sendEmail }