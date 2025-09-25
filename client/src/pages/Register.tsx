import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";


type FormValues = {
    name: string
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    const fields = [
        { name: "name", type: "text", placeholder: "Name" },
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Password" },
        { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
    ] as const;

    const onSubmit = (data: FormValues) => {
        console.log(data);
        navigate("/email-verify")
    }

    return (
        <AuthLayout title="Beauty Chat" sideContent="Welcome back!" >

            {/* Register form begins */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                {
                    fields.map((field) => (
                        <div key={field.name}>
                            <InputField
                                type={field.type}
                                placeholder={field.placeholder}
                                register={register}
                                name={field.name}
                                error={errors[field.name as keyof FormValues]?.message as string}
                            />
                        </div>
                    ))
                }

                <button className="w-full bg-slate-900 text-white p-2 rounded hover:bg-slate-700 transition  cursor-pointer">Sign Up</button>


            </form>
            {/* Register form ends */}

            <p className="text-sm mt-2 lg:mt-4">Already have an account?
                <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigate("/login")}> Sign In</span>
            </p>

        </AuthLayout>
    )
}

export default Register