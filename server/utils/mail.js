const mailer = require('nodemailer');
require('dotenv').config();
 
const getEmailData = (to, name, token, template) => {
  let data = null;

  switch(template) {
    case 'welcome':
      data = {
        from: "Waves",
        to,
        subject: `Welocome to waves, ${name}`,
        html: "<bold>Welcome to our site. Thank you for register</bold>"
      }
    break;
    default:
      data;
  }

  return data
}

 const sendEmail = (to, name, token, type) => {

  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mail = getEmailData(to, name, token, type);

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