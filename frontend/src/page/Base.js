import React from 'react';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Uploading from '../component/Uploading';
import Alert from '../component/Alert';
export default class Base extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header/>
                <SideBar/>
                <Alert/>
                <Uploading/>
                <div style={{paddingTop: 64}}>
                {this.props.children}
                </div>
            </div>
        );
    }
}