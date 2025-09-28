import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { KeySquare, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "motion/react"
import LoadingButton from "../LoadingButton"
import { useEffect, useState } from "react"
import SuccessMessage from "../SuccessMessage"
import axios from "axios"

type ResetPasswordInputs = {
    password: string;
    confirmPassword: string;
}

const StepResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState:
        { errors, isSubmitting
        } } = useForm<ResetPasswordInputs>()

    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data: ResetPasswordInputs) => {

        try {
            const res = await axios.post("http://localhost:5000/api/mock", data);
            console.log(res.data);
            if (res.data) {
                console.log("Mock API call successful:", res.data);
                setSuccess(true);
            } else {
                console.log("Mock API call failed");
            }

        } catch (error) {
            console.error("Error resetting password:", error);
        }

    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                // navigate("/")
                setSuccess(false)
            }, 2500);
            return () => clearTimeout(timer)
        }
    }, [success, navigate])

    return (
        <Card className=" w-full max-w-[500px] min-h-[300px]">
            <CardHeader>
                <CardTitle><div className="flex items-center gap-2">
                    <KeySquare /> <span className="text-xl"> Reset your password</span></div></CardTitle>
                <CardDescription>
                    Please kindly set your new password..
                </CardDescription>
                <CardAction><X onClick={() => navigate(-1)} className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-800" /></CardAction>
            </CardHeader>

            <CardContent className="px-6 pb-2">
                {
                    success ? <SuccessMessage text="Password has been reset!" /> : (
                        <form onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="new-password" className="text-sm text-slate-500">Please enter New Password</label>

                                <input
                                    type="password"
                                    placeholder="Please enter new password"
                                    autoComplete={"off"}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters long" }
                                    })}
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <AnimatePresence mode="wait" key={'password'}>
                                    {errors.password && <motion.p key={'ani1'}
                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                                        className="mt-1 ml-1 text-red-700 text-sm">{errors.password?.message}</motion.p>}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="confirm-password" className="text-sm text-slate-500">Please enter Confirm Password</label>

                                <input
                                    type="password"
                                    placeholder="Please enter new password"
                                    autoComplete={"off"}
                                    {...register("confirmPassword", {
                                        required: "Confirm Password is required",
                                        validate: (value, formValues) => value === formValues.password || "Passwords do not match"
                                    })}
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <AnimatePresence mode="wait" key={'confirmPassword'}>
                                    {errors.confirmPassword && <motion.p key={'ani2'}
                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                                        className="mt-1 ml-1 text-red-700 text-sm">{errors.confirmPassword?.message}</motion.p>}
                                </AnimatePresence>
                            </div>

                            <Button type="submit" size={"lg"} className="text-sm w-full">
                                {isSubmitting ? <LoadingButton /> : "Reset Password"}
                            </Button>
                        </form>
                    )
                }

            </CardContent>
        </Card >
    )
}

export default StepResetPassword