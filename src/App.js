import React, {Component} from 'react';
import './App.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const incidentData = require('./data/F01705150050.json');


const mapStyles = {
  width: '100%',
  height: '100%'
};


export class App extends Component {
  render() {
    return (
      <div className="App">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
          lat: incidentData.address.latitude,
          lng: incidentData.address.longitude
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCeRTYIVDJImwKDxACx5pDnrLXWmbZlRL4'
})(App);

