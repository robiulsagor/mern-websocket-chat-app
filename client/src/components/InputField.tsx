type InputFieldProps = {
    type: string;
    placeholder: string;
    register: any;
    name: string;
    error?: string;
}

const InputField = ({ type, placeholder, register, name, error }: InputFieldProps) => {
    return (
        <div>
            <input
                {...register(name, { required: `${placeholder} is required` })}
                type={type}
                placeholder={placeholder}
                className="w-full bg-slate-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="mt-1 ml-1 text-red-700 text-sm">{error}</p>}
        </div>
    )
}

export default InputField