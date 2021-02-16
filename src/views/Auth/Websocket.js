import React, { useState, useEffect } from "react";
import requireAuth from "../../components/requireAuth";
import { Skeleton, Spin, Row, Col, Alert, Empty, Card } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import TrackTable from "../../components/TrackTable"
import EditableTable from "../../components/EditableTable"


const Websocket = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState("");
  const antIcon = <LoadingOutlined style={{ fontSize: 74 }} spin />;

  // function numberWithCommas(x) {
  //   return parseInt(x)
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }
  const P = (obj, time) => obj[time]?.percentageDiff ? Number(obj[time]?.percentageDiff) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
  // const C = (obj, time) => obj[time]?.percentageDiff ? obj.coin?.replace("USDT", "") : <Skeleton.Avatar active={false} size={"small"} shape={"square"} />
  const coin = (each) => {
    const coin = each.coin?.replace("USDT", "");
    const link = `https://www.binance.com/en/trade/${coin}_USDT?layout=pro`
    return <a href={link} target="_blank" rel="noreferrer" style={{ color: "#39CCCC" }}>{coin}</a>
  }

  const constructList = (selectedMinute) => {
    const percentageFor = "_" + selectedMinute;

    return coins
      .sort((a, b) => b[selectedMinute]?.percentageDiff - a[selectedMinute]?.percentageDiff) // this is correct, vs sorting in the antd way
      .filter((each) => !each.coin?.endsWith("DOWNUSDT"))
      .filter((each) => !each.coin?.endsWith("UPUSDT"))
      .filter((each) => !each.coin?.endsWith("BULLSDT"))
      .filter((each) => !each.coin?.endsWith("BEARUSDT"))
      .slice(0, 5) // top 5
      .map((each) => {
        return {
          key: each?.coin,
          // coin: C(each, selectedMinute),
          coin: coin(each),
          [percentageFor]: P(each, selectedMinute),
          vs: each[selectedMinute]?.timeBackThen
          // price: p(each),
        }
      }
      );
  }


  const currentMinuteList = constructList("0m");
  const lastMinuteList = constructList("1m");
  const lastThreeMinutesList = constructList("3m");
  const lastFiveMinutesList = constructList("5m");
  const lastFifteenMinutesList = constructList("15m");
  const lastThirtyMinutesList = constructList("30m");

  useEffect(() => {
    const binanceSocket = new WebSocket("ws://localhost:8080/");
    binanceSocket.onopen = () => {
      console.log("Stream open.");
      binanceSocket.send("Hi back!");
    };
    binanceSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data) setCoins(data);

    };
    binanceSocket.onclose = () => {
      console.log("Closed");
    };
    binanceSocket.onerror = (err) => {
      setError(err);
    };

    return () => {
      binanceSocket.close();
    };
  }, []);


  return <div className="site-card-wrapper">
    {error ?

      <Row type="flex" justify="center" align="middle" style={{ minHeight: 'calc(100vh - 300px)' }}>
        <Alert
          message="WebSocket Error"
          description="Could not connect to the WebSocket server."
          type="error"
          closable
        />
      </Row>

      : ""
    }

    {coins.length ? <div>

      {/* {console.log(lastThreeMinutesList)} */}

      <Row gutter={25}>
        <Col xs={10} sm={8} md={6} lg={4} xl={3} name="0m-ago">

          <TrackTable
            dataSource={currentMinuteList}
            selectedMinute="0"
            footer={<sub>* compared to this min start </sub>}
            tagColor="red"
            popoverTitle="Top Performance This Minute "
          />

        </Col>
        <Col xs={10} sm={8} md={6} lg={4} xl={3} name="1m-ago">

          <TrackTable
            dataSource={lastMinuteList}
            selectedMinute="1"
            footer={<sub>* compared to 1m ago</sub>}
            tagColor="orange"
            popoverTitle="Top Performance vs. Last Minute "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} offset={5} name="3m-ago">

          <TrackTable
            dataSource={lastThreeMinutesList}
            selectedMinute="3"
            footer={<sub>* compared to 3m ago</sub>}
            tagColor="yellow"
            popoverTitle="Top Performance vs 3Min Ago "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} name="5m-ago">

          <TrackTable
            dataSource={lastFiveMinutesList}
            selectedMinute="5"
            footer={<sub>* compared to 5m ago</sub>}
            tagColor="skyblue"
            popoverTitle="Top Performance vs. 5Min Ago "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} name="15m-ago">

          <TrackTable
            dataSource={lastFifteenMinutesList}
            selectedMinute="15"
            footer={<sub>* compared to 15m ago</sub>}
            tagColor="limegreen"
            popoverTitle="Top Performance vs 15Min Ago "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} name="30m-ago">

          <TrackTable
            dataSource={lastThirtyMinutesList}
            selectedMinute="30"
            footer={<sub>* compared to 30m ago</sub>}
            tagColor="magenta"
            popoverTitle="Top Performance vs 30Min Ago "
          />

        </Col>

      </Row>

      <Row style={{ marginBlock: "2rem" }} gutter={20}>

        <Col xs={24} sm={24} md={13} lg={13} xl={13} name="0m-ago">
          <EditableTable coins={coins} />
        </Col>

        <Col xs={24} sm={24} md={10} lg={10} xl={10} name="0m-ago">
          <Card>Hi</Card>
        </Col>



      </Row>

    </div>
      : <div>

        {!error ?
          //If no error and still no data, show spinner..
          <Row type="flex" justify="center" align="middle" style={{ minHeight: 'calc(100vh - 200px)' }}>
            <Spin indicator={antIcon} />
          </Row>

          :

          <Empty />

        }

      </div>
    }

  </div>



};

export default requireAuth(Websocket);
