import React from 'react';
import {AppBar} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import GoogleMap from 'google-map-react';
import eventProxy from '../service/event';
import api from '../service/api';
const K_WIDTH = 20;
const K_HEIGHT = 20;

import './IndexPage.css';

const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates it's on
    // you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};

function createMapOptions(maps) {
    // next props are exposed at maps "Animation", "ControlPosition",
    // "MapTypeControlStyle", "MapTypeId", "NavigationControlStyle",
    // "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem",
    // "DistanceMatrixStatus", "DistanceMatrixElementStatus", "ElevationStatus",
    // "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus", "MaxZoomStatus",
    // "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode",
    // "UnitSystem"
    return {
        zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_CENTER,
            style: maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_RIGHT
        },
        mapTypeControl: true
    };
}
export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: []
        };
    }
    componentWillMount() {
        eventProxy.emit('change header', {
            color: 'rgb(0, 188, 212)',
            title: '主页'
        })
    }
    componentDidMount(){
        // 拉取地点
        api.point.getAll().then(result => {
            this.setState({
                points: result.data.points
            })
        })

        //获取自身位置
        // navigator
        //     .geolocation
        //     .getCurrentPosition((result, err) => {
        //         if(err) {

        //         }
        //         console.log(result);
        //         this.setState(Object.assign(this.state, {
        //             myLocation: {
        //                 lat: result.coords.latitude,
        //                 lng: result.coords.longitude
        //             }
        //         }))
        //     })
        this.setState(Object.assign(this.state, {
            myLocation: {
                lat: 31.3015892,
                lng: 121.5011383
            }
        }))

        //上传图片
        var input = document.getElementById('img-input');
        input.addEventListener('change', function(){
            var file = this.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var base64 = this.result.split(',')[1];
                api.point.check({
                    lat: 31.3015892,
                    lng: 121.5011383,
                    base64: base64
                })
            }
        }, false);
    }
    checkImg(){
        var input = document.getElementById('img-input');
        input.click();
    }
    render() {
        return (
            <div style={{
                height: 500
            }}>
                <GoogleMap
                    apiKey='AIzaSyCidAWtTBVBBMfjVnW4Qce_qygOazWpLz0'
                    bootstrapURLKeys={{key: 'AIzaSyCidAWtTBVBBMfjVnW4Qce_qygOazWpLz0'}} 
                    defaultCenter={{
                        lat: 31.3015351,
                        lng: 121.50092389999999
                    }}
                    defaultZoom={14}
                    options={createMapOptions}>
                    {
                        this.state.myLocation? <MyGreatPlace lat={this.state.myLocation.lat} lng={this.state.myLocation.lng} text="我"/>:null
                    }
                    {
                        this.state.points.map((point, index) => (
                            <MyGreatPlace lat={point.lat} lng={point.lng} text={index} key={index}/>
                        )) 
                    }
                </GoogleMap>
                <FloatingActionButton 
                    style={{
                        position: 'absolute',
                        zIndex: 999,
                        bottom: 0,
                        right:0
                    }}
                    onClick={this.checkImg}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <input style={{
                    display: 'none'
                }} type="file" id="img-input" />
            </div>
        )
    }
}

class MyGreatPlace extends React.Component {
    render() {
        return (
            <div style={greatPlaceStyle}>
                {this.props.text}
            </div>
        );
    }
}