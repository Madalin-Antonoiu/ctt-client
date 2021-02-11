import React, { useState, useEffect } from "react";
import requireAuth from "../../components/requireAuth";
import { Table, Skeleton, Tag, Spin, Space, Row } from "antd";

const Websocket = () => {
  const [coins, setCoins] = useState([]);

  const columns = [
    {
      title: 'Coin',
      dataIndex: 'coin',
      sorter: (a, b) => a.coin?.localeCompare(b.coin), // alphabetical sort (antd)
      sortDirections: ['ascend', 'descend'],
    },

    {
      title: '0m',
      dataIndex: '_0m',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._0m - a._0m
    },
    {
      title: '1m',
      dataIndex: '_1m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._1m - a._1m
    },
    {
      title: '3m',
      dataIndex: '_3m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._3m - a._3m
    },
    {
      title: '5m',
      dataIndex: '_5m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._5m - a._5m
    },
    {
      title: '10m',
      dataIndex: '_10m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._10m - a._10m
    },
    {
      title: '15m',
      dataIndex: '_15m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._15m - a._15m
    },
    {
      title: '30m',
      dataIndex: '_30m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._30m - a._30m
    },
    {
      title: '60m',
      dataIndex: '_60m',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b._60m - a._60m
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => b.price - a.price
    },

  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  // function numberWithCommas(x) {
  //   return parseInt(x)
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  const P = (obj, time) => obj[time]?.percentageDiff ? Number(obj[time]?.percentageDiff) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
  const p = (each) => each["0m"]?.priceNow ? parseFloat(each["0m"].priceNow) : <Tag color="grey">None</Tag>

  const list = coins
    //.sort((a, b) =>  b["0m"]?.percentageDiff - a["0m"]?.percentageDiff) // b-a descending (bigger first)
    .filter((each) => !each.coin?.endsWith("DOWNUSDT"))
    .filter((each) => !each.coin?.endsWith("UPUSDT"))
    // .filter((each) => each["0m"].percentageDiff)
    .map((each) => {
      return {
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

  useEffect(() => {
    const binanceSocket = new WebSocket("ws://localhost:8080/");
    binanceSocket.onopen = () => {
      console.log("Stream open.");
      binanceSocket.send("Hi back!");
    };
    binanceSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      // console.log(data);
      setCoins(data);
    };
    binanceSocket.onclose = () => {
      console.log("Closed");
    };

    return () => {
      binanceSocket.close();
    };
  }, []);

  return <div className="site-card-wrapper">
    {list.length ? <div>


      <div style={{ maxWidth: "50rem" }}>

        <Table columns={columns} dataSource={list} onChange={onChange} size="small" pagination={{ position: ["none", "bottomCenter"] }} />        {/* [top,bottom] */}


      </div>

    </div> : <Row type="flex" justify="center" align="middle" style={{ minHeight: 'calc(100vh - 184px)' }}>
        <Space size="middle">
          <Spin size="large" />
        </Space>

      </Row>

    }

  </div>



};

export default requireAuth(Websocket);
