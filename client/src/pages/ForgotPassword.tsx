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

import { Lock, Mail, X } from "lucide-react"
import { useState } from "react"
import { validateEmail } from "../../utils/validateEmail"
import { useNavigate } from "react-router-dom";
import LoadingButton from "@/components/LoadingButton";
import OtpVerify from "@/components/OtpVerify";

import { Helmet } from "react-helmet";

const ForgotPassword = () => {
    const [step, setStep] = useState<1 | 2 | 3>(2);
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setEmail(e.target.value);
        setInvalidEmail(false);
    }

    const handleSubmit = async () => {
        if (email === "") {
            setError("A valid email  is required");
            setInvalidEmail(true);
            return;
        } else {
            if (!validateEmail(email)) {
                setError("Please enter a valid email address");
                setInvalidEmail(true);
                return;
            }

            setError("");
            setLoading(true);

            // Simulate API call
            setTimeout(() => {
                if (email === "") {
                    setError("A valid email is required");
                } else {
                    setSuccess(true);
                    setStep(2)
                }
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <>
            <Helmet>
                <title>Reset Password | Beauty Chat</title>
                <meta name="description" content="Reset your password" />
            </Helmet>
            <section className="min-h-screen flex items-center justify-center bg-gray-100 p-2">

                {
                    step === 1 ? (
                        <Card className=" w-full max-w-[500px] min-h-[300px]">
                            <CardHeader>
                                <CardTitle><div className="flex items-center gap-2">
                                    <Lock /> <span className="text-xl"> Forgot your password?</span></div></CardTitle>
                                <CardDescription>
                                    Enter your email address to reset your password.
                                </CardDescription>
                                <CardAction><X onClick={() => navigate('/login')} className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-800" /></CardAction>
                            </CardHeader>

                            <CardContent className="">
                                <div className="w-full ">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email address</label>
                                    <div className={`relative mt-1 ${loading || success ? 'opacity-50 cursor-no-drop' : ''}`}>
                                        <Mail className="h-5 w-5 absolute mt-2.5 ml-3 text-gray-400 select-none" />
                                        <input type="email" id="email" value={email} onChange={handleChange} placeholder="Enter your email"
                                            disabled={loading || success}
                                            className={`mt-1 px-2 py-2 ps-10 block w-full border ${invalidEmail ? 'border-red-500' : 'border-gray-300'}  text-gray-800 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed`} />

                                        {/* show error message if there is any */}
                                        <AnimatePresence>
                                            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="text-sm text-red-600 mt-2 flex gap-1 items-center"><X className="h-5 w-5" /> {error}</motion.p>}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-4">
                                <div className="w-full">
                                    <button type="button" onClick={handleSubmit}
                                        disabled={loading || success}
                                        className="w-full bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-600">
                                        {
                                            loading ? (
                                                <LoadingButton />
                                            ) : success ? 'Email Sent' : 'Send Email'
                                        }
                                    </button>
                                </div>
                            </CardFooter>

                        </Card>
                    )
                        : step === 2 ? (
                            <OtpVerify />
                        )
                            : (
                                <h2>Password Reset form</h2>
                            )
                }


            </section >
        </>
    )
}

export default ForgotPassword