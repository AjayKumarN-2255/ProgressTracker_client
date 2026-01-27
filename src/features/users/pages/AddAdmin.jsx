import React from 'react';
import AddUser from '../components/AddUser';

function AddAdmin() {

    const designation = [
        "CEO",
        "CTO",
        "Project Lead",
        "UI Lead",
        "Product Manager",
        "Operations Manager",
        "HR Manager",
        "Finance Manager",
        "Marketing Head",
        "Admin Executive",
    ];


    return (
        <div className='w-full h-full items-start flex justify-center'>
            <AddUser role={'admin'} designation={designation} />
        </div>
    )
}

export default AddAdmin