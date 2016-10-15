import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import icon1 from '../img/icon1.svg';
import icon2 from '../img/icon2.svg';
import icon3 from '../img/icon3.svg';
import eventProxy from '../service/event';

export default class Archievement extends React.Component {
    constructor(props) {
        super(props);
        eventProxy.emit('change header', {
            color: '#F44336',
            title: '成就室'
        });
    }
    render() {
        return (
            <List>
                <Subheader>已解锁的成就</Subheader>
                <ListItem
                leftAvatar={<Avatar src={icon1} />}
                primaryText="猫王"
                secondaryText={
                    <p>
                    <span style={{color: darkBlack}}>★★★★★</span><br />
                    拍到的猫数量最多。
                    </p>
                }
                secondaryTextLines={2}
                />
                <Divider inset={true} />
                <ListItem
                leftAvatar={<Avatar src={icon2} />}
                primaryText="食堂阿姨的爱"
                secondaryText={
                    <p>
                    <span style={{color: darkBlack}}>★★★☆☆</span><br />
                    在食堂附近活动最多。
                    </p>
                }
                secondaryTextLines={2}
                />
                <Divider inset={true} />
                <ListItem
                leftAvatar={<Avatar src={icon3} />}
                primaryText="站在复旦顶峰的男人"
                secondaryText={
                    <p>
                    <span style={{color: darkBlack}}>★★☆☆☆</span><br />
                    连续10天在光华楼32楼拍照。
                    </p>
                }
                secondaryTextLines={2}
                />
                <Divider inset={true} />
                <Subheader>待解锁的成就</Subheader>
                <ListItem
                leftAvatar={<Avatar src={icon3} />}
                primaryText="烧死异教徒"
                secondaryText={
                    <p>
                    <span style={{color: darkBlack}}>★★☆☆☆</span><br />
                    20张以上的照片出现两个不同性别的人。
                    </p>
                }
                secondaryTextLines={2}
                />
                <Divider inset={true} />
                <ListItem
                leftAvatar={<Avatar src={icon3} />}
                primaryText="亚♂拉♂那♂一♂卡"
                secondaryText={
                    <p>
                    <span style={{color: darkBlack}}>★★☆☆☆</span><br />
                    20张以上的照片出现两个男性。
                    </p>
                }
                secondaryTextLines={2}
                />
                <Divider inset={true} />
                <ListItem
                leftAvatar={<Avatar src={icon3} />}
                primaryText="给学渣留点活路吧"
                secondaryText={
                    <p>
                    <span style={{color: darkBlack}}>★★☆☆☆</span><br />
                    深夜四点在三教附近拍照。
                    </p>
                }
                secondaryTextLines={2}
                />
            </List>
        );
    }
}