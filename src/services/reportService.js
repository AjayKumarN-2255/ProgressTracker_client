import api from "./api";


export const getReports = async (QueryUser, QueryType, QueryValue, QueryYear, QueryPid) => {

    const response = await api.get('/report', {
        params: {
            userId: QueryUser,
            type: QueryType,
            value: QueryValue,
            year: QueryYear,
            pId: QueryPid
        }
    });
    return response.data;
}

export const addReport = async (reviewId, payLoad) => {
    const response = await api.post(`/report/${reviewId}`, payLoad);
    return response.data;
};