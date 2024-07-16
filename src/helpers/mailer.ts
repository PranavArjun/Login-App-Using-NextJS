import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Configure mail for usage 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
                // Expiry 1 hour from now
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f1d434b0b799a3",
                pass: "7ca15840540af9"
            }
        });

        const mailOptions = {
            from: 'pranavarjun10@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;


    } catch (error: any) {
        throw new Error(error.message)
    }
}