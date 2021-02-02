import React, { useEffect, useState } from "react";
import requireAuth from "../../components/requireAuth";

const Websocket = () => {
  const [coins, setCoins] = useState([]);

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

  const list = coins.map((coin) => (
    <div>
      {coin.s} : {coin.p}, {coin.P}
    </div>
  ));

  return (
    <div>
      <div>Websocket Page</div>
      <div>{coins.length}</div>
      <div>{list}</div>
    </div>
  );
};

export default requireAuth(Websocket);
