import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import React, {Component} from 'react';
import './App.css';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';

import { Row, Col, Collapsible, CollapsibleItem, Icon } from 'react-materialize'


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
      <Row>
        <Col
          s={12} m={3}
        >
          <Collapsible accordion={false}>
            <CollapsibleItem
              expanded={true}
              header="Location"
              icon={<Icon>place</Icon>}
              node="div"
            >
              {incidentData.address.address_line1}
            </CollapsibleItem>
            <CollapsibleItem
              expanded={false}
              header="Details"
              icon={<Icon>event_note</Icon>}
              node="div"
            >
              {incidentData.description.comments}
            </CollapsibleItem>
            <CollapsibleItem
              expanded={false}
              header="Fire Department"
              icon={<Icon>whatshot</Icon>}
              node="div"
            >
              {incidentData.fire_department.name}
            </CollapsibleItem>
          </Collapsible>
        </Col>
          <Col s={12} m={9}>
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
      </Col>
      </Row>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCeRTYIVDJImwKDxACx5pDnrLXWmbZlRL4'
})(App);

