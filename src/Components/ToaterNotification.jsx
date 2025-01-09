import React, { useEffect } from 'react';
import { notification } from 'antd';

const ToasterNotification = ({ message  }) => {

    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: 'Notification Title',
            description:
                'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
            duration: 5,
        });
    };


    return (

        <>
            {contextHolder}
        </>
    )


}

export default ToasterNotification;
