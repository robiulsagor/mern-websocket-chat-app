import OtpVerify from "@/components/OtpVerify";
import { Helmet } from "react-helmet";

const EmailVerify = () => {
    return (
        <>
            <Helmet>
                <title>Email Verification | Beauty Chat</title>
                <meta name="description" content="Verify your email address" />
            </Helmet>
            <section className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
                <OtpVerify />
            </section>
        </>
    )
}

export default EmailVerify;