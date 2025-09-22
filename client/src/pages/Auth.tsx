import { useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"
import { AnimatePresence, motion } from "motion/react"

const Auth = () => {
    const [mode, setMode] = useState("login") // login or register

    return (
        <main className="bg-slate-200 h-screen flex justify-center items-center">
            <section className={`flex ${mode === "register" && "flex-row-reverse"} items-center bg-white p-10 rounded-lg  gap-5 min-h-[400px] min-w-[800px]`}>
                <AnimatePresence>
                    <motion.div key="text" exit={{ opacity: 0, y: -200, animationDuration: 0.3 }} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                        className="flex-1 flex flex-col justify-center items-center pr-10">
                        <div className="text-center space-y-5">
                            <h2 className="text-3xl ">Beauty Chat</h2>
                            Welcome again!
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div className=" flex-1">

                    {
                        mode === "register" ? (<>
                            <Register />
                            <p className="text-sm mt-2 lg:mt-4">Already have an account? <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setMode("login")}>Sign In</span></p>
                        </>
                        ) : (
                            <>
                                <Login />
                                <p className="text-sm mt-2 lg:mt-4">Don't have an account?
                                    <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setMode("register")}> Sign Up</span>
                                </p>
                            </>
                        )
                    }


                </div>


            </section>
        </main>
    )
}

export default Auth