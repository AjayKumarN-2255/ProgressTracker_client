import api from "./api";

export const addDesignation = async (payLoad) => {
    const response = await api.post(`/desgn`, payLoad);
    return response.data;
};

export const deleteDesignation = async (dId) => {
    const response = await api.delete(`/desgn/${dId}`);
    return response.data;
};
