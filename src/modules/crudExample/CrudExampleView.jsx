import { useState } from "react";
import { Button, Card, Form, Input, Popconfirm, Select, Space, Table, Tag, Typography, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useCrudExample } from "@/modules/crudExample/useCrudExample";

const { Title, Text } = Typography;

const initialValues = {
    nombre: "",
    correo: "",
    estatus: "activo",
};

const CrudExampleView = () => {
    const [form] = Form.useForm();
    const [editingRecord, setEditingRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        records,
        total,
        isLoading,
        isSaving,
        createRecord,
        updateRecord,
        deleteRecord,
    } = useCrudExample();

    const resetForm = () => {
        setEditingRecord(null);
        setIsModalOpen(false);
        form.resetFields();
        form.setFieldsValue(initialValues);
    };

    const handleSubmit = async (values) => {
        if (editingRecord) {
            await updateRecord({ id: editingRecord.id, values });
        } else {
            await createRecord(values);
        }

        resetForm();
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
        },
        {
            title: "Correo",
            dataIndex: "correo",
            key: "correo",
        },
        {
            title: "Estatus",
            dataIndex: "estatus",
            key: "estatus",
            render: (estatus) => (
                <Tag color={estatus === "activo" ? "green" : "default"}>
                    {estatus}
                </Tag>
            ),
        },
        {
            title: "Acciones",
            key: "actions",
            align: "right",
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Eliminar registro"
                        description="Esta accion elimina el registro de la simulacion."
                        okText="Eliminar"
                        cancelText="Cancelar"
                        onConfirm={() => deleteRecord(record.id)}
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="crud-example-view">
            <div className="crud-example-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <Title level={3} style={{ margin: 0 }}>Ejemplo CRUD</Title>
                    <Text type="secondary">{total} registros</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    Agregar Registro
                </Button>
            </div>

            <Modal
                title={editingRecord ? "Editar Registro" : "Nuevo Registro"}
                open={isModalOpen}
                onCancel={resetForm}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialValues}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[{ required: true, message: "Ingresa el nombre" }]}
                    >
                        <Input placeholder="Ingresa el nombre" />
                    </Form.Item>

                    <Form.Item
                        label="Correo"
                        name="correo"
                        rules={[
                            { required: true, message: "Ingresa el correo" },
                            { type: "email", message: "Ingresa un correo valido" },
                        ]}
                    >
                        <Input placeholder="ejemplo@correo.com" />
                    </Form.Item>

                    <Form.Item
                        label="Estatus"
                        name="estatus"
                        rules={[{ required: true, message: "Selecciona el estatus" }]}
                    >
                        <Select
                            placeholder="Selecciona un estatus"
                            options={[
                                { label: "Activo", value: "activo" },
                                { label: "Inactivo", value: "inactivo" },
                            ]}
                        />
                    </Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
                        <Button onClick={resetForm}>
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSaving}
                        >
                            {editingRecord ? "Guardar cambios" : "Agregar"}
                        </Button>
                    </div>
                </Form>
            </Modal>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={records}
                loading={isLoading}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default CrudExampleView;
