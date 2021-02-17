import React, { useState, useEffect } from "react";
import requireAuth from "../../components/requireAuth";
import { Skeleton, Spin, Row, Col, Alert, Empty, Card, Tag } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import TrackTable from "../../components/TrackTable"
import EditableTable from "../../components/EditableTable"
import Uptrend from "../../components/Uptrend"

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
  const negativeConstructList = (selectedMinute) => {
    const percentageFor = "_" + selectedMinute;

    return coins
      .sort((a, b) => a[selectedMinute]?.percentageDiff - b[selectedMinute]?.percentageDiff) // this is correct, vs sorting in the antd way
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
  const trackOneCoin = (name) => {

    return coins
      .filter((each) => each.coin === name)
      .map((each) => {
        return {
          key: each?.coin,
          price: each["0m"]?.priceNow,
          _24HoursChange: parseFloat(each["_24Hours"].percentageChange).toFixed(2)
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
  const lastSixtyMinutesList = constructList("60m");
  const twoHAgoList = constructList("120m");

  const negativeCurrentMinuteList = negativeConstructList("0m");

  const bitcoin = trackOneCoin("BTCUSDT")[0];
  const ethereum = trackOneCoin("ETHUSDT")[0];
  const polkadot = trackOneCoin("DOTUSDT")[0];

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


      <Row gutter={20} >
        <Col xs={24} sm={24} md={13} lg={13} xl={13} >
          <EditableTable coins={coins} />
        </Col>

        <Col name="btc" style={{ marginBlock: "2rem" }} offset={5}>
          <Card bordered className="my-card">
            <svg className="my-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#F7931A" /><path fill="#FFF" fill-rule="nonzero" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" /></g></svg>
            <div style={{ textAlign: "center" }}>
              <div className="my-coin "> Bitcoin </div>
              <div>
                <b> ${parseFloat(bitcoin.price)}</b>
                <div>
                  {
                    bitcoin._24HoursChange > 0 ?
                      <Tag color={"green"}>{bitcoin._24HoursChange}%</Tag>
                      :
                      <Tag color={"red"}>{bitcoin._24HoursChange}%</Tag>
                  }
                </div>
              </div>
            </div>
          </Card>

        </Col>
        <Col name="eth" style={{ marginBlock: "2rem" }} >
          <Card className="my-card">
            <svg className="my-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#627EEA" /><g fill="#FFF" fill-rule="nonzero"><path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z" /><path d="M16.498 4L9 16.22l7.498-3.35z" /><path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z" /><path d="M16.498 27.995v-6.028L9 17.616z" /><path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" /><path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z" /></g></g></svg>
            <div style={{ textAlign: "center" }}>
              <div className="my-coin eth">Ethereum </div>
              <div> <b>${parseFloat(ethereum.price)}</b></div>
              <div>
                {
                  ethereum._24HoursChange > 0 ?
                    <Tag color={"green"}>{ethereum._24HoursChange}%</Tag>
                    :
                    <Tag color={"red"}>{ethereum._24HoursChange}%</Tag>
                }




              </div>
            </div>
          </Card>

        </Col>
        <Col name="dot" style={{ marginBlock: "2rem" }}>

          <Card className="my-card">
            <svg className="my-svg" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="none"><circle fill="#E6007A" cx="16" cy="16" r="16" /><path d="M16.272 6.625c-3.707 0-6.736 3.012-6.736 6.736 0 .749.124 1.48.356 2.192a.95.95 0 001.194.589.95.95 0 00.588-1.194 4.745 4.745 0 01-.267-1.73c.071-2.512 2.103-4.58 4.616-4.704a4.86 4.86 0 015.115 4.847 4.862 4.862 0 01-4.58 4.848s-.945.053-1.408.125c-.232.035-.41.071-.535.089-.054.018-.107-.036-.09-.09l.161-.783.873-4.028a.934.934 0 00-.712-1.105.934.934 0 00-1.105.713s-2.103 9.802-2.121 9.909a.934.934 0 00.713 1.105.934.934 0 001.105-.713c.017-.107.303-1.408.303-1.408a2.367 2.367 0 011.996-1.854 21.43 21.43 0 011.051-.089 6.744 6.744 0 006.22-6.719c0-3.724-3.03-6.736-6.737-6.736zm.481 15.505a1.122 1.122 0 00-1.336.873c-.125.606.25 1.212.873 1.337a1.122 1.122 0 001.337-.874c.124-.623-.25-1.212-.874-1.336z" fill="#FFF" /></g></svg>
            <div style={{ textAlign: "center" }}>
              <div className="my-coin dot">Polkadot</div>
              <div>
                <b>${parseFloat(polkadot.price)}</b>
                <div>

                  {
                    polkadot._24HoursChange > 0 ?
                      <Tag color={"green"}>{polkadot._24HoursChange}%</Tag>
                      :
                      <Tag color={"red"}>{polkadot._24HoursChange}%</Tag>
                  }


                </div>
              </div>

            </div>
          </Card>

        </Col>

      </Row>

      <Uptrend coins={coins} />


      <Row gutter={20} >
        <Col xs={24} sm={24} md={13} lg={13} xl={13} >
          <Skeleton />
        </Col>

        <Col style={{ marginBlock: "2rem" }} offset={5} name="0m-ago">
          <TrackTable
            dataSource={currentMinuteList}
            selectedMinute="0"
            popoverTitle="Top Performance This Minute "
          />

        </Col>

        <Col style={{ marginBlock: "2rem" }} name="negative-0m-ago">
          <TrackTable
            dataSource={negativeCurrentMinuteList}
            selectedMinute="0"
            popoverTitle="Top Performance This Minute "
          />
        </Col>

      </Row>
      {/* {console.log(coins)} */}
      {/* Negative */}
      <Row gutter={25} className="my-row">

        <Col xs={10} sm={8} md={6} lg={4} xl={3} name="1m-ago">

          <TrackTable
            dataSource={lastMinuteList}
            selectedMinute="1"
            popoverTitle="Top Performance vs. Last Minute "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} offset={5} name="3m-ago">

          <TrackTable
            dataSource={lastThreeMinutesList}
            selectedMinute="3"
            popoverTitle="Top Performance vs 3Min Ago "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} name="5m-ago">

          <TrackTable
            dataSource={lastFiveMinutesList}
            selectedMinute="5"
            popoverTitle="Top Performance vs. 5Min Ago "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} name="15m-ago">

          <TrackTable
            dataSource={lastFifteenMinutesList}
            selectedMinute="15"
            popoverTitle="Top Performance vs 15Min Ago "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} name="30m-ago">

          <TrackTable
            dataSource={lastThirtyMinutesList}
            selectedMinute="30"
            popoverTitle="Top Performance vs 30Min Ago "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} name="60m-ago">

          <TrackTable
            dataSource={lastSixtyMinutesList}
            selectedMinute="60"
            popoverTitle="Top Performance vs 60Min Ago "
          />

        </Col>
        <Col xs={8} sm={6} md={6} lg={4} xl={3} name="120m-ago">

          <TrackTable
            dataSource={twoHAgoList}
            selectedMinute="120"
            popoverTitle="Top Performance vs 2h Ago "
          />

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

  </div >



};

export default requireAuth(Websocket);


