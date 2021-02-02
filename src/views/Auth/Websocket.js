import React, { useState, useEffect } from "react";
import requireAuth from "../../components/requireAuth";
import { Card, Col, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Websocket = () => {
  const [coins, setCoins] = useState([]);

  function numberWithCommas(x) {
    return parseInt(x)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const list = coins.map((coin) => {
    return (
      <Col span={4}>
        <Card
          size="small"
          title={`${coin.s} - ${parseFloat(coin.c).toFixed(4)}`}
          bordered={true}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <div> {parseFloat(coin.P).toFixed(2)}%</div>

          <div> Vol {numberWithCommas(coin.q)}$</div>
        </Card>
      </Col>
    );
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

  return (
    <div className="site-card-wrapper">
      <Row gutter={36}>{list}</Row>
    </div>
  );
};

export default requireAuth(Websocket);
