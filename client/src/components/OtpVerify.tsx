import { AnimatePresence, motion } from "motion/react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Check, MailCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCountdown from "@/hooks/useCountdown";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton.tsx";
import { formatTime } from "../../utils/formatTime";
import SuccessMessage from "./SuccessMessage.tsx";

const TIMER_DURATION = 120; // 2 minutes


const OtpVerify = ({ email, onSuccess }: { email?: string | undefined, onSuccess?: () => void }) => {
    const navigate = useNavigate()
    const [sentCode, setSentCode] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [otp, setOtp] = useState("");
    const { secondsLeft, reset } = useCountdown(TIMER_DURATION);

    const resendCode = () => {
        if (secondsLeft > 0) return;
        setError("");
        // Logic to resend the code goes here
        setSentCode(true);
        reset();
        setTimeout(() => {
            setSentCode(false);
        }, 3000);
    }

    const submitOtp = (otp: string) => {
        if (otp.length < 6) {
            setError("Please enter a valid OTP");
            return;
        } else {
            setError("");
            setLoading(true);
            console.log("Submitting OTP:", otp);

            setTimeout(() => {
                setLoading(false);
                const isValid = Math.random() < 0.5;
                if (isValid) {
                    setSuccess(true);
                } else {
                    setError("Invalid OTP, please try again.");
                    setOtp("");
                }

            }, 2000);
        }
        // Add your OTP submission logic here
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
                if (onSuccess) onSuccess();
                setOtp("");
                // For demo purposes, we reset the state instead of navigating  
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, onSuccess]);




    return (
        <Card className=" w-full max-w-[500px] min-h-[300px]">
            <CardHeader>
                <CardTitle><div className="flex items-center gap-2">
                    <MailCheck /> <span className="text-xl"> Check your email</span></div></CardTitle>
                <CardDescription>
                    Enter the verification code sent to: <span className="font-semibold"> {email}</span>
                </CardDescription>
                <CardAction><X onClick={() => navigate(-1)} className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-800" /></CardAction>
            </CardHeader>

            {success ? (
                <SuccessMessage text="Email verified!" />
            ) : (
                <>
                    <CardContent className=" text-center mx-auto">
                        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            value={otp} onChange={(value) => setOtp(value)}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        <AnimatePresence>
                            {error && <motion.p initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}
                                className="text-sm text-red-600 mt-2 flex gap-1 items-center"><X className="h-5 w-5" /> {error}</motion.p>}
                        </AnimatePresence>

                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className="w-full">
                            {
                                success ?
                                    (
                                        <motion.p className="text-sm text-green-600 mb-2 flex items-center justify-center gap-1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                            <Check /> Email verified successfully! Redirecting...</motion.p>
                                    ) : (
                                        <Button onClick={() => submitOtp(otp)} disabled={loading}
                                            className="w-1/2">
                                            {loading ? <LoadingButton /> : "Verify"}
                                        </Button>
                                    )
                            }
                        </div>

                        <div className="flex flex-col items-center justify-between text-gray-700">
                            <AnimatePresence>
                                {
                                    sentCode && <motion.p className="text-sm text-green-600 flex items-center" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                        <Check /> Code resent successfully!</motion.p>
                                }
                            </AnimatePresence>

                            <p className="text-sm">Didn't receive a code?
                                <button
                                    className={` ${secondsLeft > 0 || loading ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:underline cursor-pointer"}`} disabled={secondsLeft > 0 || loading} aria-disabled={`${secondsLeft > 0 ? "true" : "false"}`}
                                    onClick={resendCode}>
                                    &nbsp; Resend Code
                                </button></p>
                            <p className="text-xs"> {formatTime(secondsLeft)} </p>
                        </div>
                    </CardFooter></>
            )}
        </Card>
    )
}

export default OtpVerify