import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import EditProfileImage from "./EditProfileImage";
import useManageUser from "../hooks/useManageUser";

function EditAccountForm() {

    const { user } = useSelector(state => state.auth);
    const { register, handleSubmit, reset } = useForm();
    const { loading, error, handleAccount } = useManageUser();

    const onSubmit = (formData) => {
        handleAccount({ ...formData, userId: user?._id }, reset);
    };

    useEffect(() => {
        if (user) {
            reset({
                username: user.name || "",
                email: user.email || "",
                designation: user.designation || ""
            });
        }
    }, [user, reset]);

    return (
        <div className="border-2 border-gray-100 flex flex-col gap-2 rounded-lg w-full max-w-xl p-6">
            <EditProfileImage />
            <div className='border-2 border-gray-100  rounded-lg w-full max-w-xl p-6 bg-white'>
                <form className='flex flex-col gap-10'
                    onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-center text-xl font-semibold'>Edit Account</h1>
                    <div>
                        <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                            <label className="text-gray-700 font-medium max-w-28 w-full">Name:</label>
                            <input
                                type="text"
                                {...register("username")}
                                disabled={true}
                                className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">Email:</label>
                        <input
                            type="email"
                            {...register("email")}
                            disabled={true}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">Designation:</label>
                        <input
                            type="text"
                            disabled={true}
                            {...register("designation")}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you are Super Admin"
                        />
                    </div>

                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium w-full max-w-28">Password:</label>
                        <input
                            type="text"
                            {...register("password")}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium w-full max-w-28">New Password:</label>
                        <input
                            type="text"
                            {...register("new_password")}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className='flex justify-start'>
                        <button
                            type="submit"
                            className="bg-blue-600 max-w-lg w-full text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                        >
                            {loading ? 'Loading' : 'Edit Account'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 space-y-2">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default EditAccountForm;