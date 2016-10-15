import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Base from './page/Base';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Router,
    Route,
    browserHistory,
    Link,
    IndexRoute,
    Redirect
} from 'react-router';
import IndexPage from './page/IndexPage';
import MissionsPage from './page/MissionsPage';
import CreatePoint from './page/CreatePoint';
import MissionDetail from './page/MissionDetail';
import logo from './logo.svg';
import './App.css';
import './css/animate.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router history={browserHistory}>
                    <Route path="/" component={Base}>
                        <IndexRoute component={IndexPage}/>
                        <Route path="/missions" component={MissionsPage}/>
                        <Route path="/createPoint" component={CreatePoint}/>
                        <Route path="/missionDetail/:id" component={MissionDetail}/>
                        <Redirect from="index.html" to="/" />
                    </Route>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
