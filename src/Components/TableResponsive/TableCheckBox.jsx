import { useState, useEffect, useRef } from "react";
import { Table } from "antd";
import SelectItemCtg from "../SelectShowComps/SelectItemCtg";
import "../../Styles/Table.scss";

const TableCheckBox = ({
  initialColumns,
  dataSource,
  setPageSize,
  current,
  total,
  showItemsConfig = {
    defaultValue: 10,
    values: [10, 20, 30, 40],
    style: { width: 80, marginRight: 8 }
  },
  buttons = null,
  rowSelection = null,
  forceRender,
  onChange,
  loading
}) => {
  const tableRef = useRef(null);
  const [visibleColumns, setVisibleColumns] = useState(initialColumns.map((col) => col.key));
  let isResizing = false;
  let widths;

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const handleResize = () => {
    if (isResizing) {
      return;
    }
    isResizing = true;

    const widthTbody = tableRef.current?.querySelector(".ant-table-tbody")?.offsetWidth;
    const tableWidth = tableRef.current?.clientWidth;

    if (!widthTbody || !tableWidth) {
      return;
    }

    let plusWidth = 0;
    const newColumns = [];

    if (widths == null) {
      const all_th = tableRef.current.querySelectorAll(".ant-table-thead th");
      widths = Array.from(all_th).map((cell) => cell.offsetWidth + 10);
    }

    const truDi = widthTbody - tableWidth;
    const newWidth = tableWidth - truDi;

    for (let i = 0; i < initialColumns.length; i++) {
      plusWidth += widths[rowSelection==null?i:i+1] || 0;
      if (plusWidth < newWidth) {
        newColumns.push(initialColumns[i].key);
      } else {
        break;
      }
      if (i >= widths.length) {
        break;
      }
    }

    // if (plusWidth >= newWidth) {
    //   newColumns.pop();
    // }
    setVisibleColumns(newColumns);
    isResizing = false;
  };

  useEffect(() => {
    setTimeout(handleResize,100);
    const debouncedHandleResize = debounce(handleResize, 50);
    var widthTbodyB = [];
    const observer = new ResizeObserver((entries) => {
      if (entries.length > 0 && tableRef.current) {
        const widthTbody = tableRef.current?.querySelector("tbody")?.offsetWidth;
        if (!widthTbodyB.includes(widthTbody)) {
          requestAnimationFrame(debouncedHandleResize);
        }
        if (widthTbodyB.length <= 2) {
          widthTbodyB.push(widthTbody);
        } else {
          widthTbodyB = [];
        }
      }
    });

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => {
      if (tableRef.current) {
        observer.unobserve(tableRef.current);
      }
    };
  }, []);

  const columns = initialColumns.filter((column) => visibleColumns.includes(column.key));

  const expandable = {
    expandedRowRender: (record) => (
      <div style={{ margin: 0 }}>
        {initialColumns.map(
          ({ key, title }) =>
            !visibleColumns.includes(key) && (
              <div key={key} className="d-flex">
                <strong>{title}:</strong>
                <span style={{ marginLeft: 2, wordWrap: "break-word", whiteSpace: "normal" }}>{record[key]}</span>
              </div>
            )
        )}
      </div>
    )
  };

  return (
    <div className="py-0 px-16">
      <div className="d-flex flex-row justify-content-between pb-16">
        <SelectItemCtg selectItem={showItemsConfig} setPageSize={setPageSize} />
        <div className="d-flex gap-20">{buttons}</div>
      </div>
      <div ref={tableRef} className="wrap-table-d">
        <Table
          scroll={{ x: "max-content" }}
          className="table-d"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          expandable={visibleColumns.length < initialColumns.length ? expandable : undefined}
          pagination={{
            current: current,
            total: total,
            showSizeChanger: false,
            responsive: true,
            pageSize: showItemsConfig.defaultValue,
            pageSizeOptions: showItemsConfig.values,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          rowSelection={rowSelection}
          forceRender={forceRender}
          onChange={(pagination) => {
            onChange?.(pagination);
          }}
        />
      </div>
    </div>
  );
};

export default TableCheckBox;
