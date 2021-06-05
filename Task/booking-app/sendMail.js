let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
   host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
  auth: {
    user: 'taha_h.love@hotmail.com',
    pass: '132798'
  }
});

let mailOptions = {
  from: 'taha_h.love@hotmail.com',
  to: 'tahayaseen4977@gmail.com',
  subject: 'Booking Details',
  text: `email send successfully`
};

transporter.sendMail(mailOptions, (error, info)=>{
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});