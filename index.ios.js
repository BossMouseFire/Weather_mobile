import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Routes from './Components/Routes.js'

class Apps extends Component {
    render() {
        return (
            <Routes />
        )
    }
}
export default Apps;
AppRegistry.registerComponent('reactTutorialApp', () => reactTutorialApp);