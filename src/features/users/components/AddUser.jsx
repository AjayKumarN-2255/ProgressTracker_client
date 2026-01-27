import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation, nameValidation } from '../../../utils/validations';
import useManageUser from "../hooks/useManageUser";
import { useEffect } from "react";


function AddUser({ role, designation }) {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { handleAddUser, loading, error } = useManageUser();
    const heading = role == 'admin' ? 'Admin' : 'Employee';

    const handleAddnewUser = (payLoad) => {
        handleAddUser(payLoad);
        reset();
    }

    useEffect(() => {
        reset({
            role: role,
        });
    }, [role, reset]);

    return (
        <div className='border-2 border-gray-100  rounded-lg w-full max-w-xl p-6 bg-white'>
            <form className='flex flex-col gap-10'
                onSubmit={handleSubmit(handleAddnewUser)}>
                <h1 className='text-center text-xl font-semibold'>Add {heading}</h1>
                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Name:</label>
                    <input
                        type="text"
                        {...register("name", nameValidation)}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter username"
                    />
                </div>
                {errors?.name && <p className="text-red-500">{errors?.name?.message}</p>}

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Email:</label>
                    <input
                        type="email"
                        {...register("email", emailValidation)}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email"
                    />
                </div>
                {errors?.email && <p className="text-red-500 space-y-2">{errors?.email?.message}</p>}

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Role:</label>
                    <input
                        disabled
                        {...register("role")}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email"
                    />
                </div>

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row relative">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Designation:</label>
                    <div className="relative flex-1">
                        <select
                            {...register("designation")}
                            className="appearance-none w-full border border-gray-300 rounded-md px-4 py-2 pr-10 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {
                                designation.map((each, ind) => (
                                    <option key={ind}>
                                        {each}
                                    </option>
                                ))
                            }
                        </select>
                        {/* Custom arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                                className="w-4 h-4 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
                {errors?.designation && <p className="text-red-500 mt-1">{errors?.designation?.message}</p>}

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium w-full max-w-28">Password:</label>
                    <input
                        type="password"
                        {...register("password", passwordValidation)}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                {errors?.password && <p className="text-red-500 space-y-2">{errors?.password?.message}</p>}

                <div className='flex justify-start'>
                    <button
                        type="submit"
                        className="bg-blue-600 max-w-lg w-full text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    >
                        {loading ? 'Loading' : `Add ${role}`}
                    </button>
                </div>
                {error && <p className="text-red-500 space-y-2">{error}</p>}
            </form>
        </div>
    )
}

export default AddUser;