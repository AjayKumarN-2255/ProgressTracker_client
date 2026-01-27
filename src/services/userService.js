import api from "./api";

export const addUser = async (payLoad) => {
    const response = await api.post(`/user`, payLoad);
    return response.data;
}