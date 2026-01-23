import { Outlet } from 'react-router-dom';
import EmployeeHeader from '../features/employee/components/Header';
import EmployeeSidebar from '../features/employee/components/Sidebar';

function UserLayout() {
  return (
    <div className="h-screen flex flex-col w-screen font-custom">
      <EmployeeHeader />

      <div className="w-full h-[calc(100vh-80px)] flex flex-col md:flex-row">
        <div className="md:w-60 lg:w-72 h-fit md:h-full">
          <EmployeeSidebar />
        </div>

        <div className="flex-1 bg-gray-100 md:h-full p-2 sm:p-4 md:p-8 lg:p-10 lg:overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout