import React from 'react';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Uploading from '../component/Uploading';
export default class Base extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header/>
                <SideBar/>
                <Uploading/>
                {this.props.children}
            </div>
        );
    }
}