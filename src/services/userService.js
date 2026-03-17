import api from "./api";

export const addUser = async (payLoad) => {
    const response = await api.post(`/user`, payLoad);
    return response.data;
}

export const getUsers = async (role) => {
    const response = await api.get(`/user`, {
        params: { role, reqField: '_id name email designation profile' }
    });
    return response.data;
}