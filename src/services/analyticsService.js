import api from './api';


export const getUserAnalytics = async (userId, QueryMonth, QueryYear, QueryPId) => {
    const response = await api.get('/analytics/graph', {
        params: {
            userId: userId,
            month: QueryMonth,
            year: QueryYear,
            pId: QueryPId
        }
    });
    return response.data;
}