import React from "react";

const Uptrend = (coins) => {

    const constructList = (selectedMinute) => {

        const P = (obj, time) => obj[time]?.percentageDiff ? Number(obj[time]?.percentageDiff) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
        const coin = (each) => {
            const coin = each.coin?.replace("USDT", "");
            const link = `https://www.binance.com/en/trade/${coin}_USDT?layout=pro`
            return <a href={link} target="_blank" rel="noreferrer" style={{ color: "#39CCCC" }}>{coin}</a>
        }
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



}

export default Uptrend;