import { Form, Input, List, Button } from "antd";
import { useState, useCallback, useMemo } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNotificationService } from "@/service/NotificationService";

const CustomAddTextOnList = ({
  state,
  setState,
  dataName,
  placeholder = "Agregar elemento...",
  form,
  maxHeight = 200,
  itemHeight = 50,
  maxItems = 15,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { showErrorMessage } = useNotificationService();
  const currentItems = useMemo(() => state[dataName] || [], [state, dataName]);
  const shouldShowList = useMemo(() => currentItems.length > 0, [currentItems]);
  const calculatedHeight = useMemo(() => {
    const height = Math.min(currentItems.length * itemHeight, maxHeight);
    return Math.max(height, itemHeight);
  }, [currentItems.length, itemHeight, maxHeight]);

  const updateData = useCallback(
    (newData) => {
      form.setFieldsValue({ [dataName]: newData });
      setState((prevState) => ({
        ...prevState,
        [dataName]: newData,
      }));
    },
    [form, dataName, setState]
  );

  const addItem = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    if (currentItems.includes(trimmedValue)) {
      showErrorMessage("Ya agregaste este registro.");
      return;
    }
    if (currentItems.length >= maxItems) return;
    const newData = [...currentItems, trimmedValue];
    updateData(newData);
    setInputValue("");
  }, [inputValue, currentItems, updateData, maxItems]);

  const handlePressEnter = useCallback(
    (e) => {
      e.preventDefault();
      addItem();
    },
    [addItem]
  );

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const removeItem = useCallback(
    (indexToRemove) => {
      const newData = currentItems.filter(
        (_, index) => index !== indexToRemove
      );
      updateData(newData);
    },
    [currentItems, updateData]
  );

  return (
    <div className="custom-add-text-list">
      <Form.Item name={dataName} style={{ display: "none" }}>
        <Input type="hidden" />
      </Form.Item>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onPressEnter={handlePressEnter}
          placeholder={placeholder}
          style={{ flex: 1 }}
          maxLength={100}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addItem}
          disabled={!inputValue.trim() || currentItems.length >= maxItems}
        >
          Agregar
        </Button>
      </div>
      {shouldShowList && (
        <div
          style={{
            height: calculatedHeight - (calculatedHeight / 50) * 3,
            overflow: "auto",
            border: "1px solid #d9d9d9",
            borderRadius: "6px",
            padding: "8px",
            backgroundColor: "#fafafa",
            marginBottom: "30px",
          }}
        >
          <List
            dataSource={currentItems}
            size="small"
            renderItem={(item, index) => (
              <List.Item
                key={`${item}-${index}`}
                style={{
                  borderBottom:
                    index === currentItems.length - 1
                      ? "none"
                      : "1px solid #f0f0f0",
                }}
                actions={[
                  <Button
                    key="delete"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(index)}
                    title="Eliminar elemento"
                  />,
                ]}
              >
                <List.Item.Meta
                  title={
                    <span style={{ fontSize: "14px" }}>
                      {index + 1}. {item}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CustomAddTextOnList;
