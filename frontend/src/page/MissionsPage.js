import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {browserHistory} from 'react-router';
import GoogleMap from 'google-map-react';
import eventProxy from '../service/event';
import missions from '../service/missions';
const K_WIDTH = 20;
const K_HEIGHT = 20;

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '375px',
    height: '100%',
    overflowY: 'auto',
  },
};

export default class MissionsPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        eventProxy.emit('change header', {
            color: '#333',
            title: '任务列表'
        });
    }
    render() {
        return (
            <div>
                <Subheader>10月</Subheader>
                <GridList
                cellHeight={180}
                cols={1}
                style={styles.gridList}
                padding={0}
                >
                {missions.map((tile, index) => (
                    <GridTile
                    key={tile.img}
                    title={tile.title}
                    subtitle={<span>{tile.author}</span>}
                    onClick={_ => browserHistory.push('/missionDetail/' + index)}
                    >
                    <img src={tile.img} />
                    </GridTile>
                ))}
                </GridList>
            </div>
        )
    }
}