import { AnimatePresence, motion } from "motion/react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import OtpVerify from "@/components/OtpVerify";

import { Helmet } from "react-helmet";
import StepEmail from "@/components/forgot-password/StepEmail";

const ForgotPassword = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [isExiting, setIsExiting] = useState(false);

    const handleGoBack = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate(-1);
        }, 300); // Duration should match the exit animation duration
    }


    return (
        <>
            <Helmet>
                <title>Reset Password | Beauty Chat</title>
                <meta name="description" content="Reset your password" />
            </Helmet>
            <AnimatePresence mode="wait" onExitComplete={() => setIsExiting(false)}>
                {!isExiting && (
                    <motion.section initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.3 }}
                        className="min-h-screen flex items-center justify-center bg-gray-100 p-2">

                        {
                            step === 1 ? (
                                <StepEmail
                                    goBack={handleGoBack}
                                    loading={loading}
                                    error={error}
                                    setError={setError}
                                    success={success}
                                    setSuccess={setSuccess}
                                    invalidEmail={invalidEmail}
                                    setInvalidEmail={setInvalidEmail}
                                    email={email}
                                    setEmail={setEmail}
                                    setLoading={setLoading}
                                    setStep={setStep}
                                    key={"step-email"}
                                />
                            )
                                : step === 2 ? (
                                    <OtpVerify email={email} page="forgot-password" />
                                )
                                    : (
                                        <h2>Password Reset form</h2>
                                    )
                        }


                    </motion.section >
                )}
            </AnimatePresence>
        </>
    )
}

export default ForgotPassword