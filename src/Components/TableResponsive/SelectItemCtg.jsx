import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectItemCtg = ({ selectItem, setPageSize }) => {
  // State để lưu trang thái của page size (số lượng item trên mỗi trang)
  return (
    <div>
      <span className="me-6">Show: </span>
      <Select
        defaultValue={selectItem?.defaultValue}
        style={selectItem?.style} //style============================
        onChange={setPageSize}
      >
        {selectItem?.values?.map((element) => (
          <Option key={element} value={element}>
            {element}
          </Option>
        ))}
      </Select>
       Items
    </div>
  );
};

export default SelectItemCtg;
