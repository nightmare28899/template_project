import React from 'react';
import {Form, Input} from 'antd';

export default function ValidatedNumberInput({
                                                 label,
                                                 name,
                                                 rules = [],
                                                 placeholder = '',
                                                 prefix = null,
                                                 disabled = false,
                                                 onChange,
                                             }) {
    const noValidateEmotes = {
        validator: (_, value) => {
            if (!value) return Promise.resolve();

            const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{1F3C0}-\u{1F3FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u200D]/u;

            if (emojiRegex.test(value)) {
                return Promise.reject(
                    new Error('No se pérmiten emojis.')
                );
            }

            return Promise.resolve();
        },
    };

    return (
        <Form.Item
            label={label}
            name={name}
            rules={
                rules.length > 0
                    ? [
                        ...rules,
                        noValidateEmotes,
                    ]
                    : [
                        noValidateEmotes,
                    ]
            }
        >
            {
                name === 'password' || name === 'password_confirmation' ? (
                    <Input.Password placeholder={placeholder} prefix={prefix} disabled={disabled}/>
                ) : (
                    <Input placeholder={placeholder} prefix={prefix} disabled={disabled} onChange={onChange}/>
                )
            }
        </Form.Item>
    );
}
