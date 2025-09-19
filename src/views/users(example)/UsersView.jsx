import {Typography, Modal, Form, Input, Row, Col} from "antd";
import {MailOutlined} from "@ant-design/icons";
import HeaderTitle from "@/components/common/HeaderTitle";
import CustomInput from "@/components/inputs/CustomInput";
import CustomSelect from "@/components/inputs/CustomSelect";
import TableWithPagination from "@/components/TableWithPagination";
import {useUser, useRecoverPassword} from "@/hooks";

const {Title} = Typography;

export default function UsersPage() {
    const {form: recoverPassForm, onFinish} = useRecoverPassword();
    const {TextArea} = Input;
    const {
        stateUser,
        setStateUser,
        form,
        columns,
        WINE,
        getModalTitle,
        handleCreateUser,
        handleEditUser,
        onCancel,
        handleCancelPass,
        isModalOpen,
        getButtonText,
        getButtonTexPass,
        urlUser,
    } = useUser({recoverPassForm});

    return (
        <>
            <HeaderTitle
                headerTitle="Usuarios"
                showModal={() =>
                    setStateUser({
                        ...stateUser,
                        showModal: true,
                        isEditing: false,
                    })
                }
                textButton="Agregar"
                hideButton={stateUser.rolUser !== "Administrador"}
                placeholderSearch={"Busca el usuario"}
                urlSearch={`${urlUser}/buscar?q=`}
                state={stateUser}
                setState={setStateUser}
            />

            <TableWithPagination
                state={stateUser}
                columns={columns}
                setState={setStateUser}
                showScrollX={true}
                paginationUrl="/users"
            />

            <Modal
                title={
                    <Title
                        level={4}
                        style={{color: WINE, margin: 0, paddingBottom: 16}}
                    >
                        {getModalTitle(stateUser.isEditing)}
                    </Title>
                }
                open={stateUser.showModal}
                onOk={stateUser.isEditing ? handleEditUser : handleCreateUser}
                confirmLoading={stateUser.loadingModal}
                onCancel={onCancel}
                okText={getButtonText(stateUser.isEditing)}
            >
                <Form form={form} initialValues={{id_secretaria: stateUser.userIdSecretary}} layout="vertical">
                    <Row gutter={16}>
                        <Form.Item name="id_user">
                            <Input type="hidden"/>
                        </Form.Item>
                        <Col className="gutter-row" span={12}>
                            <CustomInput
                                name="nombre"
                                placeholder="Nombre(s)"
                                rules={[
                                    {required: true, message: "Por favor ingresa el nombre"},
                                ]}
                            />
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <CustomInput
                                name="apellidoPaterno"
                                placeholder="Apellido paterno"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor ingresa el apellido paterno",
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <CustomInput
                                name="apellidoMaterno"
                                placeholder="Apellido materno"
                            />
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <CustomInput
                                name="rfc"
                                placeholder="RFC"
                                rules={[
                                    {required: true, message: "Por favor ingresa el RFC"},
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <CustomInput
                                name="correo"
                                placeholder="Correo electrónico"
                                rules={[
                                    {required: true, message: "Por favor ingresa el correo"},
                                    {type: "email", message: "El correo no es válido"},
                                ]}
                            />
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="cat_rol_id"
                                rules={[{required: true, message: "Selecciona un rol"}]}
                            >
                                <CustomSelect
                                    placeholder="Selecciona un rol"
                                    options={stateUser.rolesOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    onChange={(input) =>
                                        setStateUser({...stateUser, showPadron: input === 3})
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="id_secretaria"
                        rules={[{required: true, message: "Selecciona una secretaria"}]}
                    >
                        <CustomSelect
                            disabled={true}
                            placeholder="Selecciona una secretaria"
                            options={stateUser.secretaryOptions}
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                    {stateUser.showPadron && (
                        <Form.Item name="id_padrones">
                            <CustomSelect
                                placeholder="Selecciona un padron."
                                options={stateUser.padronesOptions}
                                showSearch
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="observaciones"
                    >
                        <TextArea
                            placeholder="Observaciones"
                            autoSize={{minRows: 4, maxRows: 6}}
                            maxLength={250}
                        />
                    </Form.Item>
                </Form>
            </Modal>


            {/* este es el modal para reestablecer la contraseña */}
            <Modal
                closable={{'aria-label': 'Custom Close Button'}}
                open={isModalOpen}
                onOk={() => {
                    onFinish()
                    handleCancelPass()
                }}
                onCancel={handleCancelPass}
                confirmLoading={stateUser.loadingModal}
                okText={getButtonTexPass}
            >
                <Form
                    layout="vertical"
                    form={recoverPassForm}
                    requiredMark={false}
                >
                    <CustomInput
                        name="email"
                        label="Reestablecer contraseña."
                        rules={[{required: true, message: "Ingresa tu correo electrónico"}]}
                        prefix={<MailOutlined style={{color: "#8c8c8c"}}/>}
                        placeholder="usuario@correo.com"
                    />

                </Form>
            </Modal>
        </>
    );
}
