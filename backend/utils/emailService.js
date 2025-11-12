require("dotenv").config();
const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (options) => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = "xsmtpsib-b1649552901d11ff0f5ff857a6fdb40fd448678db1cd69f6bb4da141ddfa0354-avf6K2Mq5w1DuDMr";

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
      sender: {
        name: process.env.FROM_NAME || "Dhruv Soni",
        email: process.env.FROM_EMAIL || "sonidhruv557@gmail.com",
      },
      to: [{ email: options.to || options.email }],
      subject: options.subject,
      htmlContent:
        options.html ||
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Message Received</h2>
          <p style="color: #666; line-height: 1.6;">
            ${(options.text || options.message || "").replace(/\n/g, "<br>")}
          </p>
          ${
            options.resetUrl
              ? `
          <div style="margin: 20px 0;">
            <a href="${options.resetUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
               text-decoration: none; border-radius: 5px; display: inline-block;">
               Reset Password
            </a>
          </div>`
              : ""
          }
          <p style="color: #999; font-size: 12px;">
            This is an automated message from your portfolio contact form.
          </p>
        </div>`,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully:", data.messageId || data);

    return { success: true, messageId: data.messageId || "N/A" };
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = { sendEmail };
