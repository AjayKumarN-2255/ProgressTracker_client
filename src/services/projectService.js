import api from "./api";

export const deleteProject = async (id) => {
    const response = await api.delete(`/project/${id}`);
    return response.data;
};