import React from 'react';
import {Modal} from 'antd';

const CustomModal = ({
                         isEditing = false,
                         visible = false,
                         title = "",
                         loading = false,
                         onOk,
                         onCancel,
                         form,
                         children,
                         centered = false,
                         width = 600,
                         style = {},
                     }) => {
    const handleOk = () => {
        if (!form) return;

        form
            .validateFields()
            .then(values => {
                onOk(values);
            })
            .catch(() => {
                console.error('Por favor, corrige los campos marcados.');
            });
    };

    return (
        <Modal
            forceRender
            getContainer={false}
            title={title || (isEditing ? "Editar" : "Agregar")}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText={isEditing ? "Actualizar" : "Crear"}
            cancelText="Cancelar"
            loading={loading}
            okButtonProps={{
                style: {
                    backgroundColor: '#4A001F',
                    borderColor: '#4A001F',
                    borderRadius: 8,
                },
            }}
            cancelButtonProps={{
                style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                },
            }}
            centered={centered}
            width={width}
            style={style}
        >
            {children}
        </Modal>
    );
};

export default CustomModal;
