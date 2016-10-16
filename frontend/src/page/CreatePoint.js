import React from 'react';
import {AppBar} from 'material-ui';
import eventProxy from '../service/event';
import api from '../service/api';
import minilize from '../service/minilize';
export default class CreatePoint extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        eventProxy.emit('change header', {
            color: '#333',
            title: '创建地点'
        })
    }
    componentDidMount() {
        var input = document.getElementById('create-point');
        var intro = document.getElementById('intro');
        input.addEventListener('change', function(){
            var file = this.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                eventProxy.emit('show uploading');
                console.log(this.result.length);
                minilize(this.result, mini => {
                    navigator
                        .geolocation
                        .getCurrentPosition((result, err) => {
                            console.log(mini.split(',')[1].length);
                            api.point.create({
                                lat: result.coords.latitude - 0.0012,
                                lng: result.coords.longitude + 0.004,
                                base64: mini.split(',')[1],
                                intro: intro.value
                            }).then(result => {
                                eventProxy.emit('hide uploading');
                            }).catch(err => {
                                eventProxy.emit('hide uploading');
                                alert('超时！');
                            })
                        })
                })
            }
        }, false);
    }
    render() {
        return (
            <div>
                <input type="file" id="create-point" />
                <input type="text" id="intro" />
            </div>
        )
    }
}