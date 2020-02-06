import React, { Component } from 'react';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize'

export class IncidentReport extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          weather: null,
        };
    }

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a2be2e48c76c7902071ca2fa90144125/' + 
                this.props.incidentData.address.latitude + ',' + 
                this.props.incidentData.address.longitude + ',' + 
                this.props.incidentData.description.event_opened)
          .then(response => response.json())
          .then(data => this.setState({ weather: data }));
      }

    render() {
        const incidentData = this.props.incidentData;
        const weather = this.state.weather;

        return (
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
                    header="Weather"
                    icon={<Icon>wb_sunny</Icon>}
                    node="div"
                >
                    {weather ? (
                        <div>
                            {(weather.hourly && weather.hourly.summary) || (weather.daily && weather.daily.summary)}
                        </div>
                    ) : (
                        <div>
                            Loading...
                        </div>
                    )}
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
        );
    }
}