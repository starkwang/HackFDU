import React from 'react';
import eventProxy from '../service/event';
import {browserHistory} from 'react-router';

import {Drawer, MenuItem, Divider, Subheader} from 'material-ui';
import IndexIcon from 'material-ui/svg-icons/action/home';
import LoginIcon from 'material-ui/svg-icons/action/perm-identity';
import SignupIcon from 'material-ui/svg-icons/communication/contacts';
import PublishIcon from 'material-ui/svg-icons/action/offline-pin';
import CategoryIcon0 from 'material-ui/svg-icons/action/assignment';
import CategoryIcon1 from 'material-ui/svg-icons/maps/add-location';
import CategoryIcon2 from 'material-ui/svg-icons/action/account-balance';
import CategoryIcon3 from 'material-ui/svg-icons/action/receipt';
import CategoryIcon4 from 'material-ui/svg-icons/content/weekend';
import CategoryIcon5 from 'material-ui/svg-icons/action/chrome-reader-mode';
import CategoryIcon6 from 'material-ui/svg-icons/action/card-giftcard';
import CategoryIcon7 from 'material-ui/svg-icons/action/motorcycle';
import CategoryIcon8 from 'material-ui/svg-icons/notification/wc';
import CategoryIcon9 from 'material-ui/svg-icons/action/tab-unselected';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    componentDidMount() {
        eventProxy.on('show sidebar', _ => {
            this.setState({open: true});
        });
        eventProxy.on('hide sidebar', _ => {
            this.setState({open: false});
        });
    }
    toRoute(path) {
        this.setState({open: false});
        browserHistory.push(path);
    }
    render() {
        return (
            <Drawer
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
                className="sidebar">
                <Subheader>导航</Subheader>
                <MenuItem leftIcon={<IndexIcon/>} onTouchTap={_ => this.toRoute('/')}>
                    主页
                </MenuItem>
                <MenuItem leftIcon={<CategoryIcon0/>} onTouchTap={_ => this.toRoute('/missions')}>任务列表</MenuItem>
                <MenuItem leftIcon={<CategoryIcon1/>} onTouchTap={_ => this.toRoute('/createPoint')}>创建地点</MenuItem>
                <MenuItem leftIcon={<PublishIcon/>} onTouchTap={_ => this.toRoute('/archievement')}>成就</MenuItem>
                <Divider/>
                <Subheader>分类</Subheader>
                <MenuItem leftIcon={<CategoryIcon0 />}>
                    分类
                </MenuItem>
                <MenuItem leftIcon={<CategoryIcon1 />}>
                    分类
                </MenuItem>
                <Divider/>
            </Drawer>
        )
    }
}
