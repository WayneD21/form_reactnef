import { Form, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputNumberNormal = ({
  required = true,
  requiredMessage = "This field is required",
  label,
  formItemClassName,
  name,
  defaultValue,
  value,
  className,
  style,
  placeholder,
  maxLength,
  onChange,
  controls = true,
  format = " ",
  icon,
  textBottomClass,
  textBottom
}) => {
  const Rules = required ? [{ required: true, message: requiredMessage }] : [];

  return (
    <Form.Item
      label={<div className="label-primary">{label}</div>}
      name={name}
      rules={Rules}
      colon={false}
      className={`input-number-form ${formItemClassName}`}
    >
      <div>
        <div className="d-flex align-items-center">
          {!icon || (
            <span className="icon-desc border-right-0">
              <FontAwesomeIcon className="text-primary font-16" icon={icon} />
            </span>
          )}
          <InputNumber
            value={value}
            className={`width-full ${className}`}
            style={style}
            placeholder={placeholder}
            defaultValue={defaultValue}
            controls={controls}
            maxLength={maxLength}
            onChange={(value) => onChange?.(value)}
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, format)}
            parser={(value) => value?.replace(/\D/g, "")}
          />
        </div>
        {textBottom != null ? (
          <div style={{ marginLeft: 10 }} className={`font-12 ${textBottomClass}`}>
            {textBottom}
          </div>
        ) : (
          ""
        )}
      </div>
    </Form.Item>
  );
};

export default InputNumberNormal;
