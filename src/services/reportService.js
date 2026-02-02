import api from "./api";


export const getReports = async (userId) => {

    const response = await api.get('/report', {
        params: {
            userId
        }
    });
    return response.data;
}

export const addReport = async (reviewId, payLoad) => {
    const response = await api.post(`/report/${reviewId}`, payLoad);
    return response.data;
};