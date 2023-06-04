import React from "react";
import { Form } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = ({
  label,
  name,
  value,
  handlePhone,
  disableDropdown = false,
  countryCodeEditable = true,
  isRequired,
  error,
}) => {
  return (
    <Form.Item label={label} required={isRequired}>
      <PhoneInput
        country="sg"
        value={value}
        onChange={(phone) => handlePhone(name, phone)}
        disableDropdown={disableDropdown}
        countryCodeEditable={countryCodeEditable}
        inputStyle={error ? { border: "1px solid #ff4d4f" } : {}}
      />
      {error && <p className="cus-error">{error}</p>}
    </Form.Item>
  );
};

export default PhoneNumberInput;
