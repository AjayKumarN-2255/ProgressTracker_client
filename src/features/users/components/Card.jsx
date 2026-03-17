import React, { useState, useRef, useEffect } from 'react';
import { getAvatarColor } from '../../../utils/generateAvatarColor';
import { Link } from 'react-router-dom';

function Card({ user, onDelete }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    // close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative flex items-center gap-6 p-6 border rounded-xl shadow-md bg-white w-full max-w-xl hover:shadow-lg transition">

            {/* 3-dot menu */}
            <div className="absolute top-4 right-4" ref={menuRef}>
                <button
                    onClick={() => setOpen(!open)}
                    className="p-1 rounded-full text-xl hover:bg-gray-100"
                >
                    ⋮
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg z-10">
                        <Link to={`/superadmin/edit-user/${user?._id}`}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => {
                                onDelete?.(user);
                                setOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Left: Image */}
            <div className={`w-24 h-24 rounded-xl overflow-hidden flex items-center justify-center ${getAvatarColor(user?.name)}`}>
                {user?.profile ? (
                    <img
                        src={`${import.meta.env.VITE_SERVER_URL}${user.profile}`}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-3xl font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>

            {/* Right: Details */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-800">
                    {user?.name}
                </h2>

                <p className="text-sm text-gray-500">
                    {user?.email}
                </p>

                <span className="w-fit px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                    {user?.designation}
                </span>
            </div>

        </div>
    );
}

export default Card;