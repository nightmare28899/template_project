import {Alert} from "antd";
import React from "react";

const EmptyContent = ({message = "", description = "", content = [], children = null}) => {

    if (!content || !Array.isArray(content) || content.length === 0) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40vh",
                }}
            >
                <Alert
                    message={message}
                    description={description}
                    type="info"
                    showIcon
                    style={{width: "30%"}}
                />
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    )
}

export default EmptyContent;
