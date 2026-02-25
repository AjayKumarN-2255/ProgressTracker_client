import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import useManageUser from '../hooks/useManageUser';

function EditProfileImage() {
    const imageRef = useRef();
    const { user } = useSelector(state => state.auth);
    const { image, handleChange, handleImageUpload, handleRemoveImage, clicked } = useManageUser();

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg">

            {/* Profile image */}
            <div className="w-16 h-16 flex-shrink-0 relative">
                <input type="file" ref={imageRef} accept="image/*" className="hidden" onChange={handleChange} />
                <img
                    src={image || `${import.meta.env.VITE_SERVER_URL}${user?.profile}`}
                    alt="Profile"
                    onClick={() => { imageRef.current.click() }}
                    className="w-full  h-full object-cover rounded-full border-2 border-gray-300"
                />
                {image && (
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 -mt-1 -mr-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                        title="Remove image"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Upload section */}
            <button className="flex flex-col" disabled={clicked}
                onClick={handleImageUpload}>
                <label className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    {clicked ? 'Uploading' : 'Upload'}
                </label>
            </button>
        </div>
    );
}

export default EditProfileImage;
