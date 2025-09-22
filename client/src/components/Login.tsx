import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }

    return (
        <main className="bg-slate-200 h-screen flex justify-center items-center">
            <section className={`flex flex-col md:flex-row items-center bg-white p-10 rounded-lg  gap-5 min-h-[400px] md:min-w-[800px]`}>
                <AnimatePresence>
                    <motion.div key="text" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }}
                        className="flex-1 flex flex-col justify-center items-center pr-10">
                        <div className="text-center space-y-5">
                            <h2 className="text-3xl ">Beauty Chat</h2>
                            Welcome again!
                        </div>
                    </motion.div>
                </AnimatePresence>
                <motion.div key={"form"} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }} className=" flex-1">

                    {/* login form begins */}
                    <div className="flex-1 h-full">

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5  ">
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


                        </form>
                    </div>
                    {/* login form ends */}


                    <p className="text-sm mt-2 lg:mt-4">Don't have an account?
                        <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigate("/register")}> Sign Up</span>
                    </p>



                </motion.div>


            </section>
        </main>
    )
}

export default Login