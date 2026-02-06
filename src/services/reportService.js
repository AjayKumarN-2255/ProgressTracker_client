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

export const exportReport = async (QueryUser, QueryType, QueryValue, QueryYear, QueryPid) => {

    const response = await api.get('/report/export', {
        params: {
            userId: QueryUser,
            type: QueryType,
            value: QueryValue,
            year: QueryYear,
            pId: QueryPid
        },
        responseType: 'blob'
    });
    return {
        blob: response.data,
        header: response.headers
    }

}

export const editReport = async (reportId, payLoad) => {
    const response = await api.patch(`/report/${reportId}`, payLoad);
    return response.data;
};

export const addReport = async (reviewId, payLoad) => {
    const response = await api.post(`/report/${reviewId}`, payLoad);
    return response.data;
};