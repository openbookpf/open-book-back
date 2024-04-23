require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function emailNotification(name, emailAddress, orderID, totalValue) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"OpenBook Library 📕📖📗" < ${process.env.EMAIL}>`, // sender address
    to: emailAddress, // list of receivers
    subject: "Thanks for Your Purchase", // Subject line
    text: "Hello world?", // plain text body
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Purchase</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
        <div style="max-width: 400px; margin: 0 auto; background-color: #fff; border-radius: 10px; padding: 20px; height: fit-content">
          <img src="https://github.com/openbookpf/open-book-front/blob/dev/src/assets/TrasparentLightMoodLogo.png?raw=true" alt="OPENBOOK Logo" style="max-width: 100%; display: block; margin-bottom: 20px;">
          <h2 style="color: #333;">Thank You for Your Purchase!</h2>
          <p style="font-size: 16px;">Dear ${name},</p>
          <p style="font-size: 16px;">We wanted to take a moment to express our gratitude for your recent purchase from <b>OPEN BOOK Library</b>. Your support means a lot to us!</p>
          <p style="font-size: 16px;">Here are the details of your purchase:</p>
          <ul style="font-size: 16px;">
            <li><strong>Order ID:</strong> ${orderID}</li>
            <li><strong>Price:</strong> $${totalValue}</li>
          </ul>
          <p style="font-size: 16px;">Your order will be delivered to the address listed in your profile account within the next two business days. If you have any questions about your order or need further assistance, please don't hesitate to contact us. We're always happy to help!</p>
          <p style="font-size: 16px;">Thank you again for choosing OPEN BOOK Library. We hope you enjoy your new book!</p>
          <p style="font-size: 16px;">Best regards,</p>
          <p style="font-size: 16px;">The OPENBOOK Library Team</p>
          <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
          <p style="font-size: 12px; color: #777; text-align: center;">This email was sent to ${emailAddress}. If you received this email by mistake, please disregard it.</p>
        </div>
      </body>
      </html>
    `,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = emailNotification;
