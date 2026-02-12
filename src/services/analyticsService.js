import api from './api';


export const getUserAnalytics = async (userId, QueryMonth, QueryYear) => {
    const response = await api.get('/analytics/graph', {
        params: {
            userId: userId,
            month: QueryMonth,
            year: QueryYear
        }
    });
    return response.data;
}