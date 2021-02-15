import React, { useState } from 'react';
import { AutoComplete } from 'antd';


const MyAutoComplete = ({ data, onChangeLetParentKnow }) => {
    //console.log(onChangeLetParentKnow)

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

    const myFilter = (str, list) => list.filter((each) => each.value?.startsWith(str.toUpperCase())) // startsWith entered key, or endsWith, or includesit etc
    const onSearch = (searchText) => {
        setOptions(
            !searchText ? [] : myFilter(searchText, list),
        );
    };

    const onSelect = (data) => {
        console.log('onSelect', data);
        onChangeLetParentKnow(data);
        setValue("");
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
                    width: 109,
                    height: 20,
                    padding: 0
                }}
                onSelect={onSelect}
                onSearch={onSearch}
                onChange={onChange}
                placeholder="Search here.."
            />
        </>
    );
};

export default MyAutoComplete