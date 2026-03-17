import { useEffect, useState } from "react";
import { getUsers } from '../../../services/userService';
import toast from "react-hot-toast";

export default function useAdminUser() {

    const [role, setRole] = useState("admin");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleToggle = async (selectedRole) => {
        setRole(selectedRole);
    };

    useEffect(() => {

        const handleGetUsers = async () => {
            try {
                setLoading(true);
                const res = await getUsers(role)
                if (res.success) {
                    setUsers(res.data);
                }
            } catch (err) {
                const message = err?.response?.data?.message || "Failed to update profile image";
                toast.error(message);
            } finally {
                setLoading(false)
            }
        }

        handleGetUsers();

    }, [role])

    return {
        role, setRole, handleToggle, loading, users
    }

}