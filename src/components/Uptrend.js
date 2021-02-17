import React from "react";
import { Skeleton, Table, Empty } from "antd";

const Uptrend = ({ coins }) => {

    const uptrendFiveAgo = (_0mAgo, _1mAgo, _3mAgo, _5mAgo) => {

        const P = (obj, time) => obj[time]?.percentageDiff ? Number(obj[time]?.percentageDiff) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
        const p = (obj, time) => obj[time]?.priceBackThen ? Number(obj[time]?.priceBackThen) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
        const priceNow = (obj, time) => obj[time]?.priceNow ? Number(obj[time]?.priceNow) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"

        const percentageDiff = (a, b) => {
            return (100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)

        }

        const coin = (each) => {
            const coin = each.coin?.replace("USDT", "");
            const link = `https://www.binance.com/en/trade/${coin}_USDT?layout=pro`
            return <a href={link} target="_blank" rel="noreferrer" style={{ color: "#39CCCC" }}>{coin}</a>
        }
        const percentage0 = "_" + _0mAgo; // now vs begining of this minute
        const percentage1 = "_" + _1mAgo;// now vs last minute minute...( now means price updates every second and compares to the snapshot)
        const percentage3 = "_" + _3mAgo;
        const percentage5 = "_" + _5mAgo;

        // console.log(coins);

        return coins
            .filter((each) => each[_0mAgo]?.percentageDiff && each[_0mAgo]?.percentageDiff >= 0 && each[_1mAgo]?.percentageDiff >= 0 && each[_3mAgo]?.percentageDiff >= 0 && each[_5mAgo]?.percentageDiff >= 0) // every one should be positive, now vs 1 min, 2, 3, 5 min ago
            .filter((each) => !each.coin?.endsWith("DOWNUSDT"))
            .filter((each) => !each.coin?.endsWith("UPUSDT"))
            .filter((each) => !each.coin?.endsWith("BULLSDT"))
            .filter((each) => !each.coin?.endsWith("BEARUSDT"))
            .map((each) => {

                // Percentage differences
                // i need now vs start of the minute
                // start of the minute vs 1 min ago
                // 1 min ago vs 3 min ago
                // 3 min ago vs 5 min ago


                const nowVsStartofMinute = P(each, _0mAgo);
                const startOfMinuteVsOneMinAgo = P(each, _1mAgo);
                const oneMinAgoVsThreeMinAgo = P(each, _3mAgo);
                const threeMinAgoVsFiveMinAgo = P(each, _5mAgo);



                const dolarGainNowVs0m = percentageDiff(priceNow(each, _0mAgo), p(each, _0mAgo));
                const dolarGain0mVs1m = percentageDiff(p(each, _0mAgo), p(each, _1mAgo))
                const dolarGain1mVs3m = percentageDiff(p(each, _1mAgo), p(each, _3mAgo));
                const dolarGain3mVs5m = percentageDiff(p(each, _3mAgo), p(each, _5mAgo));

                const scoreTotal = parseFloat(nowVsStartofMinute + startOfMinuteVsOneMinAgo + oneMinAgoVsThreeMinAgo + threeMinAgoVsFiveMinAgo).toFixed(2);

                return {
                    key: each?.coin,
                    coin: coin(each),
                    [percentage0]: {
                        nowVsThenP: nowVsStartofMinute,
                        priceBackThen: each[_0mAgo].priceBackThen,
                        nowVs0m: dolarGainNowVs0m
                    },
                    [percentage1]: {
                        nowVsThenP: startOfMinuteVsOneMinAgo,
                        priceBackThen: each[_1mAgo].priceBackThen,
                        _0mVs1m: dolarGain0mVs1m
                    },
                    [percentage3]: {
                        nowVsThenP: oneMinAgoVsThreeMinAgo,
                        priceBackThen: each[_3mAgo].priceBackThen,
                        _1mVs3m: dolarGain1mVs3m
                    },
                    [percentage5]: {
                        nowVsThenP: threeMinAgoVsFiveMinAgo,
                        priceBackThen: each[_5mAgo].priceBackThen,
                        _3mVs5m: dolarGain3mVs5m
                    },
                    percentageScore: scoreTotal

                }
            })


    }


    const columns = [
        {
            title: 'Coin',
            dataIndex: 'coin',
        },
        {
            title: "Uptrend",
            dataIndex: "uptrend",
        },

    ];
    const uptrendFive = uptrendFiveAgo("0m", "1m", "3m", "5m");
    console.log(uptrendFive);

    const biggestScore = uptrendFive
        .sort((a, b) => b.percentageScore - a.percentageScore)
        //.slice(0, 30) //top 30
        .map((each) => {
            return {
                coin: each.coin,
                uptrendScore: each.percentageScore
            }
        })

    //console.log(biggestScore)


    return <>

        {biggestScore ?

            <Table className="my-table" columns={columns} dataSource={biggestScore} size="small" pagination={false} />

            :

            <Empty description={"Not enough data."} />

        }
    </>

}

export default Uptrend;