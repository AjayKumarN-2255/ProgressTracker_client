import React from 'react';
import AddUser from '../components/AddUser';

function AddAdmin() {
    return (
        <div>
            <AddUser role={'admin'} />
        </div>
    )
}

export default AddAdmin