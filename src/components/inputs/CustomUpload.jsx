import {useState} from "react";
import {Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import getBase64 from "@/utils/getBase64";
import CustomShowImage from "@/components/inputs/CustomShowImage";

const UploadButton = () => (
    <button style={{border: 0, background: "none"}} type="button">
        <PlusOutlined/>
        <div style={{marginTop: 8}}>Subir imagen</div>
    </button>
);

const CustomCrop = ({cropFlag, children}) => {
    return cropFlag ? <ImgCrop rotationSlider modalTitle="Editar imagen">{children}</ImgCrop> : <>{children}</>;
}

const CustomUpload = ({fileList, setFileList, cropFlag = false}) => {
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            const preview = await getBase64(file.originFileObj);
            file = {...file, preview};
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({fileList: newFileList}) => {
        const updatedList = newFileList.map((file, index) => ({
            ...file,
            status: index === 0 ? "done" : file.status,
        }));
        setFileList(updatedList);
    };

    const customRequest = ({ onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    return (
        <>
            <CustomCrop cropFlag={cropFlag}>
                <Upload
                    accept={".png, .jpg, .jpeg"}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    customRequest={customRequest}
                >
                    {fileList.length >= 1 ? null : <UploadButton/>}
                </Upload>
            </CustomCrop>

            <CustomShowImage
                previewImage={previewImage}
                previewOpen={previewOpen}
                setPreviewOpen={setPreviewOpen}
                setPreviewImage={setPreviewImage}
            />
        </>
    );
};

export default CustomUpload;
