import React from 'react';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
//import Message from '../component/Message';
export default class Base extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header/>
                <SideBar/>
                {this.props.children}
            </div>
        );
    }
}