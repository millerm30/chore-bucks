const router = require('express').Router();
const authorization = require('../middleware/authorization');
const nodemailer = require('nodemailer');
const contactUs = require('../mail/contactUsTemplate');
const path = require('path');

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASSWORD,
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Ready to send');
    }
});

router.post('/email', authorization, async (req, res) => {
  const { name, email, message } = req.body;
  const mail = {
    from: name,
    to: process.env.CONTACT_EMAIL,
    subject: "Chore Bucks Contact Form Message!",
    html: contactUs(name, email, message),
    attachments: [
      {
        filename: "chorebucks.png",
        path: path.join(__dirname, "../mail/chorebucks.png"),
        cid: "logo",
      },
    ],
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: 'ERROR' });
    } else {
      res.json({ status: 'Message Sent' });
    }
  });
});

module.exports = router;