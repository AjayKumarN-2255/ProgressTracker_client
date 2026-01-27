import toast from 'react-hot-toast';
import useFetch from '../../../hooks/useFetch';
import { deleteProject } from '../../../services/projectService';


export default function useManageProject() {

    const { data: projects, setData: setProjects } = useFetch('/project');


    const handleDeleteProject = async (id) => {
        try {
            const res = await deleteProject(id);
            if (res.success) {
                setProjects((prev) => prev.filter(project => project._id !== id));
                toast.success("project deleted");
            }
        } catch (error) {
            console.error("Failed to delete project:", error);
            toast.error(error?.response?.data?.message || "Failed to delete project");
        }
    };



    return {
        projects,
        handleDeleteProject
    }
}