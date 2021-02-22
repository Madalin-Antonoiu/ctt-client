import React, { useState, useEffect } from "react";
import requireAuth from "../../components/requireAuth";
import { Skeleton, Spin, Row, Col, Alert, Empty } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import TrackTable from "../../components/TrackTable"
import EditableTable from "../../components/EditableTable"
import Uptrend from "../../components/Uptrend"
import CoinCard from "../../components/CoinCard" // love this one!


const Websocket = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState("");


  const pageLoadingIcon = <LoadingOutlined style={{ fontSize: 74 }} spin />;


  useEffect(() => {
    const binanceSocket = new WebSocket("ws://localhost:8080/");
    binanceSocket.onopen = () => {
      console.log("Stream open.");
      binanceSocket.send("Hi back!");
    };
    binanceSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data) {
        setCoins(data)
      };

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



  return (
    <>
      <err>
        {error
          ?
          <Row type="flex" justify="center" align="middle" style={{ minHeight: 'calc(100vh - 300px)' }}>
            <Alert
              message="WebSocket Error"
              description="Could not connect to the WebSocket server."
              type="error"
              closable
            />
          </Row>
          :
          ""
        }
      </err>
      <main>
        {coins.length
          ?
          <true>
            <Row gutter={20} >
              <Col xs={24} sm={24} md={13} lg={13} xl={13} >
                <EditableTable coins={coins} />
              </Col>

              <Col style={{ marginBlock: "2rem" }} offset={3}>
                <CoinCard shortname="btc" name="Bitcoin" coins={coins} />
              </Col>
              <Col style={{ marginBlock: "2rem" }} >
                <CoinCard shortname="eth" name="Ethereum" coins={coins} />
              </Col>
              <Col style={{ marginBlock: "2rem" }}>
                <CoinCard shortname="bnb" name="Binance" coins={coins} />
              </Col>
              <Col style={{ marginBlock: "2rem" }}>
                <CoinCard shortname="dot" name="Polkadot" coins={coins} />
              </Col>


            </Row>
            <Row gutter={20} name="going-up-now-0-2m-ago">
              <Col xs={24} sm={24} md={13} lg={13} xl={13} >
                <Skeleton />
              </Col>
              <Col style={{ marginBlock: "2rem" }} offset={5} name="0m-ago">
                <TrackTable
                  coins={coins}
                  selectedMinute="0"
                  popoverTitle="Top Performance This Minute "
                />

              </Col>
              <Col style={{ marginBlock: "2rem" }} name="negative-0m-ago">
                <TrackTable
                  coins={coins}
                  selectedMinute="0"
                  popoverTitle="Top Performance This Minute "
                  negative={true}
                />

              </Col>
            </Row>
            <Row name="trend">
              <Col xs={24} sm={24} md={13} lg={13} xl={13} >
                <Skeleton />
              </Col>
              <Col style={{ marginBlock: "1rem" }} offset={5} name="uptrend">
                <Uptrend coins={coins} selection="3" />
              </Col>
              <Col style={{ marginBlock: "1rem" }} name="uptrend">
                <Uptrend coins={coins} selection="5" />
              </Col>
              <br />
            </Row>
            <Row gutter={25} className="my-row">

              <Col xs={8} sm={6} md={6} lg={4} xl={3} name="30m-ago">

                <TrackTable
                  coins={coins}
                  selectedMinute="30"
                  popoverTitle="Top Performance vs 30Min Ago "
                />

              </Col>
              <Col xs={8} sm={6} md={6} lg={4} xl={3} name="60m-ago">

                <TrackTable
                  coins={coins}
                  selectedMinute="60"
                  popoverTitle="Top Performance vs 60Min Ago "
                />

              </Col>
              <Col xs={8} sm={6} md={6} lg={4} xl={3} name="120m-ago">

                <TrackTable
                  coins={coins}
                  selectedMinute="120"
                  popoverTitle="Top Performance vs 2h Ago "
                />

              </Col>
            </Row>
          </true>
          :
          <false>
            {!error
              ?
              <Row type="flex" justify="center" align="middle" style={{ minHeight: 'calc(100vh - 200px)' }}>    {/* If no error and still no data, show spinner..      */}
                <Spin indicator={pageLoadingIcon} />
              </Row>
              :
              <Empty />
            }
          </false>
        }
      </main>
    </>
  )


};

export default requireAuth(Websocket);


