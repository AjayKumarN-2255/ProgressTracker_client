import { useEffect, useState } from "react";
import { getUsers } from '../../../services/userService';
import { getDesignation } from '../../../services/desgnService';
import useFetch from "../../../hooks/useFetch";
import toast from "react-hot-toast";

export default function useAdminUser(needFetch = false, id) {

    const [role, setRole] = useState("admin");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [designations, setDesgns] = useState([]);

    const enabled = !!id;
    const { data: user } = useFetch('/user', {
        enabled,
        params: {
            userId: id,
            reqField: '_id name email designation role'
        }
    });

    const handleToggle = async (selectedRole) => {
        setRole(selectedRole);
    };

    useEffect(() => {
        if (!user || Array.isArray(user) && user.length == 0) return;
        const handleGetDesgn = async () => {
            try {
                const res = await getDesignation(user?.role)
                if (res.success) {
                    setDesgns(res.data);
                }
            } catch (err) {
                console.log(err)
                const message = err?.response?.data?.message || "Failed to designations";
                toast.error(message);
            }
        }

        handleGetDesgn();

    }, [user]);

    useEffect(() => {

        if (!needFetch) {
            return;
        }

        const handleGetUsers = async () => {
            try {
                setLoading(true);
                const res = await getUsers(role)
                if (res.success) {
                    setUsers(res.data);
                }
            } catch (err) {
                const message = err?.response?.data?.message || "Failed to fetch users";
                toast.error(message);
            } finally {
                setLoading(false)
            }
        }

        handleGetUsers();

    }, [role, needFetch])

    return {
        designations, loading, users, user,
        role, setRole, handleToggle,
    }

}