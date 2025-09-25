import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";

type FormValues = {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    const fields = [
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Password" },
    ] as const;

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }

    return (
        <AuthLayout title="Beauty Chat" sideContent="Welcome back!" >

            {/* login form begins */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5  ">
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

                <p className="text-right text-sm hover:underline cursor-pointer">Forgot password?</p>

                <button className="w-full bg-slate-900 text-white p-2 rounded hover:bg-slate-700 transition  cursor-pointer">Sign In</button>


            </form>
            {/* login form ends */}


            <p className="text-sm mt-2 lg:mt-4">Don't have an account?
                <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigate("/register")}> Sign Up</span>
            </p>





        </AuthLayout>

    )
}

export default Login