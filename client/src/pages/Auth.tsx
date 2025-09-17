import Login from "../components/Login"

const Auth = () => {
    return (
        <main className="bg-slate-200 h-screen flex justify-center items-center">
            <section className="flex items-center bg-white p-10 rounded-lg  gap-5 min-h-[400px] min-w-[800px]">
                <div className="flex-1 flex flex-col justify-center items-center  pr-10">
                    <div className="text-center space-y-5">
                        <h2 className="text-3xl ">Beauty Chat</h2>
                        Welcome again!
                    </div>
                </div>
                <Login />
            </section>
        </main>
    )
}

export default Auth