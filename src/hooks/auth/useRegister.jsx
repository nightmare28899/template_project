import { useEffect, useState } from "react";
import { Form,} from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined, } from "@ant-design/icons";
import { useFetch, useOptions } from "@/hooks";
import { makePetitions } from "@/service/core/makePetitions";
import { useNotificationService } from "@/service/NotificationService";

const WINE = "#5B0B1B";

const useRegister = () => {
    const urlSolicitud = "beneficiarios/solicitudes/generar"
    const urlCP = "codigo/postal"
    const urlPadrones = "padrones/list"
    const [open, setOpen] = useState(false);
    // const [previewOpen, setPreviewOpen] = useState(false);
    // const [previewImage, setPreviewImage] = useState('');
    // const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const {showSuccessMessage, showErrorMessage} = useNotificationService();
    const [stateSolicitud, setStateSolicitud] = useState({
        data: [],
        originalData: [],
        showModal: false,
        isEditing: false,
        permissions: [],
        loadingPermissions: false,
        selectedPermissions: [],
        showErrorInput: false,
        currentPage: 0,
        lastPage: 0,
        path: "",
        loadingTable: true,
        roleName: "",
        searchValue: "",
        loadingModal: false,
        totalPage: 0,
        padronesOptions:[],
    });
    const [locationData, setLocationData] = useState({
        isDisabled: true,
        estado: [],
        municipio: [],
        localidad: [],
        colonia: []
    });

    const {
        data: responsePadrones,
        error: padronesError,
    } = useFetch(urlPadrones, {})
    useOptions(responsePadrones, padronesError, "padronesOptions", setStateSolicitud);

    const { post, del} = makePetitions;

    const genderOptions = [
        { label: 'Hombre', value: 'H' },
        { label: 'Mujer', value: 'M' },
        { label: 'Otro', value: 'O' },
    ]

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    } 
    
    async function handleCreateSolicitud() {
        const values = await form.getFieldsValue();
        const body = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          body.append(key, value);
        });
        
        setStateSolicitud({
            ...stateSolicitud,
            loadingModal: true,
        });
        
        try {
            await post(urlSolicitud, body, config);
            
            showSuccessMessage("Solicitud creado exitosamente.");
 
            form.resetFields();
            setStateSolicitud({
                ...stateSolicitud,
                loadingModal: false,
                loadingTable: false,
                showModal: false,
                currentData: null,
            });
            refetch(stateSolicitud.currentPage, stateSolicitud.pageSize)
        } catch (error) {
            const {response} = error;
            if (!response) return;
            const { data } = response;
            if (data && data.message) showErrorMessage(data.message);
            setStateSolicitud({
                ...stateSolicitud,
                loadingModal: false,
            });
        }
    }

    const getLocationData = async (cp) => {
        const body = { codigo_postal: cp }
        try {
            const response = await post(`${urlCP}`, body);
            
            if (!response) {
                throw new Error('No se recibieron datos');
            }
            const formattedData = {
                estado: response.Estado?.map(item => ({
                    value: item.DESCRIPCION,
                    label: item.DESCRIPCION,
                    identificador: item.IDENTIFICADOR
                })) || [],
                municipio: response.Municipio?.map(item => ({
                    value: item.DESCRIPCION,
                    label: item.DESCRIPCION,
                    identificador: item.IDENTIFICADOR
                })) || [],
                localidad: response.Localidad?.map(item => ({
                    value: item.DESCRIPCION,
                    label: item.DESCRIPCION,
                    identificador: item.IDENTIFICADOR
                })) || [],
                colonia: response.Colonia?.map(item => ({
                    value: item.DESCRIPCION,
                    label: item.DESCRIPCION,
                    identificador: item.IDENTIFICADOR
                })) || []
            };

            setLocationData(formattedData);
        } catch (error) {
            console.error("Error completo:", error);
            showErrorMessage("Error al obtener datos de ubicación");
            setLocationData({
                estado: [],
                municipio: [],
                localidad: [],
                colonia: []
            });
        }
    };

    const handleCPChange = (e) => {
        const cpValue = e.target.value;
        console.log(locationData)
        if (cpValue.length === 5) {
            getLocationData(cpValue);
        } if (cpValue.length !== 5) {
            setLocationData({
                estado: [],
                municipio: [],
                localidad: [],
                colonia: []
            });
        }
    };

    return {
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
    }
}

export default useRegister;