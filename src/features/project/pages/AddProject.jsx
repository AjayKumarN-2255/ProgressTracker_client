import { useState } from 'react';
import ProjectList from '../components/ProjectList';
import AddProjectForm from '../components/AddProjectForm';
import useManageProject from '../hooks/useManageProject';
import EditProjectForm from '../components/EditProjectForm';

const AddProject = () => {

  const { projects, handleDeleteProject, handleAddProject, handleEditProject } = useManageProject();
  const [isEdit, setIsEdit] = useState({
    success: false,
    pid: null,
  });

  const enableEdit = (pid) => {
    setIsEdit({ success: true, pid });
  }

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 p-6">
      <ProjectList projects={projects} enableEdit={enableEdit}
        handleDeleteProject={handleDeleteProject} />
      {
        isEdit?.success
          ?
          <EditProjectForm isEdit={isEdit} setIsEdit={setIsEdit}
            handleEditProject={handleEditProject}
          />
          :
          <AddProjectForm handleAddProject={handleAddProject} />
      }
    </div>
  );
};

export default AddProject;