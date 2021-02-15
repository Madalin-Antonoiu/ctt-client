import React, { useState } from 'react';
import { Table, Button, Popconfirm, Tag, Skeleton } from 'antd';
import MyAutoComplete from "../components/MyAutoComplete"

const EditableTable = ({ coins }) => {

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
  // const list = coins
  // //.sort((a, b) =>  b["0m"]?.percentageDiff - a["0m"]?.percentageDiff) // b-a descending (bigger first)
  // .filter((each) => each.coin === "BTCUSDT")
  // .map((each) => {
  //   return {
  //     coin: each.coin?.replace("USDT", ""),
  //     _0m: P(each, "0m"),
  //     _1m: P(each, "1m"),
  //     _3m: P(each, "3m"),
  //     _5m: P(each, "5m"),
  //     _10m: P(each, "10m"),
  //     _15m: P(each, "15m"),
  //     _30m: P(each, "30m"),
  //     _60m: P(each, "60m"),
  //     price: p(each),
  //   }
  //   // title={`${each.coin} : ${each.percentageDiff} (${each.comparedTo})`}
  //   //    <div> {parseFloat(each.priceNow)} vs {parseFloat(each.priceBackThen)}({each.timeBackThen})</div>

  // }
  // );


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

  const handleAddFromAutoCompleteInput = (data) => {
    console.log(data)
    const newData = {
      key: count + 1,
      name: data,
      age: '32',
    };

    let updated = [...dataSource, newData]
    setDataSource(updated)
    setCount(count + 1);

  }

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

  const P = (obj, time) => obj[time]?.percentageDiff ? Number(obj[time]?.percentageDiff) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
  const p = (each) => each["0m"]?.priceNow ? parseFloat(each["0m"].priceNow) : <Tag color="grey">None</Tag>

  // const columns = [
  //   {
  //     title: 'Coin',
  //     dataIndex: 'coin',
  //     sorter: (a, b) => a.coin?.localeCompare(b.coin), // alphabetical sort (antd)
  //     sortDirections: ['ascend', 'descend'],
  //     key: 1
  //   },
  //   {
  //     title: 'Price',
  //     dataIndex: 'price',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => b.price - a.price,
  //     key: 10
  //   },
  //   {
  //     title: '0m',
  //     dataIndex: '_0m',
  //     defaultSortselectedMinute: 'ascend',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => parseFloat(b._0m) - parseFloat(a._0m),
  //     key: 2
  //   },
  //   {
  //     title: '1m',
  //     dataIndex: '_1m',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => b._1m - a._1m,
  //     key: 3
  //   },
  //   {
  //     title: '3m',
  //     dataIndex: '_3m',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => b._3m - a._3m,
  //     key: 4

  //   },
  //   {
  //     title: '5m',
  //     dataIndex: '_5m',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => b._5m - a._5m,
  //     key: 5
  //   },
  //   {
  //     title: '10m',
  //     dataIndex: '_10m',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => b._10m - a._10m,
  //     key: 6
  //   },
  //   {
  //     title: '15m',
  //     dataIndex: '_15m',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => b._15m - a._15m,
  //     key: 7
  //   },
  //   {
  //     title: '30m',
  //     dataIndex: '_30m',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => b._30m - a._30m,
  //     key: 8
  //   },
  //   {
  //     title: '60m',
  //     dataIndex: '_60m',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => b._60m - a._60m,
  //     key: 9
  //   },
  // ];


  return (
    <div>
      <MyAutoComplete data={coins} onChangeLetParentKnow={handleAddFromAutoCompleteInput} />

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
        size="small"
      />
      {/* columns={columns} dataSource={list} */}
    </div>
  );
}



export default EditableTable