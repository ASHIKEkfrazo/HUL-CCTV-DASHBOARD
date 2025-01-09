import React from 'react';
import { Modal, Input, DatePicker, Button, Upload } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { InboxOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { reportPostApi } from '../Endpoints/reportApi';

const { Dragger } = Upload;
const ModalComponent = ({ title, open, cancel, setOpen }) => {
    const { handleSubmit, control, formState: { errors } } = useForm();

    // Submission function
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('order_date', data.order_date);
        formData.append('order_id', data.order_id);
        formData.append('person_incharge', data.person_incharge);
        formData.append('test_parameter', data.test_parameter);
        if (data.file) {
            formData.append('file', data.file);
        }
        reportPostApi(formData).then(res => cancel()).catch(err => console.log(err))
    };


    return (
        <Modal
            title={<div className='text-center font-semibold'>{title}</div>}
            open={open}
            onCancel={cancel}
            centered
            footer={null}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                {/* Controlled Input using Controller */}

                <div>
                    <label className='py-2 font-semibold'>Date</label>
                    <Controller
                        name="order_date"
                        control={control}
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="date" // Use HTML date input
                                placeholder="Select a date"
                                style={{ width: '100%', height: "2rem" }} // Full width input
                            />
                        )}
                    />
                    {errors.order_date && (
                        <span style={{ color: 'red' }}>{errors.order_date.message}</span>
                    )}
                </div>



                <div>
                    <label className='py-2 font-semibold'>Order Id</label>
                    <Controller
                        name="order_id"
                        control={control}
                        rules={{ required: "Order id is required" }}  // Validation rules
                        render={({ field }) => (
                            <Input {...field} placeholder="Order Id" type='number' />
                        )}
                    />
                    {errors.order_id && (
                        <span style={{ color: 'red' }}>{errors.order_id.message}</span>
                    )}
                </div>

                {/* Controlled Email Field */}
                <div>
                    <label className='py-2 font-semibold'>Person Incharge</label>
                    <Controller
                        name="person_incharge"
                        control={control}
                        rules={{
                            required: "Person Incharge is required",
                            // pattern: {
                            //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            //     message: "Invalid email address"
                            // }
                        }}
                        render={({ field }) => (
                            <Input {...field} placeholder="Person Incharge" />
                        )}
                    />
                    {errors.person_incharge && (
                        <span style={{ color: 'red' }}>{errors.person_incharge.message}</span>
                    )}
                </div>

                <div>
                    <label className='py-2 font-semibold'>Test Parameters</label>
                    <Controller
                        name="test_parameter"
                        control={control}
                        rules={{
                            required: "Test Parameters is required",
                            // pattern: {
                            //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            //     message: "Invalid email address"
                            // }
                        }}
                        render={({ field }) => (
                            <TextArea {...field} placeholder="Test Parameters" />
                        )}
                    />
                    {errors.test_parameter && (
                        <span style={{ color: 'red' }}>{errors.test_parameter.message}</span>
                    )}
                </div>
                <div>
                    {/* <label className='py-2 font-semibold'>File</label> */}
                    <Controller
                        name="file"
                        control={control}
                        rules={{ required: "File is required" }}
                        render={({ field: { onChange } }) => (
                            <Dragger

                                name="file"
                                multiple={false} // Allow single file
                                beforeUpload={(file) => {
                                    onChange(file);  // Manually handle the file upload with react-hook-form
                                    return false;    // Prevent automatic upload
                                }}
                                onRemove={() => onChange(null)} // Remove the file from the field
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined style={{ color: "#006A6B", fontSize: "2rem" }} />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                {/* <p className="ant-upload-hint">
                                    Support for a single file. Click to upload or drag and drop.
                                </p> */}
                            </Dragger>
                        )}
                    />
                    {errors.file && (
                        <p style={{ color: 'red' }}>{errors.file.message}</p>
                    )}
                </div>


                {/* Controlled DatePicker using Controller */}

                {/* Submit Button */}
                <Button type="primary" htmlType="submit" block className='bg-[#006768]'>
                    Submit
                </Button>
            </form>
        </Modal >
    );
};

export default ModalComponent;
