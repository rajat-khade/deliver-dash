var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rotinga9@gmail.com',
    pass: 'rotirotiroti'
  }
});

var mailOptions = {
  from: 'rotinga9@gmail.com',
  to: 'abhishekkumar102k@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});