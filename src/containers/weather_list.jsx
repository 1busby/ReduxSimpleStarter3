import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {

    // renders row for a single city
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(forecast => forecast.main.temp);
        const pressures = cityData.list.map(forecast => forecast.main.pressure);
        const humidities = cityData.list.map(forecast => forecast.main.humidity);
        const { lon, lat } = cityData.city.coord;

        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td><Chart data={temps} color='green' units='K' /></td>
                <td><Chart data={pressures} color='red' units='hPa' /></td>
                <td><Chart data={humidities} color='blue' units='%' /></td>
            </tr>
        )
    }

    render() {
        return (
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather }; // { weather } === { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);