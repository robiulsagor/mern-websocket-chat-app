import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";

type InputFieldProps<T extends FieldValues> = {
    type: string;
    placeholder: string;
    register: UseFormRegister<T>;
    name: Path<T>;
    error?: string;
}

const InputField = <T extends FieldValues>({ type, placeholder, register, name, error }: InputFieldProps<T>) => {
    return (
        <div>
            <input
                {...register(name, { required: `${placeholder} is required` })}
                type={type}
                placeholder={placeholder}
                className="w-full bg-slate-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AnimatePresence>
                {error && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                    className="mt-1 ml-1 text-red-700 text-sm">{error}</motion.p>}
            </AnimatePresence>
        </div>
    )
}

export default InputField