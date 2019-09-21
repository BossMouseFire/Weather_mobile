import React, {Component} from 'react';
import {View, Text, AsyncStorage, StyleSheet, ImageBackground, Image,  ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios'
const weathers = {
    "Mon": "Понедельник",
    "Tue": "Вторник",
    "Wed": "Среда",
    "Thu": "Четверг",
    "Fri": "Пятница",
    "Sat": "Суббота",
    "Sun": "Воскресение"
};
class Weather extends Component{
    state ={
        city: '',
        temp: '',
        speed: '',
        humidity: '',
        pressure: '',
        text: '',
        sunset: '',
        sunrise: '',
        weather: [],
        day: false,
        day_text: '7 дней'

    };
    UNSAFE_componentWillMount() {
        AsyncStorage.getItem('city', (err, result) => {
            const fd = new FormData();
            fd.append('city', result.replace(/['"«»]/g, ''));
            axios.post(`http://127.0.0.1:5000/get_info/`, fd)
                .then(response => {
                    const res = response.data;
                    this.setState({
                        city: result.replace(/['"«»]/g, ''),
                        temp: res["current_observation"]["condition"]["temperature"],
                        speed: res["current_observation"]["wind"]["speed"],
                        humidity: res["current_observation"]["atmosphere"]["humidity"],
                        pressure: res["current_observation"]["atmosphere"]["pressure"],
                        text: res["current_observation"]["condition"]["text"],
                        sunset: res["current_observation"]["astronomy"]["sunset"],
                        sunrise: res["current_observation"]["astronomy"]["sunrise"],
                        weather: res["forecasts"]
                    }, () => {
                    });
                })
                .catch(error => {
                    console.log(error.response);
                });
        })
    };
    Seven_days = () => {
        this.setState({
            day: false,
            day_text: '7 дней'
        })
    };
    Ten_days = () => {
        this.setState({
            day: true,
            day_text: '10 дней'
        })
    };
    render(){
        return(
            <View style={{flex: 1}}>
                <ImageBackground style={{flex: 1}}  source={require('../photo/oblaka-3840x2160-nebo-16103.jpg')}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.name_city}>{this.state.city}</Text>
                        <Text style={styles.temperature}>{Math.round((this.state.temp - 32) * 5/9)} 'C</Text>
                        <Text style={styles.text}>{this.state.text}</Text>
                    </View>
                    <View style={styles.icons}>
                        <View style={{flex: 0.5}}>
                            <View style={styles.icon}>
                                <View style={{flex: 0.7}}>
                                    <Image source={require('../photo/sunny.png')} style={{width: 60, height: 60}}/>
                                </View>
                                <Text style={styles.text_icons}>{this.state.sunrise}</Text>
                            </View>
                            <View style={styles.icon}>
                                <View style={{flex: 0.7}}>
                                    <Image source={require('../photo/moon.png')} style={{width: 60, height: 60}}/>
                                </View>
                                <Text style={styles.text_icons}>{this.state.sunset}</Text>
                            </View>
                        </View>
                        <View style={{flex: 0.6}}>
                            <View style={styles.icon}>
                                <View style={{flex: 0.6}}>
                                    <Image source={require('../photo/wind.png')} style={{width: 60, height: 60}}/>
                                </View>
                                <Text style={styles.text_icons}>{this.state.speed} м/с</Text>
                            </View>
                            <View style={styles.icon}>
                                <View style={{flex: 0.4}}>
                                    <Image source={require('../photo/drop.png')} style={{width: 60, height: 60}}/>
                                </View>
                                <Text style={styles.text_icons}>{this.state.humidity} %</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weather_day}>
                        <View>
                            <TouchableOpacity onPress={this.Seven_days}>
                                <Text style={styles.button_weather}>7 дней</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{color: 'white', fontSize: 36}}>/</Text>
                        </View>
                        <View>
                            <TouchableOpacity  onPress={this.Ten_days}>
                                <Text style={styles.button_weather}>10 дней</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.weather}>
                        <Text style={styles.text_weather}>
                            Погода на {this.state.day_text}:
                        </Text>
                        <ScrollView>
                            {this.state.day ? this.state.weather.map(weather => (
                                <View style={styles.board_weather}>
                                    <Text style={styles.text_board}>{weathers[`${weather.day}`]}</Text>
                                    <Text style={styles.temperature_max}>{Math.round((weather.high - 32) * 5/9)} 'C</Text>
                                    <Text style={styles.temperature_min}>{Math.round((weather.low - 32) * 5/9)} 'C</Text>
                                </View>
                            )): this.state.weather.slice(0, 7).map(weather => (
                                <View style={styles.board_weather}>
                                    <Text style={styles.text_board}>{weathers[`${weather.day}`]}</Text>
                                    <Text style={styles.temperature_max}>{Math.round((weather.high - 32) * 5/9)} 'C</Text>
                                    <Text style={styles.temperature_min}>{Math.round((weather.low - 32) * 5/9)} 'C</Text>
                                </View>))
                            }
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    name_city: {
        marginTop: 20,
        fontSize: 40,
        color: 'white'
    },
    temperature: {
        color: 'white',
        marginTop: 5,
        fontSize: 140,
    },
    text: {
        color: 'white',
        marginTop: 2,
        fontSize: 20

    },
    weather: {
        backgroundColor: 'rgba(75, 75, 77, 0.8)',
        borderRadius: 6,
        flex: 1,
        width: 380,
        marginLeft: 16,
        marginTop: 10

    },
    icons: {
        flex: 0.7,
        flexDirection: 'row',
        marginLeft: 40,
    },
    icon: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text_icons: {
        color: 'white',
        fontSize: 18,
    },
    board_weather: {
        flexDirection: 'row',
        padding: 11
    },
    text_board: {
        color: 'white',
        fontSize: 28,
        flex: 0.7
    },
    temperature_max: {
        color: '#edb74a',
        fontSize: 28,
        flex: 0.3
    },
    temperature_min: {
        color: '#4ec0f5',
        fontSize: 28,
    },
    button_weather: {
        fontSize: 24,
        color: 'white'
    },
    weather_day: {
        flex: 0.2,
        flexDirection: 'row',
        backgroundColor: 'rgba(23, 128, 232, 0.9)',
        borderRadius: 8,
        width: 250,
        marginLeft: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_weather: {
        padding: 11,
        color: 'white',
        fontSize: 35
    }
});
export default Weather;