import toast from 'react-hot-toast';
import useFetch from '../../../hooks/useFetch';
import { createProject, deleteProject, editProject } from '../../../services/projectService';


export default function useManageProject() {

    const { data: projects, setData: setProjects } = useFetch('/project');

    const handleEditProject = async (pid, payLoad) => {
        try {
            const res = await editProject(pid, payLoad);
            if (res.success) {
                setProjects((prev) =>
                    prev.map((project) =>
                        project._id === pid ? res.data : project
                    )
                );
                toast.success("Project updated successfully");
            }
        } catch (error) {
            console.error("Failed to edit project:", error);
            toast.error(error?.response?.data?.message || "Failed to edit project");
        }
    }

    const handleAddProject = async (payLoad) => {
        try {
            const res = await createProject(payLoad);
            if (res.success) {
                setProjects((prev) => [...prev, res.data]);
                toast.success("project added");
            }
        } catch (error) {
            console.error("Failed to add project:", error);
            toast.error(error?.response?.data?.message || "Failed to add project");
        }
    }

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
        handleAddProject,
        handleEditProject,
        handleDeleteProject,
    }
}