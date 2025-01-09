import React from 'react'

import { Modal }
    from
    "antd"
    ;

const Logout = () => {


    return (
        <Modal open={true} footer={null} onCancel={handleCancel}>
            <div className='text-2xl text-center font-bold py-3'>Are You Sure You want to logout?</div>
            <div className=" flex justify-end py-3">
                <div className="bg-red-600 w-25 text-center py-2 rounded-md text-white font-bold ">Logout</div>
            </div>
        </Modal>
    )
}

export default Logout