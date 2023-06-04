import React, { memo } from "react";
import { Form, Radio, Space } from "antd";

const RadioButtons = ({
  label,
  name,
  value,
  optionsArr,
  handleChange,
  isRequired,
  error,
}) => {
  return (
    <Form.Item label={label} required={isRequired}>
      <Radio.Group onChange={handleChange} name={name} value={value}>
        <Space direction="vertical">
          {optionsArr?.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.name}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      {error && <p className="cus-error">{error}</p>}
    </Form.Item>
  );
};

export default memo(RadioButtons);
