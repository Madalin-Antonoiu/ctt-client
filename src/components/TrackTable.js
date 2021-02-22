import React from "react"
import { Table, Tag, Popover, Timeline, Empty, Skeleton } from "antd";
// import { InlineIcon } from '@iconify/react';
// import bxGitCompare from '@iconify-icons/bx/bx-git-compare';
import { ClockCircleOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import "./TrackTable.css"
import moment from "moment";


const TrackTable = ({ coins, selectedMinute, popoverTitle, negative = false }) => {
    // Important stuff


    var dataSource = null;
    const P = (obj, time) => obj[time]?.percentageDiff ? Number(obj[time]?.percentageDiff) : <Skeleton.Avatar active={false} size={"small"} shape={"circle"} />// + "%"
    const coin = (each) => {
        const coin = each.coin?.replace("USDT", "");
        const link = `https://www.binance.com/en/trade/${coin}_USDT?layout=pro`
        return <a href={link} target="_blank" rel="noreferrer" style={{ color: "#39CCCC" }}>{coin}</a>
    }
    const coinAndScore = (each, selectedMinute) => {
        const coin = each.coin?.replace("USDT", "");
        const link = `https://www.binance.com/en/trade/${coin}_USDT?layout=pro`
        return <> <a href={link} target="_blank" rel="noreferrer" style={{ color: "#39CCCC" }}>{coin}</a> <span style={{ float: "right" }}>{P(each, selectedMinute)} </span> </>
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
                    coinAndScore: coinAndScore(each, selectedMinute),
                    vs: each[selectedMinute]?.timeBackThen
                    // key: each?.coin,
                    // // coin: C(each, selectedMinute),
                    // coin: coin(each),
                    // [percentageFor]: P(each, selectedMinute),

                    // // price: p(each),
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
                    coinAndScore: coinAndScore(each, selectedMinute),
                    vs: each[selectedMinute]?.timeBackThen

                }
            }
            );
    }

    const source = selectedMinute + "m"

    if (negative === false) {
        dataSource = constructList(source);
        console.log(dataSource)
    } else {
        dataSource = negativeConstructList(source);
    }


    //Time stuff
    const comparedToTime = dataSource[0].vs
    const localeTimeString = new Date(dataSource[0].vs).toLocaleTimeString().replace(":00", "")
    const d = new Date(comparedToTime);
    var v = new Date();
    v.setMinutes(d.getMinutes() + Number(selectedMinute) + 1);
    moment.updateLocale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: 'a few sec',
            ss: '%d sec',
            m: "1 min",
            mm: "%d min",
            h: "1 hour",
            hh: "%d hours",
            d: "1 day",
            dd: "%d days",
            w: "1 week",
            ww: "%d weeks",
            M: "1 month",
            MM: "%d months",
            y: "1 year",
            yy: "%d years"
        }
    });


    //Other
    const updatedFooter = () => {
        return <div style={{ textAlign: "center" }}>

            <Tag color="default">
                {dataSource[0].vs ? moment(dataSource[0].vs).fromNow() : "Not enough data"}
            </Tag>
        </div>

    }
    const reusableTitle = () => {

        return <>
            <b>{negative ? "Down %" : "Up %"}</b>
            <span style={{ position: "absolute", top: "2px", right: "2px" }}>
                <Popover placement="right"
                    title={popoverTitle}
                    content={
                        <Timeline mode="left" style={{ marginRight: "6rem", marginTop: "2rem" }}>
                            <Timeline.Item label={localeTimeString} color="green" >Saved prices of all cryptocurrencies.</Timeline.Item>
                            <Timeline.Item label={<Tag icon={<SyncOutlined spin />} color="processing">every second</Tag>} dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>Receive new price data.</Timeline.Item>
                            <Timeline.Item label={<Tag icon={<SyncOutlined spin />} color="processing">every second</Tag>} dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />} >Calculate the % difference between the two and display top five.</Timeline.Item>
                            <Timeline.Item label={v.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}>Repeat the cycle.</Timeline.Item>
                        </Timeline>
                    }
                    trigger="click">
                    <QuestionCircleOutlined style={{ color: "#40a9ff", opacity: "0.4" }} />
                </Popover>
            </span>
        </>
    }

    const columns = [
        {
            title: reusableTitle(),
            dataIndex: 'coinAndScore',
        },

    ];



    return <>

        <Table className="my-table" columns={columns} dataSource={dataSource} size="small" pagination={false} footer={() => updatedFooter()} />

        {/* {comparedToTime ?

            <Table className="my-table" columns={columns} dataSource={dataSource} size="small" pagination={false} footer={() => updatedFooter()} />


            :

            <Empty className="not-enough-data" description={"Not enough data."} />

        } */}

    </>

}

export default TrackTable;