import React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    onSelect = (value) => {
        console.log('onSelect', value);
        this.props.loadPlayerInfo(value);
    }

    handleSearch = (value) => {
        const players = nba.searchPlayers(value);
        console.log(players);

        this.setState({
            dataSource: players.map(({playerId, fullName}) => (
                <Option key={playerId} value={fullName}>
                    <img
                        className="player-option-image"
                        src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                        alt={`${fullName}`}
                    />
                    <span className="player-option-label">{fullName}</span>
                </Option>
            )),
        });
    }

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className="search-bar"
                size="large"
                dataSource={dataSource}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA Player"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" />} />
            </AutoComplete>
        );
    }
}