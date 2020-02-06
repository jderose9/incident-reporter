import React, { Component } from 'react';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize'

export class IncidentReport extends Component {
    render() {
        const incidentData = this.props.incidentData;

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