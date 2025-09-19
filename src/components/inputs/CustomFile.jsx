import React from 'react';
import { Button, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function CustomFile({ 
    label,
    name, 
    rules, 
    accept = "application/pdf"
}) {
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const fileTypeValidator = {
        validator: (_, value) => {
            if (value?.[0]?.type && !accept.includes(value[0].type)) {
                return Promise.reject(
                    new Error(`Solo se permiten archivos ${accept === "application/pdf" ? 'PDF' : 'Excel'}`)
                )
            }
            return Promise.resolve();
        }
    }

    const beforeUpload = () => {
        return false; 
    };

    return (
        <Form.Item
            label={label}
            name={name}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={
                rules?.length > 0
                    ? [
                        ...rules,
                        fileTypeValidator,
                    ]
                    : [
                        fileTypeValidator,
                    ]
            }
        >
            <Upload 
                name={name} 
                accept={accept}
                maxCount={1}
                beforeUpload={beforeUpload}
            >
                <Button icon={<UploadOutlined />}>Seleccionar Archivo</Button>
            </Upload>
        </Form.Item>
    );
};