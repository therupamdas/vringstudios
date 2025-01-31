import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { apiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email: string,
    username:string,
    verifyCode: string,
): Promise<apiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
        });
        return{success: true, message:'Succesfully sent email'}        
    } catch (emailerror) {
        console.error("Error sending verification email",emailerror)
        return{success: false, message:'Failed to send email'}  
    }

}