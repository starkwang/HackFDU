import React from 'react';
import {AppBar} from 'material-ui';
import GoogleMap from 'google-map-react';
import eventProxy from '../service/event';
const K_WIDTH = 20;
const K_HEIGHT = 20;
export default class MissionsPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        eventProxy.emit('change header', {
            color: '#333',
            title: '任务列表'
        })
        navigator
            .geolocation
            .getCurrentPosition(result => {
                alert(result)
            })
    }
    render() {
        return (
            <div>
                Missions
            </div>
        )
    }
}