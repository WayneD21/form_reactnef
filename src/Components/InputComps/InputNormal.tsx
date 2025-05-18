import { Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import type { FormItemProps } from "antd/es/form";
import type { InputProps } from "antd/es/input";
import React from "react";

interface FooterProps {
  className?: string;
  text?: React.ReactNode;
}

interface InputNormalProps {
  formItem?: FormItemProps & { required?: string }; // override required để nhận string làm message
  input?: InputProps;
  fortaweSomeIcon?: FontAwesomeIconProps;
  footer?: FooterProps;
}

const InputNormal: React.FC<InputNormalProps> = ({ formItem = {}, input = {}, fortaweSomeIcon, footer }) => {
  const rules = formItem.required ? [{ required: true, message: formItem.required }] : [];

  return (
    <Form.Item {...formItem} label={<div className="label-primary">{formItem.label}</div>} rules={rules} colon={false}>
      <div>
        <Input
          {...input}
          suffix={
            fortaweSomeIcon && (
              <FontAwesomeIcon
                {...fortaweSomeIcon}
                className="shuffle-btn text-primary"
                style={{ cursor: "pointer" }}
                onMouseDown={(e) => e.preventDefault()}
              />
            )
          }
        />
        {footer && <div className={`font-12 ${footer.className || ""}`}>{footer.text}</div>}
      </div>
    </Form.Item>
  );
};

export default InputNormal;
