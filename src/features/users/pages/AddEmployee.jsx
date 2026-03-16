import React from 'react';
import AddUser from '../components/AddUser';

function AddEmployee() {
    
    return (
        <div className='w-full h-full items-start flex justify-center'>
            <AddUser role={'employee'} />
        </div>
    )
}

export default AddEmployee