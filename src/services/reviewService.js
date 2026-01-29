import api from "./api";

export const addReview = async (payLoad) => {
    const response = await api.post(`/review`, payLoad);
    return response.data;
}

export const deleteReview = async (rId) => {
    const response = await api.delete(`/review/${rId}`);
    return response.data;
};