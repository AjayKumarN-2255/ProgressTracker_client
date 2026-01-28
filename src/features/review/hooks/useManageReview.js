import useFetch from '../../../hooks/useFetch';


export default function useManageReview() {

    const { data: projects } = useFetch('/project');
    const { data: admins } = useFetch('/user', { params: { role: 'admin' } });
    const { data: employees } = useFetch('/user', { params: { role: 'employee' } });

    const handleAddReview = async (payLoad) => {
        console.log(payLoad);
    }

    return {
        handleAddReview,
        admins,
        projects,
        employees
    }
}