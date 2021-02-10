import React, { useState, useEffect } from "react";
import requireAuth from "../../components/requireAuth";
import { Table } from "antd";

const Websocket = () => {
  const [coins, setCoins] = useState([]);

  const columns = [
    {
      title: 'Coin',
      dataIndex: 'coin',
      sorter: (a, b) => a.coin < b.coin,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '0m',
      dataIndex: '_0m',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a._0m.replace(/[!@#$%^&*]/g, "") - b._0m.replace(/[!@#$%^&*]/g, ""),
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
  const list = coins.map((each) => {
    return {
      key: `${each.coin}`,
      coin: `${each.coin}`,
      _0m: `${each.percentageDiff}`,
    }
    // title={`${each.coin} : ${each.percentageDiff} (${each.comparedTo})`}
    //    <div> {parseFloat(each.priceNow)} vs {parseFloat(each.priceBackThen)}({each.timeBackThen})</div>

  });

  useEffect(() => {
    const binanceSocket = new WebSocket("ws://localhost:8080/");
    binanceSocket.onopen = () => {
      console.log("Stream open.");
      binanceSocket.send("Hi back!");
    };
    binanceSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setCoins(data);
    };
    binanceSocket.onclose = () => {
      console.log("Closed");
    };

    return () => {
      binanceSocket.close();
    };
  }, []);

  return (
    <div className="site-card-wrapper">
      {list.length}
      <Table columns={columns} dataSource={list} onChange={onChange} />
    </div>
  );
};

export default requireAuth(Websocket);
