import ProjectList from '../components/ProjectList';
import AddProjectForm from '../components/AddProjectForm';
import useManageProject from '../hooks/useManageProject';


const AddProject = () => {

  const { projects, handleDeleteProject } = useManageProject();


  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 p-6">
      <ProjectList projects={projects}
        handleDeleteProject={handleDeleteProject} />
      <AddProjectForm />
    </div>
  );
};

export default AddProject;