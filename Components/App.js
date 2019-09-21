import React, {Component} from 'react';
import { StyleSheet, ImageBackground, View, Text, Button, AsyncStorage, Image} from 'react-native';
import { Hoshi} from 'react-native-textinput-effects';
import {Actions} from "react-native-router-flux";
class App extends Component{
    state = {
      name_city: '',
    };
    City = (text) =>{
        this.setState({
           name_city: text
        });
    };
    Weather = () =>{
        if(this.state.name_city !== ''){
            AsyncStorage.setItem('city', JSON.stringify (this.state.name_city));
            Actions.get();
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={{flex: 1}} source={require('../photo/mountains.jpg')} blurRadius={4}>
                    <Text style={styles.logo}>
                         ＷΞΛＴＨΞＲ
                    </Text>
                    <View style={styles.create_city}>
                        <Hoshi
                            label={'Город'}
                            borderColor={'green'}
                            borderHeight={3}
                            inputPadding={16}
                            style={styles.input}
                            inputStyle={{ color: 'black' }}
                            onChangeText={this.City}
                        />
                        <Button title={'Узнать'} style={styles.create} onPress={this.Weather}/>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        marginTop: 170,
        marginLeft: 35,
        fontSize: 60,
        color: 'white'

    },
    input: {
        marginTop: 30,
        width: 300,
        marginLeft: 25,

    },
    create: {
        flex: 3,
    },
    create_city: {
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 29,
        backgroundColor: 'white',
        width: 350,
        height: 250,

    }
});

export default App;