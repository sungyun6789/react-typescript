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

const EditableCell: React.FC<EditableCellProps> = ({ editable, children, dataIndex, record }) => {
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
        <Input onPressEnter={toggleEdit} onBlur={toggleEdit} />
      </Form.Item>
    ) : (
      <div onClick={toggleEdit}>{children}</div>
    );
  }

  return <td>{childNode}</td>;
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
      // map 에서 return 사용할 때 이런식으로
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
    console.log(
      columns.map((val) => {
        if (val.title === '') {
          return val;
        }
        return {
          ...val,
        };
      }),
    );
    return (
      <div>
        <Table
          pagination={false}
          components={components}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>
    );
  }
}

export default EditableTable;
