import React from "react";
import { Skeleton, Table, Empty } from "antd";

const Uptrend = ({ coins }) => {


    const columns = [
        {
            title: 'Coin',
            dataIndex: 'coin',
        },
        {
            title: "Uptrend",
            dataIndex: "uptrendScore",
        },

    ];
    const uptrendFiveAgo = (zero, one, three, five) => {
        const percentage0 = "_" + zero; // now vs begining of this minute
        const percentage1 = "_" + one;// now vs last minute minute...( now means price updates every second and compares to the snapshot)
        const percentage3 = "_" + three;
        const percentage5 = "_" + five;

        const P = (obj, time) => obj[time]?.percentageDiff ? Number(obj[time]?.percentageDiff) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
        const p = (obj, time) => obj[time]?.priceBackThen ? Number(obj[time]?.priceBackThen) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
        const priceNow = (obj, time) => obj[time]?.priceNow ? Number(obj[time]?.priceNow) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"

        const enhancedPercentageDiff = (a, b) => {
            if (a > b) {
                return Number((100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2));
            } else {
                return -(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
            }

        }

        const coin = (each) => {
            const coin = each.coin?.replace("USDT", "");
            const link = `https://www.binance.com/en/trade/${coin}_USDT?layout=pro`
            return <a href={link} target="_blank" rel="noreferrer" style={{ color: "#39CCCC" }}>{coin}</a>
        }


        // console.log(coins);

        return coins
            //.filter((each) => each[zero]?.percentageDiff && each[zero]?.percentageDiff >= 0 && each[one]?.percentageDiff >= 0 && each[three]?.percentageDiff >= 0 && each[five]?.percentageDiff >= 0) // every one should be positive, now vs 1 min, 2, 3, 5 min ago
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

                //percentages
                const nowVsStartofMinute = P(each, zero);
                const startOfMinuteVsOneMinAgo = P(each, one);
                const oneMinAgoVsThreeMinAgo = P(each, three);
                const threeMinAgoVsFiveMinAgo = P(each, five);



                const dolarGainNowVs0m = enhancedPercentageDiff(priceNow(each, zero), p(each, zero));
                const dolarGain0mVs1m = enhancedPercentageDiff(p(each, zero), p(each, one))
                const dolarGain1mVs3m = enhancedPercentageDiff(p(each, one), p(each, three));
                const dolarGain3mVs5m = enhancedPercentageDiff(p(each, three), p(each, five));

                const scoreTotal = dolarGainNowVs0m + dolarGain0mVs1m + dolarGain1mVs3m + dolarGain3mVs5m;

                return {
                    key: each?.coin,
                    coin: coin(each),
                    [percentage0]: {
                        nowVsThenP: nowVsStartofMinute,
                        priceBackThen: each[zero]?.priceBackThen,
                        nowVs0m: dolarGainNowVs0m
                    },
                    [percentage1]: {
                        nowVsThenP: startOfMinuteVsOneMinAgo,
                        priceBackThen: each[one]?.priceBackThen,
                        _0mVs1m: dolarGain0mVs1m
                    },
                    [percentage3]: {
                        nowVsThenP: oneMinAgoVsThreeMinAgo,
                        priceBackThen: each[three]?.priceBackThen,
                        _1mVs3m: dolarGain1mVs3m
                    },
                    [percentage5]: {
                        nowVsThenP: threeMinAgoVsFiveMinAgo,
                        priceBackThen: each[five]?.priceBackThen,
                        _3mVs5m: dolarGain3mVs5m
                    },
                    percentageScore: scoreTotal

                }
            })


    }
    const uptrendFive = uptrendFiveAgo("0m", "1m", "3m", "5m");
    // const uptrendThree = uptrendFiveAgo("0m", "1m", "3m");
    console.log(uptrendFive);


    const biggestScore = uptrendFive
        .filter((each) => each["_0m"]?.nowVs0m && each["_0m"]?.nowVs0m >= 0 && each["_1m"]?._0mVs1m >= 0 && each["_3m"]?._1mVs3m >= 0 && each["_5m"]?._3mVs5m >= 0) // every one should be positive, now vs 1 min, 2, 3, 5 min ago
        .sort((a, b) => b.percentageScore - a.percentageScore)
        //.slice(0, 30) //top 30
        .map((each) => {

            return {
                coin: each.coin,
                uptrendScore: parseFloat(each.percentageScore).toFixed(2) + "⬆"
            }
        })

    // console.log(biggestScore)


    return <>

        {biggestScore ?

            <Table className="my-table" columns={columns} dataSource={biggestScore} size="small" pagination={false} />

            :

            <Empty description={"Not enough data."} />

        }
    </>

}

export default Uptrend;