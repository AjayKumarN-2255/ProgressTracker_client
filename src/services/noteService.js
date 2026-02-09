import api from "./api";


export const addNote = async (payLoad) => {
    const response = await api.post(`/note`, payLoad);
    return response.data;
};
