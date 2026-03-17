import api from "./api";

export const getDesignation = async (role) => {
    const response = await api.get(`/desgn`, {
        params: { role }
    });
    return response.data;
};

export const addDesignation = async (payLoad) => {
    const response = await api.post(`/desgn`, payLoad);
    return response.data;
};

export const deleteDesignation = async (dId) => {
    const response = await api.delete(`/desgn/${dId}`);
    return response.data;
};
