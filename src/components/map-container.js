import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow, Polyline } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

class MapContainer extends Component {
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
        const incidentData = this.props.incidentData;

        return (
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

                {this.props.polylineCoords && 
                    <Polyline
                        path={this.props.polylineCoords}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={4}
                         />
                }
            </Map>
        );
    }
}

export const WrappedMapContainer = GoogleApiWrapper({
    apiKey: 'AIzaSyCeRTYIVDJImwKDxACx5pDnrLXWmbZlRL4'
  })(MapContainer);
  