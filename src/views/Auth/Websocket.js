import React, { useState, useEffect } from "react";
import requireAuth from "../../components/requireAuth";
import { Skeleton, Spin, Row, Col, Alert, Empty, Divider, Tag } from "antd";
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
            <Row gutter={20} className="my-super-row">
              <Col xs={24} sm={24} md={13} lg={13} xl={13} name="left column">
                <EditableTable coins={coins} />
              </Col>

              <Col offset={2} name="right column ">

                <Row >
                  <Divider plain style={{ userSelect: "none" }}>
                    <Tag color={"#001f3f"}>
                      Main
                    </Tag>
                  </Divider>

                  <Row gutter={20} className="my-centered-row">
                    <Col >
                      <CoinCard shortname="btc" name="Bitcoin" coins={coins} />
                    </Col>
                    <Col  >
                      <CoinCard shortname="eth" name="Ethereum" coins={coins} />
                    </Col>
                    <Col >
                      <CoinCard shortname="bnb" name="Binance" coins={coins} />
                    </Col>
                    <Col >
                      <CoinCard shortname="dot" name="Polkadot" coins={coins} />
                    </Col>

                  </Row>

                </Row>

                <Row style={{ marginBlock: "1rem" }}>

                  <Divider plain style={{ userSelect: "none" }} >
                    <Tag color={"#001f3f"}>
                      Big Moves
                    </Tag>
                  </Divider>

                  <Row gutter={5} className="my-centered-row">
                    <Col name="0m-ago">
                      <TrackTable
                        coins={coins}
                        selectedMinute="0"
                        popoverTitle="Top Performance This Minute "
                      />
                    </Col>

                    <Col name="negative-0m-ago">
                      <TrackTable
                        coins={coins}
                        selectedMinute="0"
                        popoverTitle="Top Performance This Minute "
                        negative={true}
                      />
                    </Col>

                    {/* Some space between */}

                    <Col name="30m-ago" offset={2} >
                      <TrackTable
                        coins={coins}
                        selectedMinute="30"
                        popoverTitle="Top Performance vs 30Min Ago "
                      />
                    </Col>
                    <Col name="60m-ago">
                      <TrackTable
                        coins={coins}
                        selectedMinute="60"
                        popoverTitle="Top Performance vs 60Min Ago "
                      />
                    </Col>
                  </Row>
                </Row>

                <Row name="uptrend" style={{ marginBlock: "2rem" }}>

                  <Divider plain style={{ userSelect: "none" }} >
                    <Tag color={"#001f3f"}>
                      Uptrend
                    </Tag>
                  </Divider>


                  <Row className="my-centered-row">
                    <Col name="uptrend3">
                      <Uptrend coins={coins} selection="3" />
                    </Col>

                    <Col name="uptrend5">
                      <Uptrend coins={coins} selection="5" />
                    </Col>
                  </Row>


                </Row>

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


