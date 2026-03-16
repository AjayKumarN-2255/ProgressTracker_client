import React from 'react';
import AddUser from '../components/AddUser';

function AddAdmin() {
    
    return (
        <div className='w-full h-full items-start flex justify-center'>
            <AddUser role={'admin'}/>
        </div>
    )
}

export default AddAdmin