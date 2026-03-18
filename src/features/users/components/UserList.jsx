import useAdminUser from '../hooks/useAdminUser';
import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';
import Card from './Card';

function UserList() {

    const { role, handleToggle, handleDeleteUser, loading,
        users, show, setShow } = useAdminUser(true);
    const handleModal = (title, id) => {
        setShow({ success: true, title, id });
    }
    const onDelete = () => {
        handleDeleteUser(show?.id);
        setShow(null);
    }
    const onCancel = () => {
        setShow(null);
    }

    return (
        <div className='w-full flex flex-col gap-6'>
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => handleToggle('admin')}
                    className={`px-4 py-2 rounded 
                    ${role === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Admins
                </button>

                <button
                    onClick={() => handleToggle('employee')}
                    className={`px-4 py-2 rounded 
                    ${role === 'employee' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Employees
                </button>
            </div >
            {
                loading ? <Loader />
                    :
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
                        {
                            users?.length > 0 ?
                                users.map((user) => <Card handleModal={handleModal} key={user?._id} user={user} />)
                                : <p>No user found</p>
                        }
                    </div>
            }
            {
                show?.success &&
                <Modal show={show}
                    onDelete={onDelete} onCancel={onCancel} />
            }
        </div>
    )
}

export default UserList