import api from "./api";


export const addReport = async (payLoad) => {
    const response = await api.post(`/report`, payLoad);
    return response.data;
};