// import React, { useEffect, useState } from "react";
// import requireAuth from "../../components/requireAuth";
// import { Table } from "antd";

// const Websocket = () => {
//   const [coins, setCoins] = useState([]);

//   useEffect(() => {
//     const binanceSocket = new WebSocket("ws://localhost:8080/");
//     binanceSocket.onopen = () => {
//       console.log("Stream open.");
//       binanceSocket.send("Hi back!");
//     };
//     binanceSocket.onmessage = (event) => {
//       setCoins(JSON.parse(event.data));
//     };
//     binanceSocket.onclose = () => {
//       console.log("Closed");
//     };

//     return () => {
//       binanceSocket.close();
//     };
//   }, []);

//   const list = coins.map((coin) => (
//     <div>
//       {coin.s} : {coin.p}, {coin.P}
//     </div>
//   ));
//   const data = [];
//   for (let i = 0; i < 46; i++) {
//     data.push({
//       key: i,
//       name: `Edward King ${i}`,
//       change: 32,
//       percentage: `London, Park Lane no. ${i}`,
//     });
//   }

//   return (
//     <div>
//       <div>Websocket Page</div>
//       <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
//       {/* <div>{coins.length}</div>
//       <div>{list}</div> */}
//     </div>
//   );
// };

// export default requireAuth(Websocket);
import React, { useState, useEffect } from "react";
import requireAuth from "../../components/requireAuth";
import { Table } from "antd";

const Websocket = () => {
  const [coins, setCoins] = useState([]);

  const columns = [
    {
      title: "Pair",
      dataIndex: "pair",
      filters: [
        {
          text: "BTC",
          value: "btc",
        },
        {
          text: "USDT",
          value: "usdt",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.pair.indexOf(value) === 0,
      sorter: (a, b) => a.pair.length - b.pair.length,
      sortDirections: ["descend"],
    },
    {
      title: "Change",
      dataIndex: "change",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.change - b.change,
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.percentage.indexOf(value) === 0,
      sorter: (a, b) => a.percentage.length - b.percentage.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     pair: "John Brown",
  //     change: 32,
  //     percentage: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     pair: "Jim Green",
  //     change: 42,
  //     percentage: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     pair: "Joe Black",
  //     change: 32,
  //     percentage: "Sidney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     pair: "Jim Red",
  //     change: 32,
  //     percentage: "London No. 2 Lake Park",
  //   },
  // ];

  const list = coins.map((coin) => {
    return {
      key: `${coin.s}`,
      pair: `${coin.s}`,
      change: `${coin.p}`,
      percentage: `${coin.P}`,
    };
  });

  useEffect(() => {
    const binanceSocket = new WebSocket("ws://localhost:8080/");
    binanceSocket.onopen = () => {
      console.log("Stream open.");
      binanceSocket.send("Hi back!");
    };
    binanceSocket.onmessage = (event) => {
      setCoins(JSON.parse(event.data));
    };
    binanceSocket.onclose = () => {
      console.log("Closed");
    };

    return () => {
      binanceSocket.close();
    };
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return <Table columns={columns} dataSource={list} onChange={onChange} />;
};

export default requireAuth(Websocket);
