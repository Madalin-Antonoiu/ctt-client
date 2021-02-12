import React, { useState, useEffect } from "react";
import requireAuth from "../../components/requireAuth";
import { Skeleton, Spin, Space, Row, Col, Timeline } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import TrackTable from "../../components/TrackTable"

const Websocket = () => {
  const [coins, setCoins] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 74 }} spin />;
  // const columns = [
  //   {
  //     title: 'Coin',
  //     dataIndex: 'coin',
  //     sorter: (a, b) => a.coin?.localeCompare(b.coin), // alphabetical sort (antd)
  //     sortDirections: ['ascend', 'descend'],
  //     key: 1
  //   },
  //   {
  //     title: '0m',
  //     dataIndex: '_0m',
  //     defaultSortOrder: 'ascend',
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
  //   {
  //     title: 'Price',
  //     dataIndex: 'price',
  //     sortDirections: ['ascend', 'descend'],
  //     sorter: (a, b) => b.price - a.price,
  //     key: 10
  //   },

  // ];


  // function numberWithCommas(x) {
  //   return parseInt(x)
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }
  const P = (obj, time) => obj[time]?.percentageDiff ? Number(obj[time]?.percentageDiff) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
  //const p = (each) => each["0m"]?.priceNow ? parseFloat(each["0m"].priceNow) : <Tag color="grey">None</Tag>

  // const list = coins
  //   //.sort((a, b) => b["0m"]?.percentageDiff - a["0m"]?.percentageDiff) // b-a descending (bigger first)
  //   .filter((each) => !each.coin?.endsWith("DOWNUSDT"))
  //   .filter((each) => !each.coin?.endsWith("UPUSDT"))
  //   // .filter((each) => each["0m"].percentageDiff)
  //   .map((each) => {
  //     return {
  //       coin: each.coin?.replace("USDT", ""),
  //       _0m: P(each, "0m"),
  //       _1m: P(each, "1m"),
  //       _3m: P(each, "3m"),
  //       _5m: P(each, "5m"),
  //       _10m: P(each, "10m"),
  //       _15m: P(each, "15m"),
  //       _30m: P(each, "30m"),
  //       _60m: P(each, "60m"),
  //       price: p(each),
  //       key: each?.coin
  //     }
  //     // title={`${each.coin} : ${each.percentageDiff} (${each.comparedTo})`}
  //     //    <div> {parseFloat(each.priceNow)} vs {parseFloat(each.priceBackThen)}({each.timeBackThen})</div>

  //   }
  //   );

  // const shortCurrentTime = () => new Date().toLocaleTimeString([], { timeStyle: 'short' });


  const currentMinuteList = coins
    .sort((a, b) => b["0m"]?.percentageDiff - a["0m"]?.percentageDiff) // this is correct, vs sorting in the antd way
    .filter((each) => !each.coin?.endsWith("DOWNUSDT"))
    .filter((each) => !each.coin?.endsWith("UPUSDT"))
    .slice(0, 5)
    // .filter((each) => each["0m"].percentageDiff)
    .map((each) => {
      return {
        key: each?.coin,
        coin: each.coin?.replace("USDT", ""),
        _0m: P(each, "0m"),
        // price: p(each),
      }
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
    {coins.length ? <div>

      <Row>
        <Col xs={8} sm={6} md={6} lg={4} xl={3}>

          <TrackTable
            dataSource={currentMinuteList}
            footer={<sub>* compared to current minute start</sub>}
            tagColor="purple"
            time={coins[0]["0m"].timeBackThen}
            popoverTitle="Top Five Current Minute Performers"
            order="0"
          />

        </Col>
      </Row>

    </div>
      : <Row type="flex" justify="center" align="middle" style={{ minHeight: 'calc(100vh - 184px)' }}>
        <Space size="middle">
          <Spin indicator={antIcon} />
        </Space>
      </Row>

    }

  </div>



};

export default requireAuth(Websocket);
