import React, { useState } from 'react';
import { AutoComplete } from 'antd';


const MyAutoComplete = ({ data }) => {

    const list = data
        .filter((each) => !each.coin?.endsWith("DOWNUSDT"))
        .filter((each) => !each.coin?.endsWith("UPUSDT"))
        .filter((each) => !each.coin?.endsWith("BULLUSDT"))
        .filter((each) => !each.coin?.endsWith("BEARUSDT"))
        .map((each) => {
            return {
                id: each.coin,
                value: each.coin
            }
        })

    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    const myFilter = (str, list) => list.filter((each) => each.value?.includes(str.toUpperCase()))
    const onSearch = (searchText) => {
        setOptions(
            !searchText ? [] : myFilter(searchText, list),
        );
    };

    const onSelect = (data) => {
        console.log('onSelect', data);
    };

    const onChange = (data) => {
        setValue(data);
    };

    return (
        <>

            <AutoComplete
                value={value}
                options={options}
                style={{
                    width: 200,
                }}
                onSelect={onSelect}
                onSearch={onSearch}
                onChange={onChange}
                placeholder="control mode"
            />
        </>
    );
};

export default MyAutoComplete