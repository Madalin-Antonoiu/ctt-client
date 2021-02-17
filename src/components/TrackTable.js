import React from "react"
import { Table, Tag, Popover, Timeline, Empty } from "antd";
// import { InlineIcon } from '@iconify/react';
// import bxGitCompare from '@iconify-icons/bx/bx-git-compare';
import { ClockCircleOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import "./TrackTable.css"
import moment from "moment";


const TrackTable = ({ dataSource, selectedMinute, popoverTitle }) => {
    const comparedToTime = dataSource[0].vs
    //console.log(comparedToTime);
    const localeTimeString = new Date(dataSource[0].vs).toLocaleTimeString().replace(":00", "")

    const d = new Date(comparedToTime);
    var v = new Date();
    v.setMinutes(d.getMinutes() + Number(selectedMinute) + 1);

    const updatedFooter = () => {
        return <div style={{ textAlign: "center" }}>

            <Tag color="default">
                {dataSource[0].vs ? moment(dataSource[0].vs).fromNow() : "Not enough data"}
            </Tag>
        </div>

    }

    //let storageTime = comparedToTime.split(", ").slice(1); // get only hh:mm
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

    const reusableTitle = () => {

        return <>
            <b>%</b>
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
            title: 'Coin',
            dataIndex: 'coin',
        },
        {
            title: reusableTitle(),
            dataIndex: `_${selectedMinute}m`,
        },

    ];

    return <>

        {comparedToTime ?

            <Table className="my-table" columns={columns} dataSource={dataSource} size="small" pagination={false} footer={() => updatedFooter()} />

            :

            <Empty description={"Not enough data."} />

        }

    </>
}

export default TrackTable;