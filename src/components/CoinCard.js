
import React from "react"
import { Card, Tag } from "antd";

const CoinCard = ({ shortname, name, coins }) => {

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
    const coindata = trackOneCoin(shortname.toUpperCase() + "USDT")[0]; // btc -> BTC + USDT = BTCUSDT
    const icon = require(`cryptocurrency-icons/svg/color/${shortname}.svg`).default;  // dinamically import the cryptoicon

    return <Card bordered className="my-card">

        <img src={icon} alt={name} className="my-svg" />
        <btc />
        <div style={{ textAlign: "center" }}>
            <div className="my-coin "> {name} </div>
            <div>
                <b> ${parseFloat(coindata.price)}</b>
                <div>
                    {
                        coindata._24HoursChange > 0 ?
                            <Tag color={"green"}>{coindata._24HoursChange}%</Tag>
                            :
                            <Tag color={"red"}>{coindata._24HoursChange}%</Tag>
                    }
                </div>
            </div>
        </div>
    </Card>
}

export default CoinCard;