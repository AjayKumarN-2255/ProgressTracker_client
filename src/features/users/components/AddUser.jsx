import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/useFetch";
import { emailValidation, passwordValidation, nameValidation } from '../../../utils/validations';
import CustomDesignationSelect from "./CustomSelect";
import useManageUser from "../hooks/useManageUser";
import { useEffect } from "react";


function AddUser({ role }) {

    const { register, reset, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
    const { data: designation, setData: setDesgn } = useFetch("/desgn", {
        params: { role }
    })
    const { handleAddUser, loading, error,
        handleDeleteDesgn, handleAddDesignation } = useManageUser();
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
                <div>
                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">
                            Name:
                        </label>

                        <input
                            type="text"
                            {...register("name", nameValidation)}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="flex">
                        <div className="text-gray-700 font-medium max-w-32 w-full">
                        </div>
                        {errors?.name && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors?.name?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">
                            Email:
                        </label>

                        <input
                            type="email"
                            {...register("email", emailValidation)}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="flex">
                        <div className="text-gray-700 font-medium max-w-32 w-full"></div>

                        {errors?.email && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors?.email?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Role:</label>
                    <input
                        disabled
                        {...register("role")}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email"
                    />
                </div>

                <div className="flex gap-3 md:items-start w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">
                        Designation:
                    </label>

                    <div className="flex-1 flex flex-col gap-3">

                        {/* Select */}
                        <div className="relative">
                            <CustomDesignationSelect
                                setDesgn={setDesgn}
                                setValue={setValue}
                                onDelete={handleDeleteDesgn}
                                designation={designation}
                            />
                        </div>

                        {/* Add designation box */}
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter new designation"
                                {...register("newDesignation")}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    const name = getValues("newDesignation");
                                    handleAddDesignation(
                                        { name, role },
                                        setDesgn
                                    );
                                    setValue("newDesignation", "");
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-md transition"
                            >
                                Add
                            </button>
                        </div>
                        {errors?.designation && (
                            <p className="text-red-500">{errors?.designation?.message}</p>
                        )}
                    </div>
                </div>

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