import React, {Component} from 'react';
import './App.css';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';

const incidentData = require('./data/F01705150050.json');


const mapStyles = {
  width: '100%',
  height: '100%'
};


export class App extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

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
          onClick={this.onMapClicked}
        >
          <Marker onClick={this.onMarkerClick}
            header={incidentData.address.address_line1} />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.header}</h1>
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCeRTYIVDJImwKDxACx5pDnrLXWmbZlRL4'
})(App);

