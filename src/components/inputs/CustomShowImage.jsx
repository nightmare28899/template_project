import {Image} from "antd";

const CustomShowImage = ({
                             previewImage,
                             previewOpen,
                             setPreviewOpen,
                             setPreviewImage,
                         }) => {
    return (
        <>
            {previewImage && (
                <Image
                    wrapperStyle={{display: "none"}}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};
export default CustomShowImage;
