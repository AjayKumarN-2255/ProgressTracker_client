import toast from "react-hot-toast";
import { addUser } from '../../../services/userService';
import { editAccount, editProfileImage } from "../../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../../store/slices/authSlice';
import { useState } from "react";

export default function useManageUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageFile, setImagefile] = useState(null);
    const { user } = useSelector(state => state.auth);
    const [clicked, setClicked] = useState(false);

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

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagefile(file);
            setImage(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = async () => {
        if (!imageFile) {
            toast.error("select profile image");
            return;
        }
        setClicked(true);
        try {
            const res = await editProfileImage(user?._id, imageFile);
            if (res.success) {
                const { __v, ...user } = res.data;
                dispatch(setUser(user));
                toast.success("user profile Image updated");
            }
            setClicked(false);
            setImage(null);
            setImagefile(null);
        } catch (err) {
            const message = err?.response?.data?.message || "Failed to update profile image";
            toast.error(message);
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setImagefile(null);
    };


    return {
        handleAddUser,
        handleAccount,
        handleChange,
        handleImageUpload,
        handleRemoveImage,
        loading,
        clicked,
        error,
        image
    };
}
