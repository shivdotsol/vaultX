import { Resend } from "resend";
import { OtpEmail } from "../emails/OtpEmail";
import dotenv from "dotenv";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOtp(otp: number, firstName: string, to: string) {
    const props = {
        firstName,
        otp,
    };
    try {
        const resendResponse = await resend.emails.send({
            from: "VaultX <noreply@vaultx.shivtiwari.com>",
            to,
            subject: "Verification OTP for VaultX",
            react: OtpEmail(props),
        });
        return resendResponse;
    } catch (e) {
        console.log(e);
    }
}

export default sendOtp;
