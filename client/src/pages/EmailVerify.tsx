
import { AnimatePresence, motion } from "motion/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Check, MailCheck } from "lucide-react"
import { useState } from "react"
import { formatTime } from "../../utils/formatTime"
import useCountdown from "@/hooks/useCountdown";

const TIMER_DURATION = 5; // 2 minutes

const EmailVerify = () => {
    const [sentCode, setSentCode] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

    const submitOtp = () => {
        if (otp.length < 6) {
            setError("Please enter a valid OTP");
            return;
        } else {
            setError("");
            setLoading(true);
        }
        console.log("Submitted OTP:", otp);
        // Add your OTP submission logic here
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100">

            <Card className="max-w-[550px] min-w-[500px]">
                <CardHeader>
                    <CardTitle><div className="flex items-center gap-2">
                        <MailCheck /> Verify your email</div></CardTitle>
                    <CardDescription>A six digit confirmation code is sent to: sag****@gmail.com

                        <br />
                        Please enter the code below to verify your email address.
                    </CardDescription>
                    {/* <CardAction>Card Action</CardAction> */}

                </CardHeader>
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
                    {error && <p className="text-xs text-red-600 mt-2">{error}</p>}

                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <div>

                        <button onClick={submitOtp} className="w-full bg-slate-800 disabled:bg-slate-800 disabled:opacity-80 text-white p-2 px-5 rounded-full hover:bg-slate-700 transition cursor-pointer text-sm flex items-center justify-center gap-2
                        disabled:cursor-not-allowed "
                            disabled={loading} >
                            {loading && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            )}
                            {loading ? "Verifying..." : "Verify Email"}
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-between text-gray-700">
                        <AnimatePresence>

                            {
                                sentCode && <motion.p className="text-xs text-green-600 flex items-center" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                    <Check /> Code resent successfully!</motion.p>
                            }
                        </AnimatePresence>

                        <p className="text-xs">Didn't receive a code?
                            <button
                                className={` ${secondsLeft > 0 || loading ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:underline cursor-pointer"}`} disabled={secondsLeft > 0 || loading} aria-disabled={`${secondsLeft > 0 ? "true" : "false"}`}
                                onClick={resendCode}>
                                &nbsp; Resend Code
                            </button></p>
                        <p className="text-xs"> {formatTime(secondsLeft)} </p>
                    </div>
                </CardFooter>
            </Card>

        </section>
    )
}

export default EmailVerify