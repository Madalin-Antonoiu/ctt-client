import React, { useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';

const EditableTable = () => {

  const data = [{
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
  }]
  const [dataSource, setDataSource] = useState(data);
  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    setDataSource([...dataSource].filter((item) => item.key !== key));
  };
  const handleAdd = () => {
    const newData = {
      key: count + 1,
      name: `Edward King ${count + 1}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    let updated = [...dataSource, newData]
    setDataSource(updated)
    setCount(count + 1);

  };
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Button type="link">Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
        </Button>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}



export default EditableTable