import React from "react";
import { Form, DatePicker } from "antd";

function CalendarField({ label,
                         name,
                         rules = [],
                         disabled = false,
                         styles,
                         placeholder,
                         picker = "date",
                         defaultValue 
 }) {

    return (
        <>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                initialValue={defaultValue}
            >
                <DatePicker
                    format={picker === "date" ? "DD/MM/YYYY" : "YYYY"}
                    disabled={disabled}
                    style={styles ? styles : {width: "100%"}}
                    placeholder={placeholder ? placeholder : "Seleccione una Fecha"}
                    picker={picker}
                />
            </Form.Item>

        </>
    );
}

export default CalendarField;
