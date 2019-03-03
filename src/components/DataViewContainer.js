import React from 'react';
import { ShotChart } from './ShotChart';
import {
    Row, Col, Radio, Switch
} from 'antd';
import { CountSlider } from './CountSlider';
import _ from 'lodash';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        displayToolTips: true,
        chartType: "hexbin"
    }

    onMinCountChange = (value) => {
        this.setState({
            minCount: value
        });
    }

    onDisplayToolTipsChange = (displayToolTips) => {
        this.setState({
            displayToolTips
        });
    }

    onChartTypeChange = (e) => {
        this.setState({
            chartType: e.target.value
        });
    }

    render() {
        const {
            minCount,
            displayToolTips,
            chartType
        } = this.state;

        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={minCount}
                    displayToolTips={displayToolTips}
                    chartType={chartType}
                />

                {
                    chartType === "hexbin" ? (
                        <Row>
                            <Col offset={4}>
                                <CountSlider
                                    value={minCount} onMinCountChange={_.debounce(this.onMinCountChange, 500)} />
                            </Col>
                        </Row>
                    ): null
                }

                <Row>
                    <Col span={9} offset={6}>
                        <RadioGroup value={chartType} onChange={this.onChartTypeChange} >
                            <Radio value="hexbin">Hexbin</Radio>
                            <Radio value="scatter">Scatter</Radio>
                        </RadioGroup>
                    </Col>
                    <Col span={3}>
                        <Switch
                            onChange={this.onDisplayToolTipsChange}
                            checkedChildren="On"
                            unCheckedChildren="Off"
                            defaultChecked
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}