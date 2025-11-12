require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    // Create transporter with better error handling
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.FROM_EMAIL || "sonidhruv557@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "xmumeqmjkldqfxxu",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log("SMTP server is ready to take our messages");

    // Define email options
    const mailOptions = {
      from: `${process.env.FROM_NAME || "Dhruv Soni"} <${
        process.env.FROM_EMAIL || "sonidhruv557@gmail.com"
      }>`,
      to: options.to || options.email, // Support both 'to' and 'email' properties
      subject: options.subject,
      text: options.text || options.message, // Support both 'text' and 'message' properties
      html:
        options.html ||
        `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Message Received</h2>
      <p style="color: #666; line-height: 1.6;">${(
        options.text ||
        options.message ||
        ""
      ).replace(/\n/g, "<br>")}</p>
      ${
        options.resetUrl
          ? `
      <div style="margin: 20px 0;">
        <a href="${options.resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      </div>
      `
          : ""
      }
      <p style="color: #999; font-size: 12px;">This is an automated message from your portfolio contact form.</p>
    </div>
  `,
    };

    console.log("Attempting to send email to:", options.to || options.email);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email sending failed:", error);

    // Provide more specific error messages
    let errorMessage = "Email could not be sent";

    if (error.code === "EAUTH") {
      errorMessage =
        "Email authentication failed. Please check your email credentials.";
    } else if (error.code === "ECONNECTION") {
      errorMessage =
        "Could not connect to email server. Please try again later.";
    } else if (error.code === "EMESSAGE") {
      errorMessage = "Invalid email message format.";
    }

    throw new Error(errorMessage);
  }
};

module.exports = { sendEmail };
