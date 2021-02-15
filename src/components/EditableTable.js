import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Tag, Skeleton, Divider, Tooltip } from 'antd';
import MyAutoComplete from "../components/MyAutoComplete"
import { DeleteOutlined, StarOutlined, AlertOutlined } from '@ant-design/icons';
import "./EditableTable.css"


const EditableTable = ({ coins }) => {

  const P = (obj, time) => obj[time]?.percentageDiff ? Number(obj[time]?.percentageDiff) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
  const p = (each) => each["0m"]?.priceNow ? parseFloat(each["0m"].priceNow) : <Tag color="grey">None</Tag>



  const favs = ""; // ["ETHUSDT", "BTCUSDT"]
  const [favorite, setFavorite] = useState(favs);// take them from localStorage as strings later on

  const coin = (each) => {
    const coin = each.coin?.replace("USDT", "");
    const link = `https://www.binance.com/en/trade/${coin}_USDT?layout=pro`
    return <a href={link} target="_blank">{coin}</a>
  }
  const list = favorite !== "" ? coins
    //.sort((a, b) =>  b["0m"]?.percentageDiff - a["0m"]?.percentageDiff) // b-a descending (bigger first)
    // eslint-disable-next-line array-callback-return
    .filter((each) => {

      for (let i = 0; i < favorite.length; i++) {
        if (each.coin === favorite[i]) {
          return each
        }
      }

    }
    )
    .map((each) => {
      return {
        key: each.key,
        coin: coin(each),
        _0m: P(each, "0m"),
        _1m: P(each, "1m"),
        _3m: P(each, "3m"),
        _5m: P(each, "5m"),
        _10m: P(each, "10m"),
        _15m: P(each, "15m"),
        _30m: P(each, "30m"),
        _60m: P(each, "60m"),
        price: p(each),
      }
      // title={`${each.coin} : ${each.percentageDiff} (${each.comparedTo})`}
      //    <div> {parseFloat(each.priceNow)} vs {parseFloat(each.priceBackThen)}({each.timeBackThen})</div>

    }) : "";

  const [dataSource, setDataSource] = useState([]); // useState(list);


  const handleDelete = async (key) => {
    setFavorite([...favorite].filter((item) => item !== key))    // console.log(key);
  };


  const handleAddFromAutoCompleteInput = async (data) => {

    //Update the favorites
    setFavorite([...favorite, data])

    //Find only those that match my favorite strings
    const found = coins
      //.sort((a, b) =>  b["0m"]?.percentageDiff - a["0m"]?.percentageDiff) // b-a descending (bigger first)
      // eslint-disable-next-line array-callback-return
      .filter((each) => {
        for (let i = 0; i < favorite.length; i++) {
          if (each.coin === favorite[i]) {
            return each
          }
        }

      }
      )
      .map((each) => {
        return {
          key: each.key,
          coin: each.coin?.replace("USDT", ""),
          _0m: P(each, "0m"),
          _1m: P(each, "1m"),
          _3m: P(each, "3m"),
          _5m: P(each, "5m"),
          _10m: P(each, "10m"),
          _15m: P(each, "15m"),
          _30m: P(each, "30m"),
          _60m: P(each, "60m"),
          price: p(each),
        }
        // title={`${each.coin} : ${each.percentageDiff} (${each.comparedTo})`}
        //    <div> {parseFloat(each.priceNow)} vs {parseFloat(each.priceBackThen)}({each.timeBackThen})</div>

      }
      );


    //Update the  dataSource
    setDataSource([...dataSource, found])



  }

  const columns = [
    {
      title: 'Coin',
      dataIndex: 'coin',
      sorter: (a, b) => a.coin?.localeCompare(b.coin), // alphabetical sort (antd)
      sortDirections: ['ascend', 'descend'],
      key: 1
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b.price - a.price,
      key: 10
    },
    {
      title: '0m',
      dataIndex: '_0m',
      defaultSortselectedMinute: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => parseFloat(b._0m) - parseFloat(a._0m),
      key: 2
    },
    {
      title: '1m',
      dataIndex: '_1m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._1m - a._1m,
      key: 3
    },
    {
      title: '3m',
      dataIndex: '_3m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._3m - a._3m,
      key: 4

    },
    {
      title: '5m',
      dataIndex: '_5m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._5m - a._5m,
      key: 5
    },
    {
      title: '10m',
      dataIndex: '_10m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._10m - a._10m,
      key: 6
    },
    {
      title: '15m',
      dataIndex: '_15m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._15m - a._15m,
      key: 7
    },
    {
      title: '30m',
      dataIndex: '_30m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._30m - a._30m,
      key: 8
    },
    {
      title: '60m',
      dataIndex: '_60m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._60m - a._60m,
      key: 9
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            <Popconfirm title="Sure to untrack?" onConfirm={() => handleDelete(record.key)}>
              <Tooltip title="Untrack">
                <Button type="link" icon={<DeleteOutlined style={{ color: "red" }} />}></Button>
              </Tooltip>
            </Popconfirm>

            <Popconfirm title="Sure to set alarm?" onConfirm={() => handleDelete(record.key)}>
              <Tooltip title="Set Alarm">
                <Button type="link" icon={<AlertOutlined style={{ color: "orange" }} />}></Button>
              </Tooltip>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  useEffect(() => {
    setDataSource(list)
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coins])


  return (
    <>
      <Divider plain style={{ userSelect: "none" }}>
        <Tag color={"#001f3f"}>
          <StarOutlined /> {" "}
             Track Favorites
        </Tag>
        <MyAutoComplete data={coins} onChangeLetParentKnow={handleAddFromAutoCompleteInput} />

      </Divider>


      <div id="my-editable-table">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="small"
          expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.key}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          style={{ userSelect: "none" }}
        />
      </div>
      {/* columns={columns} dataSource={list} */}
    </>
  );
}



export default EditableTable