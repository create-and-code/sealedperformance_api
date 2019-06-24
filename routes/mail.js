const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
const config = require("config");

router.post("/", (req, res) => {
  const transporter = nodeMailer.createTransport({
    host: "mail3.gridhost.co.uk",
    port: 465,
    secure: true,
    auth: {
      user: "test@createandcode.co.uk",
      pass: config.get("mailPassword")
    }
  });

  const mailOptions = {
    from: `${req.body.name} <${req.body.email}>`, // sender address
    to: '"Jamie Seal" <s.chattaway@hotmail.co.uk>',
    subject: req.body.subject,
    html: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.send("Message sent!");
  });
});

module.exports = router;
