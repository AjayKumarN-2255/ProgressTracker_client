import React from 'react';
import AddUser from '../components/AddUser';

function AddEmployee() {

    const designation = [
        "Front-End Developer",
        "Back-End Developer",
        "Full-Stack Developer",
        "UI/UX Designer",
        "SEO Specialist",
        "Business Analyst",
        "QA Engineer",
        "Content Writer"
    ];


    return (
        <div className='w-full h-full items-start flex justify-center'>
            <AddUser role={'employee'} designation={designation} />
        </div>
    )
}

export default AddEmployee