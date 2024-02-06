import express from 'express';
import { default as authorization } from "../middleware/authorization.js";
import { createTransport } from 'nodemailer';
import { contactTemplate } from '../mail/contactUsTemplate.js';
import { fileURLToPath } from 'url';
import path,  { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactEmail = createTransport({
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
    html: contactTemplate(name, email, message),
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

export default router;