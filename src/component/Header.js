import React from 'react';
import {
    AppBar,
    Avatar,
    IconMenu,
    MenuItem,
    IconButton,
    Divider
} from 'material-ui';
import {browserHistory} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import NavigationClose from 'material-ui/svg-icons/navigation/close';

import eventProxy from '../service/event';

import './Header.css';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        eventProxy.on('change header', config => {
            var {color, title} = config;
            this.setState({
                color: color || this.state.color,
                title: title || this.state.title
            });
        });
        eventProxy.on('show header', _ => {
            this.setState(Object.assign(this.state, {
                isShow: true
            }));
        })
        eventProxy.on('hide header', _ => {
            this.setState(Object.assign(this.state, {
                isShow: false
            }));
        })
        this.state = {};
    }
    toRoute(path) {
        browserHistory.push(path);
    }
    componentDidMount() {
        eventProxy.emit('show header');
    }
    showSideBar() {
        eventProxy.emit('show sidebar');
    }
    render() {
        var header = (
            <AppBar
                title={this.state.title || 'Title'}
                key={1}
                className="header"
                onLeftIconButtonTouchTap={this.showSideBar}
                style={Object.assign({
                    transition: 'all 1s'
                },this.state.color?{backgroundColor: this.state.color} : {})}
            >
            </AppBar>
        );
        return (
            <ReactCSSTransitionGroup
                component="div"
                transitionName="header"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={800}>
                {this.state.isShow? header : undefined}
            </ReactCSSTransitionGroup>

        );
    }
}
