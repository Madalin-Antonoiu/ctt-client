import React from "react"
import { Table, Tag, Divider, Popover, Timeline, Empty } from "antd";
import { InlineIcon } from '@iconify/react';
import bxGitCompare from '@iconify-icons/bx/bx-git-compare';
import { ClockCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';


const TrackTable = ({ dataSource, tagColor, footer, selectedMinute, popoverTitle }) => {
    const comparedToTime = dataSource[0].vs;
    const localeTimeString = dataSource[0].vs?.split(", ").slice(1)[0];

    const d = new Date(comparedToTime);
    var v = new Date();
    v.setMinutes(d.getMinutes() + Number(selectedMinute) + 1);

    //let storageTime = comparedToTime.split(", ").slice(1); // get only hh:mm

    const reusableTitle = () => {
        return <>
            <b>+%</b>
            <span style={{ position: "absolute", top: "-4px", right: 0 }}>
                <Popover placement="right"
                    title={popoverTitle}
                    content={
                        <Timeline mode="left" style={{ marginRight: "6rem", marginTop: "2rem" }}>
                            <Timeline.Item label={localeTimeString} color="green" >Saved prices of all cryptocurrencies.</Timeline.Item>
                            <Timeline.Item label="Every second" dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>Receive new price data.</Timeline.Item>
                            <Timeline.Item label="Every second" dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />} >Calculate the % difference between the two and display top five.</Timeline.Item>
                            <Timeline.Item label={v.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}>Repeat the cycle.</Timeline.Item>
                        </Timeline>
                    }
                    trigger="click">
                    <QuestionCircleOutlined style={{ color: "#e5e8e7" }} />
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
        <Divider plain>
            <Tag color={tagColor}>
                <InlineIcon icon={bxGitCompare} />
                {localeTimeString}
            </Tag>
        </Divider>

        {comparedToTime ?

            <Table className="my-table" columns={columns} dataSource={dataSource} size="small" pagination={false} footer={() => footer} />

            :

            <Empty description={"Not enough data."} />

        }

    </>
}

export default TrackTable;