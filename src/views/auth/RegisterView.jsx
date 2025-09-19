import React from "react";
import { Layout, Typography, Card, Form, Row, Col, Select, Radio, Button, Upload, message, Input } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import CustomInput from "@/components/inputs/CustomInput";
import CustomFile from "@/components/inputs/CustomFile";
import CustomSelect from "@/components/inputs/CustomSelect"

import {useRegister} from "@/hooks";
import ButtonComponent from "../../components/common/Button";

const {Content} = Layout;
const {Title} = Typography;
const WINE = "#5B0B1B";

const normFile = (e) => (Array.isArray(e) ? e : e?.fileList ?? []);

export default function RegisterView() {

    const {
        open,
        setOpen,
        form,
        stateSolicitud,
        setStateSolicitud,
        WINE,
        genderOptions,
        handleCreateSolicitud,
        urlSolicitud,
        locationData,
        handleCPChange,
    } = useRegister();

    return (
        <Layout>
            <Content style={{display: "grid", placeItems: "center", marginTop: 50, marginBottom: 50}}>
                <Card style={{width: "100%", maxWidth: 1100, borderRadius: 12}}>
                    <Title level={2} style={{textAlign: "center", color: WINE, marginTop: 0}}>
                        Solicitud
                    </Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleCreateSolicitud}
                        requiredMark={false}
                        onChange={(e) => handleCPChange(e)}
                    >
                        <Row gutter={16}>
                            <Col className="grutter-row" span={24}>
                                <Form.Item
                                    name="padrones"
                                    rules={[
                                        { required: true, message:"Es necesario seleccionar al menos un padrón"}
                                    ]}
                                >
                                    <CustomSelect
                                        placeholder="Seleccione Padrón"
                                        options={stateSolicitud.padronesOptions}
                                        showSearch
                                        mode="multiple"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={8}>
                                <CustomInput
                                    name="curp"
                                    placeholder="CURP"
                                    rules={[
                                        { required: true, message: "Ingresa la CURP" },
                                        {
                                            pattern: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/,
                                            message: "CURP inválida",
                                        },
                                    ]}
                                />
                            </Col>
                            <Col xs={24} md={8}>
                                <CustomInput
                                    name="nombre"
                                    placeholder="Nombre(s)"
                                    rules={[{ required: true, message: "Ingresa el nombre" }]}
                                />
                            </Col>

                            <Col xs={24} md={8}>
                                <CustomInput
                                    name="apellido_paterno"
                                    placeholder="Apellido paterno"
                                    rules={[{ required: true, message: "Ingresa el apellido paterno" }]}
                                />
                            </Col>

                            <Col xs={24} md={8}>
                                <CustomInput
                                    name="apellido_materno"
                                    placeholder="Apellido materno"
                                    rules={[{ required: true, message: "Ingresa el apellido materno" }]}
                                />
                            </Col>

                            <Col xs={24} md={4}>
                                <Form.Item
                                    name="sexo"
                                    rules={[{ required: true, message: "Selecciona el sexo" }]}
                                >
                                    <Select placeholder="Sexo">
                                        <Select.Option value="H">Hombre</Select.Option>
                                        <Select.Option value="M">Mujer</Select.Option>
                                        <Select.Option value="X">Otro</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={4}>
                                <CustomInput
                                    name="edad"
                                    placeholder="Edad"
                                    type="number"
                                    rules={[
                                        { required: true, message: "Ingresa la edad" },
                                        {
                                            type: "number",
                                            min: 0,
                                            max: 120,
                                            transform: (v) => (v !== undefined && v !== "" ? Number(v) : NaN),
                                            message: "Edad inválida",
                                        },
                                    ]}
                                />
                            </Col>

                            <Col xs={24} md={8}>
                                <CustomInput
                                    name="telefono"
                                    placeholder="Teléfono"
                                    rules={[
                                        { required: true, message: "Ingresa el teléfono" },
                                        {
                                            pattern: /^\d{10}$/,
                                            message: "El teléfono debe tener 10 dígitos",
                                        },
                                    ]}
                                />
                            </Col>

                            <Col xs={24} md={8}>
                                <CustomInput
                                    name="email"
                                    placeholder="Correo Electrónico"
                                    rules={[
                                        { required: true, message: "Ingresa el correo electrónico" },
                                        { type: "email", message: "Correo electrónico inválido" },
                                    ]}
                                />
                            </Col>

                            <Col xs={24} md={8}>
                                <CustomInput
                                    name="confirm_Email"
                                    placeholder="Confirmar correo electrónico"
                                    rules={[
                                        { required: true, message: "Confirma el correo electrónico" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("email") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("Los correos no coinciden"));
                                            },
                                        }),
                                    ]}
                                />
                            </Col>

                            <Col xs={24} md={8}>
                                <CustomInput
                                    name="medio_remesas"
                                    placeholder="Medio o banco donde reciben remesas"
                                    rules={[{ required: true, message: "Ingresa el banco o medio" }]}
                                />
                            </Col>

                            <Col xs={24} md={8}>
                                <CustomInput
                                    name="calle"
                                    placeholder="Calle"
                                    rules={[{ required: true, message: "Ingresa la calle" }]}
                                />
                            </Col>

                            <Col xs={24} md={4}>
                                <CustomInput
                                    name="no"
                                    placeholder="Número Exterior"
                                    type="number"
                                    rules={[
                                        { required: true, message: "Ingresa el número" },
                                        {
                                            type: "number",
                                            min: 0,
                                            transform: (v) => (v !== undefined && v !== "" ? Number(v) : NaN),
                                            message: "Número inválido",
                                        },
                                    ]}
                                />
                            </Col>

                            <Col xs={24} md={4}>
                                <CustomInput
                                    name="cp"
                                    placeholder="Código Postal"
                                    type="number"
                                    rules={[
                                        { required: true, message: "Ingresa el código postal" },
                                        {
                                            pattern: /^\d{5}$/,
                                            message: "Código postal inválido (5 dígitos)",
                                        },
                                    ]}
                                />
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="identificador_colonia"
                                    hidden
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="colonia"
                                >
                                    <CustomSelect
                                        name="colonia"
                                        placeholder="Colonia"
                                        disabled={locationData.isDisabled}
                                        options={locationData.colonia}
                                        rules={[{ required: true, message: "Selecciona la colonia" }]}
                                        onChange={(value, option) => {
                                            form.setFieldValue('identificador_colonia', option.identificador);
                                        }}
                                        showSearch
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="identificador_localidad"
                                    hidden
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="localidad"
                                >
                                    <CustomSelect
                                        name="localidad"
                                        placeholder="Localidad"
                                        options={locationData.localidad}
                                        rules={[{ required: true, message: "Selecciona la localidad" }]}
                                        onChange={(value, option) => {
                                            form.setFieldValue('identificador_localidad', option.identificador);
                                        }}
                                        showSearch
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="identificador_municipio"
                                    hidden
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="municipio"
                                >
                                    <CustomSelect
                                        name="municipio"
                                        placeholder="Municipio"
                                        options={locationData.municipio}
                                        rules={[{ required: true, message: "Selecciona el municipio" }]}
                                        onChange={(value, option) => {
                                            form.setFieldValue('identificador_municipio', option.identificador);
                                        }}
                                        showSearch
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="identificador_estado"
                                    hidden
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="estado"
                                >
                                    <CustomSelect
                                        name="estado"
                                        placeholder="Estado"
                                        options={locationData.estado}
                                        rules={[{ required: true, message: "Selecciona el estado" }]}
                                        onChange={(value, option) => {
                                            form.setFieldValue('identificador_estado', option.identificador);
                                        }}
                                        showSearch
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    label="Comunidad LGBTTQ+"
                                    name="comunidad_lgbttq"
                                    rules={[{ required: true, message: "Selecciona una opción" }]}
                                >
                                    <Radio.Group>
                                        <Radio value="SI">Sí</Radio>
                                        <Radio value="NO">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    label="Comunidad Indígena"
                                    name="comunidad_indigena"
                                    rules={[{ required: true, message: "Selecciona una opción" }]}
                                >
                                    <Radio.Group>
                                        <Radio value="SI">Sí</Radio>
                                        <Radio value="NO">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            
                            <Col xs={24} md={8}>
                                <CustomFile
                                    name="identificacion_oficial"
                                    label="Identificación Oficial"
                                    rules={[
                                        { required: true, message:"Documento requerido"}
                                    ]}
                                />
                            </Col>
                        
                            <Col xs={24} md={8}>
                                <CustomFile
                                    name="remesas"
                                    label="Remesas"
                                    rules={[
                                        { required: true, message:"Documento requerido"}
                                    ]}
                                />
                            </Col>

                            <Col className="grutter-row" span={8}>
                                <CustomFile
                                    name="comprobante_domicilio"
                                    label="Comprobante de Domicilio"
                                    rules={[
                                        { required: true, message:"Documento requerido"}
                                    ]}
                                />
                            </Col>
                        </Row>


                        <Row justify={"end"}>
                            <ButtonComponent
                            textButton="Generar Solicitud"
                            />
                        </Row>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
}
