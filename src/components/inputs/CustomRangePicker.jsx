import { DatePicker, Form } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  return current && current.valueOf() < dayjs().startOf("day").valueOf();
};

const CustomRangePicker = ({
  label,
  name,
  rules,
  enablePrevDays,
  placeholder = ["Fecha inicio", "Fecha fin"],
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <RangePicker
        locale={locale}
        placeholder={placeholder}
        style={{ width: "100%" }}
        disabledDate={!enablePrevDays && disabledDate}
      />
    </Form.Item>
  );
};

export default CustomRangePicker;
