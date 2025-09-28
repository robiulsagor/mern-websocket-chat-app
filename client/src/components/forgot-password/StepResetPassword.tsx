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

type ResetPasswordInputs = {
    password: string;
    confirmPassword: string;
}

const StepResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState:
        { errors
        } } = useForm<ResetPasswordInputs>()

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (data: ResetPasswordInputs) => {
        console.log(data);
        setLoading(true)
        const timer = setTimeout(() => {
            console.log("Submitted! ", data);
            setSuccess(true)
            setLoading(false)
        }, 1000);

        return () => clearTimeout(timer)
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate("/")
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
                                    {...register("password", { required: "Password is required" })}
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
                                    {...register("confirmPassword", { required: "Confirm Password is required" })}
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <AnimatePresence mode="wait" key={'confirmPassword'}>
                                    {errors.confirmPassword && <motion.p key={'ani2'}
                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                                        className="mt-1 ml-1 text-red-700 text-sm">{errors.confirmPassword?.message}</motion.p>}
                                </AnimatePresence>
                            </div>

                            <Button type="submit" size={"lg"} className="text-sm w-full">
                                {loading ? <LoadingButton /> : "Reset Password"}
                            </Button>
                        </form>
                    )
                }

            </CardContent>
        </Card >
    )
}

export default StepResetPassword