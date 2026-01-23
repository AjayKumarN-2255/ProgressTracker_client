import { useSelector } from 'react-redux';
import useLogout from '../../../hooks/useLogout';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../../../utils/generateAvatarColor';

function Header() {
  const { handleLogout } = useLogout();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const avatarColor = getAvatarColor(user?.name);

  return (
    <header className="h-20 w-full bg-white flex items-center justify-between px-6 shadow-md">

      <h1 className="text-gray-900 text-xl md:text-2xl font-semibold tracking-tight">
        <span className="capitalize">Super Admin</span>
        <span className="text-gray-500 font-normal ml-2">Dashboard</span>
      </h1>


      {
        isAuthenticated &&
        <div className="flex items-center space-x-5">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">{user?.name}</span>
            <Link to="/admin/edit-account">
              <div
                className={`w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-semibold text-lg 
                  cursor-pointer border-2 border-gray-300`}
              >
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
            </Link>
          </div>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      }

    </header>
  )
}

export default Header