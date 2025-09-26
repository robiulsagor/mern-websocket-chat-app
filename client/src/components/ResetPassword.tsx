import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MailCheck, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {
    const navigate = useNavigate()
    return (
        <Card className=" w-full max-w-[500px] min-h-[300px]">
            <CardHeader>
                <CardTitle><div className="flex items-center gap-2">
                    <MailCheck /> <span className="text-xl"> Reset your password</span></div></CardTitle>
                <CardDescription>
                    Please kindly set your new password..
                </CardDescription>
                <CardAction><X onClick={() => navigate(-1)} className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-800" /></CardAction>
            </CardHeader>
        </Card>
    )
}

export default ResetPassword