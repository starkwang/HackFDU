import React from 'react';
import { Dialog, FlatButton } from 'material-ui';
import eventProxy from '../service/event';
export default class Alert extends React.Component {
    constructor(props){
        super(props);
        eventProxy.on('show alert', text => {
            this.handleOpen(text);
        })
        eventProxy.on('hide alert', _ => {
            this.handleClose();
        })
        this.state = {
            open: false,
            text: ''
        }
    }

    handleOpen(text) {
        this.setState({
            text: text || this.state.text,
            open: true
        });
    };

    handleClose() {
        this.setState({
            text: this.state.text,
            open: false
        });
    };
    render(){
        const actions = [
            <FlatButton
                label="确认"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
        ];
        return(
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose.bind(this)}
            >
                {this.state.text}
            </Dialog>
        )
    }
}
