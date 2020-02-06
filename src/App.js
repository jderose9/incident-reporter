import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import React, {Component} from 'react';
import { Row, Col } from 'react-materialize'
import { IncidentReport } from './components/incident-report';
import { WrappedMapContainer } from './components/map-container';


const incidentData = require('./data/F01705150050.json');


export default class App extends Component {
  render() {
    return (
      <Row>
        <Col s={12} m={3}>
          <IncidentReport incidentData={incidentData} />
        </Col>
        <Col s={12} m={9}>
          <WrappedMapContainer incidentData={incidentData} />
        </Col>
      </Row>
    );
  }
}
