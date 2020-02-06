import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import React, {Component} from 'react';
import { Row, Col, CardPanel } from 'react-materialize'
import { IncidentReport } from './components/incident-report';
import { RespondersList } from './components/responders-list';
import { WrappedMapContainer } from './components/map-container';


const incidentData = require('./data/F01705150050.json');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { polylineCoords: null}

    this.handleResponderSelect = this.handleResponderSelect.bind(this);
  }

  handleResponderSelect(coords) {
    this.setState({polylineCoords: coords});
  }

  render() {
    return (
      <Row>
        <Col s={12} m={3}>
          <CardPanel className="teal">
            <div className="white-text">
              INCIDENT
            </div>
          </CardPanel>
          <IncidentReport incidentData={incidentData} />
          <br />
          <CardPanel className="teal">
            <div className="white-text">
              RESPONDERS
            </div>
            {/* <div> className="white-text">
              select to plot route)
            </div> */}
          </CardPanel>
          <RespondersList responders={incidentData.apparatus} onSelect={this.handleResponderSelect} />
        </Col>
        <Col s={12} m={9}>
          <WrappedMapContainer incidentData={incidentData} polylineCoords={this.state.polylineCoords} />
        </Col>
      </Row>
    );
  }
}
