import { useState } from "react";
import { Button, Card, Form, Input, Popconfirm, Select, Space, Table, Tag, Typography } from "antd";
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
            <div className="crud-example-header">
                <Title level={3}>Ejemplo CRUD</Title>
                <Text type="secondary">{total} registros</Text>
            </div>

            <Card className="crud-example-form-card">
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialValues}
                    onFinish={handleSubmit}
                >
                    <div className="crud-example-form-grid">
                        <Form.Item
                            label="Nombre"
                            name="nombre"
                            rules={[{ required: true, message: "Ingresa el nombre" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Correo"
                            name="correo"
                            rules={[
                                { required: true, message: "Ingresa el correo" },
                                { type: "email", message: "Ingresa un correo valido" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Estatus"
                            name="estatus"
                            rules={[{ required: true, message: "Selecciona el estatus" }]}
                        >
                            <Select
                                options={[
                                    { label: "Activo", value: "activo" },
                                    { label: "Inactivo", value: "inactivo" },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusOutlined />}
                            loading={isSaving}
                        >
                            {editingRecord ? "Guardar cambios" : "Agregar"}
                        </Button>
                        {editingRecord && (
                            <Button onClick={resetForm}>
                                Cancelar
                            </Button>
                        )}
                    </Space>
                </Form>
            </Card>

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
