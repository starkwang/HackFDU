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
                var base64 = this.result.split(',')[1];
                eventProxy.emit('show uploading');
                minilize(base64, mini => {
                    api.point.create({
                        lat: 31.3015892,
                        lng: 121.5011383,
                        base64: base64,
                        intro: intro.value
                    }).then(result => {
                        eventProxy.emit('hide uploading');
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