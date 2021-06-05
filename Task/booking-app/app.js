let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let nodemailer = require('nodemailer');
let cors=require('cors')
let indexRouter = require('./routes/index');
const { mainModule } = require('process');


let app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


async function main(){

   await app.post("/send",(req,res)=>{
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
          ciphers:'SSLv3'
        },
      auth: {
        user: req.body.email,
        pass: req.body.password
      }
    });

    let mailOptions = {
      from: req.body.email,
      to: req.body.email,
      subject: 'Booking Details',
      text: req.body.content
    };

    try {
       transporter.sendMail(mailOptions, (error, info)=>{
      if (error) {
        console.log(error);
      } else {
        
        console.log('Email sent: ' + info.response);
        res.status(200);
      }
    });
    } catch (error) {
      throw error
    }
    

})
  

}

main().catch(console.error);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4000, () => {
    console.log("app listening on port 4000");
});

module.exports = app;
