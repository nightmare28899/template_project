import React from 'react';
import {Select} from 'antd';
import {SmileOutlined} from "@ant-design/icons";

const CustomizeRenderEmpty = ({showText}) => (
    <div style={{textAlign: 'center'}}>
        <SmileOutlined style={{fontSize: 20}}/>
        <p>{showText}</p>
    </div>
);

const CustomSelect = ({
                          placeholder = "Selecciona una opción",
                          value,
                          onChange,
                          options = [],
                          mode,
                          loading = false,
                          disabled = false,
                          notFoundContent = "No hay datos",
                          showSearch = false,
                          filterOption,
                          style = {width: '100%'},
                      }) => {
    return (
        <Select
            mode={mode}
            allowClear
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            options={options}
            loading={loading}
            disabled={disabled}
            notFoundContent={<CustomizeRenderEmpty showText={notFoundContent}/>}
            showSearch={showSearch}
            filterOption={filterOption}
            optionFilterProp="label"
            style={style}
        />
    );
};

export default CustomSelect;
