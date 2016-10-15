import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {browserHistory} from 'react-router';
import GoogleMap from 'google-map-react';
import eventProxy from '../service/event';
import missions from '../service/missions';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


export default class MissionsPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        eventProxy.emit('change header', {
            color: '#333',
            title: '任务详情'
        });
    }
    render() {
        var id = this.props.params.id;
        return (
            <div>
                <Card>
                    <CardMedia
                    overlay={<CardTitle title={missions[id].imgInfo.name} subtitle={missions[id].imgInfo.address} />}
                    style={{height:375}}
                    >
                    <img style={{height: 375}} src={missions[id].img} />
                    </CardMedia>
                    <CardTitle title={missions[id].title}/>
                    <CardText style={{lineHeight: '24px', fontSize: '16px'}}>
                    {missions[id].author}
                    </CardText>
                    <CardActions style={{paddingBottom: 30,textAlign:'center'}}>
                    <RaisedButton label="接受任务" primary={true}  onClick={_ => browserHistory.push('/')}/>
                    <FlatButton label="取消" onClick={_ => browserHistory.push('/missions')}/>
                    </CardActions>
                </Card>
            </div>
        )
    }
}