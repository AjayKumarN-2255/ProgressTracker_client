import api from "./api";

export const addNote = async (payLoad) => {
    const response = await api.post(`/note`, payLoad);
    return response.data;
};

export const deleteNote = async (nId) => {
    const response = await api.post(`/note/${nId}`);
    return response.data;
};

