import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

type FormValues = {
    name: string
    email: string;
    password: string;
}

const Register = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }

    return (
        <AuthLayout title="Beauty Chat" sideContent="Welcome back!" >

            {/* Register form begins */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                <div>
                    <input
                        {...register("name", { required: "Name is required" })}
                        type="text" placeholder="Name" className="w-full bg-slate-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.name && <p className="mt-1 ml-1 text-red-700 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                    <input
                        {...register("email", { required: "Email is required" })}
                        type="email" placeholder="Email" className="w-full bg-slate-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.email && <p className="mt-1 ml-1 text-red-700 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <input
                        {...register("password", { required: "Password is required" })}
                        type="password" placeholder="Password" className="w-full bg-slate-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.password && <p className="mt-1 ml-1 text-red-700 text-sm">{errors.password.message}</p>}
                </div>


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