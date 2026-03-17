import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAdminUser from "../hooks/useAdminUser";
import { useParams } from "react-router-dom";

function EditUserForm() {

  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const { loading, error, handleAccount, user, designations } = useAdminUser(false, id);
  const onSubmit = (formData) => {
    handleAccount({ ...formData, userId: user?._id }, reset);
  };

  useEffect(() => {
    if (user) {
      reset({
        username: user.name || "",
        email: user.email || "",
        designation: user.designation?.trim() || ""
      });
    }
  }, [user,designations, reset]);

  return (
    <div className="border-2 border-gray-100 flex flex-col gap-2 rounded-lg w-full max-w-xl p-6">
      <div className='border-2 border-gray-100  rounded-lg w-full max-w-xl p-6 bg-white'>
        <form className='flex flex-col gap-10'
          onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-center text-xl font-semibold'>Edit User Account</h1>
          <div>
            <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
              <label className="text-gray-700 font-medium max-w-28 w-full">Name:</label>
              <input
                type="text"
                {...register("username")}
                className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
            <label className="text-gray-700 font-medium max-w-28 w-full">Email:</label>
            <input
              type="email"
              {...register("email")}
              className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
            <label className="text-gray-700 font-medium max-w-28 w-full">Designation:</label>
            <select
              {...register("designation")}
              className="border flex-1 border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Designation</option>

              {designations?.map((desgn) => (
                <option key={desgn._id} value={desgn.name.trim()}>
                  {desgn.name}
                </option>
              ))}
            </select>
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

export default EditUserForm;