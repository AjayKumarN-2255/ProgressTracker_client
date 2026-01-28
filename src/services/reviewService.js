import api from "./api";

export const addReview = async (payLoad) => {
    const response = await api.post(`/review`, payLoad);
    return response.data;
}