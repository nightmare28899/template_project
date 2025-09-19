import {useEffect, useState} from "react";
import {Button, Form, Popconfirm, Space, Switch, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, EditOutlined, KeyOutlined} from "@ant-design/icons";
import {makePetitions} from "@/service/core/makePetitions";
import {useNotificationService} from "@/service/NotificationService";
import {useFetch, useOptions} from "@/hooks";

const WINE = "#5B0B1B";

const useUser = ({recoverPassForm}) => {
    const urlSecretary = "secretarias";
    const urlUser = "users(example)";
    const urlRoles = "roles";
    const urlPadrones = "padrones";

    const {showSuccessMessage, showErrorMessage, showPasswordMessage} =
        useNotificationService();

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateUser, setStateUser] = useState({
        data: [],
        originalData: [],
        showModal: false,
        showModalPass: false,
        isEditing: false,
        currentData: null,
        permissions: [],
        loadingPermissions: false,
        selectedPermissions: [],
        showErrorInput: false,
        currentPage: 0,
        lastPage: 0,
        path: "",
        loadingTable: false,
        roleName: "",
        searchValue: "",
        selectedItems: [],
        loadingModal: false,
        totalPage: 0,
        rolesOptions: [],
        secretaryOptions: [],
        padronesOptions: [],
        pageSize: 10,
        showPadron: false,
        rolUser: null,
        userIdSecretary: null,
    });

    const {
        data: responseUser,
        isLoading: userLoading,
        error: userError,
        refetch,
    } = useFetch(urlUser, {});

    const {
        data: responseRoles,
        error: rolesError,
    } = useFetch(urlRoles, {});

    const {
        data: responseSecretary,
        error: secretaryError,
    } = useFetch(urlSecretary, {});

    const {
        data: responsePadrones,
        error: padronesError,
    } = useFetch(urlPadrones, {});

    const {post, put, del} = makePetitions;

    useOptions(responseRoles, rolesError, "rolesOptions", setStateUser);
    useOptions(responseSecretary, secretaryError, "secretaryOptions", setStateUser);
    useOptions(responsePadrones, padronesError, "padronesOptions", setStateUser);

    useEffect(() => {
        if (userLoading) {
            setStateUser({
                ...stateUser,
                loadingTable: true,
            });
            return;
        }

        if (userError) {
            console.error("Error fetching user data: ", userError);
            setStateUser({
                ...stateUser,
                loadingTable: false,
                data: [],
                originalData: [],
                totalPage: 0,
            });
            return;
        }

        if (responseUser) {
            const userData = Array.isArray(responseUser.data)
                ? responseUser.data
                : Array.isArray(responseUser)
                    ? responseUser
                    : [];

            setStateUser({
                ...stateUser,
                data: userData,
                originalData: userData,
                totalPage: responseUser.total || 0,
                loadingTable: false,
            });
        } else {
            setStateUser({
                ...stateUser,
                data: [],
                originalData: [],
                totalPage: 0,
                loadingTable: false,
            });
        }
    }, [responseUser, userLoading, userError]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const role = user?.["rol"];
            const id_secretaria = user?.id_secretaria;

            setStateUser((prev) => ({
                ...prev,
                rolUser: role,
                userIdSecretary: id_secretaria
            }));
        }
    }, [])

    const showModalPass = (record) => {
        recoverPassForm.setFieldsValue({email: record.email});
        setIsModalOpen(true);
    };

    const handleOkPass = () => {
        setIsModalOpen(false);
    };

    const handleCancelPass = () => {
        setIsModalOpen(false);
    };

    const EditUser = (record = null) => {
        form.setFieldsValue({
            id_user: record.id,
            nombre: record.nombre,
            apellidoPaterno: record.apellido_paterno,
            apellidoMaterno: record.apellido_materno,
            rfc: record.rfc,
            correo: record.email,
            cat_rol_id: record.cat_rol_id,
            id_padrones: record.id_padrones,
            id_secretaria: record.id_secretaria,
            observaciones: record.observaciones,
        });
        setStateUser({
            ...stateUser,
            showModal: true,
            isEditing: true,
            currentData: record,
            showPadron: record.cat_rol_id === 3,
        });
    };


    const columns = [
        {
            title: "RFC",
            dataIndex: "rfc",
        },
        {
            width: 200,
            title: "Nombre",
            dataIndex: "nombre",
        },
        {
            width: 200,
            title: "Apellido paterno",
            dataIndex: "apellido_paterno",
        },
        {
            width: 200,
            title: "Apellido materno",
            dataIndex: "apellido_materno",
        },
        {
            width: 200,
            title: "Secretaria",
            dataIndex: "secretaria_nombre",
        },
        {
            title: "Rol",
            dataIndex: "rol_nombre",
        },
        {
            title: "Correo electrónico",
            dataIndex: "email",
        },
        {
            title: "Acciones",
            key: "acciones",
            width: 120,
            fixed: "right",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <Button
                            onClick={() => EditUser(record)}
                            icon={<EditOutlined/>}
                            size="middle"
                            disabled={record?.["deleted_at"] !== null}
                        />
                    </Tooltip>
                    <Tooltip
                        title={record?.["deleted_at"] === null ? "Desactivar" : "Activar"}
                    >
                        <Popconfirm
                            title="¿Cambiar estado del usuario?"
                            description={
                                record?.["deleted_at"] === null
                                    ? "Se desactivará este usuario."
                                    : "Se activará este usuario"
                            }
                            onConfirm={() => handleDeleteUser(record)}
                            onCancel={() => {
                                setStateUser({
                                    ...stateUser,
                                    loadingTable: false,
                                });
                            }}
                            okText="Confirmar"
                            cancelText="Cancelar"
                            okButtonProps={{danger: record?.["deleted_at"] === null}}
                        >
                            <Switch
                                checkedChildren={<CheckOutlined/>}
                                unCheckedChildren={<CloseOutlined/>}
                                checked={record?.["deleted_at"] === null}
                            />
                        </Popconfirm>
                    </Tooltip>

                    <Tooltip title="Restablecer contraseña">
                        {/* agregar validacion para cuando este desabilitado desaparezca  */}

                        <Button
                            icon={<KeyOutlined/>}
                            size="middle"
                            onClick={() => showModalPass(record)}
                            disabled={record?.["deleted_at"] !== null}
                        />
                    </Tooltip>

                </Space>
            ),
        },
    ];

    const getModalTitle = (isEditing) =>
        isEditing ? "Editar usuario" : "Crear usuario";

    const getButtonText = (isEditing) => (isEditing ? "Actualizar" : "Crear");

    const getButtonTexPass = "Enviar";

    const handleCreateUser = async () => {
        const values = await form.validateFields();

        setStateUser({
            ...stateUser,
            loadingModal: true,
        });

        const body = {
            rfc: values.rfc,
            nombre: values.nombre,
            apellido_paterno: values?.["apellidoPaterno"],
            apellido_materno: values?.["apellidoMaterno"],
            email: values.correo,
            id_secretaria: stateUser.userIdSecretary && stateUser.userIdSecretary,
            cat_rol_id: values.cat_rol_id,
            id_padrones: values.id_padrones || null,
            observaciones: values?.["observaciones"] || null,
        };


        try {
            const response = await post(urlUser, body);
            form.resetFields();
            showSuccessMessage("Usuario creado exitosamente.");
            setStateUser({
                ...stateUser,
                loadingModal: false,
                loadingTable: false,
                showModal: false,
                currentData: null,
            });

            setTimeout(() => {
                refetch(stateUser.currentPage, stateUser.pageSize).then(() => {
                    showPasswordMessage(
                        "¡Contraseña creada con éxito!",
                        "Por favor, guarda esta contraseña en un lugar seguro.",
                        0,
                        "top",
                        response.password
                    );
                });
            }, 1500);
        } catch (error) {
            console.error("Error to adding user: ", error);
            const {response} = error;
            if (!response) return;
            const {data} = response;
            if (data && data.errors) showErrorMessage(data.errors);
            setStateUser({
                ...stateUser,
                loadingModal: false,
            });
        }
    };

    const handleEditUser = async () => {
        const values = await form.validateFields();
        setStateUser({
            ...stateUser,
            loadingModal: true,
        });

        const body = {
            rfc: values.rfc,
            nombre: values.nombre,
            apellido_paterno: values?.["apellidoPaterno"],
            apellido_materno: values?.["apellidoMaterno"],
            email: values.correo,
            id_secretaria: values.id_secretaria,
            cat_rol_id: values.cat_rol_id,
            id_padrones: values.id_padrones || null,
            observaciones: values?.["observaciones"] || null,
        };

        try {
            const urlAux = `${urlUser}/${values.id_user}`;
            await put(urlAux, body);
            form.resetFields();
            showSuccessMessage("Usuario actualizado exitosamente.");
            setStateUser({
                ...stateUser,
                loadingModal: false,
                showModal: false,
            });
            refetch(stateUser.currentPage, stateUser.pageSize);
        } catch (error) {
            console.error("Error to edit user: ", error);
            const {response} = error;
            if (!response) return;
            const {data} = response;
            if (data && data.errors) showErrorMessage(data.errors);
            setStateUser({
                ...stateUser,
                loadingModal: false,
            });
        }
    };

    const handleDeleteUser = async (userData) => {
        setStateUser({
            ...stateUser,
            loadingTable: true,
        });
        try {
            const urlAux = `${urlUser}/${userData.id}`;
            await del(urlAux);
            showSuccessMessage(`Usuario ${userData.nombre} desactivado exitosamente`);
            refetch(stateUser.currentPage, stateUser.pageSize);
        } catch (error) {
            showErrorMessage("Error desactivando usuarios: ", error);
        } finally {
            setStateUser({
                ...stateUser,
                loadingTable: false,
            });
        }
    };

    const onCancel = () => {
        setStateUser({
            ...stateUser,
            loadingModal: false,
            showModal: false,
            showPadron: false,
        });
        form.resetFields();
    };

    return {
        stateUser,
        setStateUser,
        form,
        WINE,
        columns,
        getModalTitle,
        handleCreateUser,
        handleEditUser,
        onCancel,
        showModalPass,
        handleOkPass,
        handleCancelPass,
        isModalOpen,
        getButtonText,
        getButtonTexPass,
        urlUser,
    };
};

export default useUser;
