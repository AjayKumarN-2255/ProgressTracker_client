import api from "./api";


export const createProject = async (payLoad) => {
    const response = await api.post(`/project`, payLoad);
    return response.data;
};

export const editProject = async (pid, payLoad) => {
    const response = await api.patch(`/project/${pid}`, payLoad);
    return response.data;
};

export const deleteProject = async (id) => {
    const response = await api.delete(`/project/${id}`);
    return response.data;
};