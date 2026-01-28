import toast from "react-hot-toast";
import { addUser } from '../../../services/userService';
import { editAccount } from "../../../services/authService";
import { useState } from "react";

export default function useManageUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddUser = async (payLoad) => {
        try {
            setLoading(true);
            setError(null);

            const res = await addUser(payLoad);
            if (res.success) {
                console.log(res.data);
                toast.success("User added successfully!");
            }
        } catch (err) {
            console.error("Failed to add user:", err);
            const message = err?.response?.data?.message || err?.message || "Failed to add user";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleAccount = async (payLoad, reset) => {
        if (!payLoad.password || !payLoad.new_password) {
            toast.error("enter password details");
            return;
        }
        try {
            setError(null);
            setLoading(true);
            const { userId } = payLoad;
            const reqPayLoad = { password: payLoad.password, new_password: payLoad.new_password }
            const res = await editAccount(userId, reqPayLoad);
            if (res.success) {
                reset({
                    password: "",
                    new_password: ""
                });
                toast.success("password updated");
            }
        } catch (err) {
            const message = err?.response?.data?.message || "Failed to change password";
            toast.error(message);
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return {
        handleAddUser,
        handleAccount,
        loading,
        error,
    };
}
