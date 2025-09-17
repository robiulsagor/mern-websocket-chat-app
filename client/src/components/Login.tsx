import { useForm } from "react-hook-form";

type FormValues = {
    email: string;
    password: string;
}

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }

    return (
        <div className="flex-1 h-full">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex flex-col justify-center ">
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

                <p className="text-right text-sm hover:underline cursor-pointer">Forgot password?</p>

                <button className="w-full bg-slate-900 text-white p-2 rounded hover:bg-slate-700 transition  cursor-pointer">Sign In</button>

                <p className="text-sm">Don't have an account? <span className="text-blue-500 hover:underline cursor-pointer">Sign Up</span></p>
            </form>
        </div>
    )
}

export default Login