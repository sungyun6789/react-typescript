import React, { useContext, useState } from 'react';
import { Table, Input, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import './Editable.css';
import {
  ColumnTypes,
  DataType,
  EditableCellProps,
  EditableRowProps,
  EditableTableProps,
  EditableTableState,
} from './EditTableType';
import { column } from './EditableColumn';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableRow: React.FC<EditableRowProps> = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext)!;

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item name={dataIndex}>
        {/* onPressEnter: Enter키를 눌렀을 때 일어나는 이벤트 onBlur: 포커스를 잃었을 때(이걸 사용해야 포커스가 사라짐) */}
        <Input onPressEnter={toggleEdit} onBlur={toggleEdit} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component<EditableTableProps, EditableTableState> {
  constructor(props: EditableTableProps) {
    super(props);

    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        },
        {
          key: '2',
          name: 'Edward King 2',
          age: '32',
          address: 'London, Park Lane no. 2',
        },
      ],
      count: 3,
    };
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = column.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });
    return (
      <div>
        <Table
          pagination={false}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>
    );
  }
}

export default EditableTable;
