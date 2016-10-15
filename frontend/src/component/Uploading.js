import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import CircularProgress from 'material-ui/CircularProgress';
import eventProxy from '../service/event';
/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class Uploading extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            progress: 0
        }
    }

    componentDidMount() {
        var timer;
        eventProxy.on('show uploading', _ => {
            this.handleOpen();
            var progress = 0;
            this.handleUpdate(0);
            timer = setInterval(_ => {
                progress += 10*Math.random();
                if(progress > 95){
                    progress = 95
                }
                this.handleUpdate(progress);
            }, 500)
        });
        eventProxy.on('hide uploading', _ => {
            timer && clearInterval(timer);
            this.handleUpdate(100);
            setTimeout(_ => {
                this.handleClose();
                this.handleUpdate(0);
            }, 500)
            
        });
        // eventProxy.on('update uploading', progress => {
        //     this.handleUpdate(progress);
        // });
    }
    handleOpen() {
        this.setState(Object.assign(this.state, {open: true}));
    };

    handleClose() {
        this.setState(Object.assign(this.state, {open: false}));
    };

    handleUpdate(progress) {
        this.setState(Object.assign(this.state, {progress: progress}));
    }

    render() {

        return (
            <Dialog
                title="上传中"
                titleStyle={{
                    textAlign: 'center'
                }}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <CircularProgress style={{    
                    left: '50%',
                    marginLeft: '-20px'
                }} mode="determinate" value={this.state.progress}/>
            </Dialog>
        );
    }
}