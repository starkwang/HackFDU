import React, { Component } from 'react';

class BlurLoader extends Component {
    constructor(props) {
        super(props);
        var {src, preview} = this.props;
        this.state = { pic: preview, loaded: false };

        var imgLarge = new Image();
        imgLarge.src = src;
        imgLarge.addEventListener('load', e => {
            this.setState(Object.assign(this.state, {
                pic: src,
                loaded: true
            }))
        }, false)
    }
    render() {
        var {width, height, style} = this.props;
        var {pic, loaded} = this.state;
        var picStyle = Object.assign({
            'width': '100%',
            'height': '100%',
            'transition': 'all 1s'
        }, loaded ? {} : {
            'filter': 'blur(50px)',
            'WebkitFilter': 'blur(50px)'
        })
        var containerStyle = Object.assign({
            width: width || 'auto',
            height: height || 'auto',
            overflow: 'hidden'
        }, style);
        return (
            <div style={containerStyle}>
                <img src={pic} style={picStyle} alt=""/>
            </div>
        );
    }
}

export default BlurLoader;
