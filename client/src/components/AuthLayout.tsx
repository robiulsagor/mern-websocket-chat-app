import { AnimatePresence, motion } from "motion/react";

type AuthLayoutProps = {
    title: string;
    children: React.ReactNode;
    sideContent?: React.ReactNode;
};

const AuthLayout = ({ title, children, sideContent }: AuthLayoutProps) => {
    return (
        <main className="bg-slate-200 h-screen flex justify-center items-center">
            <section className="flex flex-col md:flex-row items-center bg-white p-10 rounded-lg gap-5 min-h-[400px] md:min-w-[800px]">
                <AnimatePresence>
                    <motion.div
                        key="text"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 flex flex-col justify-center items-center pr-10"
                    >
                        <div className="text-center space-y-5">
                            <h2 className="text-3xl">{title}</h2>
                            {sideContent}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1"
                >
                    {children}
                </motion.div>
            </section>
        </main>
    );
};

export default AuthLayout;
