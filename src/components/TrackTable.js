import React from "react"
import { Table, Tag, Divider, Popover, Timeline } from "antd";
import { InlineIcon } from '@iconify/react';
import bxGitCompare from '@iconify-icons/bx/bx-git-compare';
import { ClockCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';


const TrackTable = ({ dataSource, tagColor, footer, selectedMinute, popoverTitle }) => {
    const comparedToTime = dataSource[0].vs;
    //let storageTime = comparedToTime.split(", ").slice(1); // get only hh:mm

    const reusableTitle = () => {
        return <>
            <b>+%</b>
            <span style={{ position: "absolute", top: "-4px", right: 0 }}>
                <Popover placement="right"
                    title={popoverTitle}
                    content={
                        <Timeline mode="left" style={{ marginRight: "6rem", marginTop: "2rem" }}>
                            <Timeline.Item label={comparedToTime} color="green" >Saved prices of all cryptocurrencies.</Timeline.Item>
                            <Timeline.Item label="Every second" dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>Receive new price data.</Timeline.Item>
                            <Timeline.Item label="Every second" dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />} >Calculate the % difference between the two and display top five.</Timeline.Item>
                            <Timeline.Item label={comparedToTime + (Number(selectedMinute) + 1)}>Repeat the cycle.</Timeline.Item>
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
                {comparedToTime}
            </Tag>
        </Divider>

        {comparedToTime ? <Table className="my-table" columns={columns} dataSource={dataSource} size="small" pagination={false} footer={() => footer} /> : "Loading..."}

    </>
}

export default TrackTable;