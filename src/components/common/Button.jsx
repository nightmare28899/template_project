import React from "react";
import {Button} from "antd";

const ButtonComponent = ({textButton = '', action = null}) => {

    return (
        <div style={styles.buttonContainer}>
            <div style={styles.buttonWrapper}>
                <Button
                    htmlType="submit"
                    type="primary"
                    block
                    style={styles.button}
                    onClick={action}
                >
                    {textButton}
                </Button>
            </div>
        </div>
    )
}

const styles = {
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    buttonWrapper: {
        minWidth: 150,
        maxWidth: 250,
        width: "100%",
    },
    button: {
        backgroundColor: "#4A001F",
        borderColor: "#4A001F",
        borderRadius: 8,
    },
}

export default ButtonComponent;
