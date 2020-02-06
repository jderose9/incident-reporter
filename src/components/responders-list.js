import React, { Component } from 'react';
import { Collapsible, CollapsibleItem, Icon, Table } from 'react-materialize'

export class RespondersList extends Component {
    constructor(props) {
        super(props);
    
        this.handleSelect = this.handleSelect.bind(this);
    }
      
    handleSelect(val, state) {
        if(this.props.onSelect) {
            const status = this.sortResponderStatus(this.props.responders[val])
            const coords = status.map((s) => { return { lat: s.value?.latitude, lng: s.value?.longitude }  })
            console.log(coords);
            this.props.onSelect(coords)
        }
    }

    sortResponderStatus(responder) {
        return Object.entries(responder.unit_status)
            .map(([key, value]) => { return { key, value } })
            .sort((a, b) => (a.value?.timestamp || '').localeCompare(b.value?.timestamp || '')); // assuming all timestamps have same offset
    }

    render() {
        const responders = this.props.responders;
        let responderStatus = {};

        responders.forEach(responder => {
            if(responder.unit_status)
                responderStatus[responder.car_id] = this.sortResponderStatus(responder);
        });

        return (
            <Collapsible accordion={true} onSelect={this.handleSelect}>
                 {responders && responders.map((responder, index) => 
                    <CollapsibleItem
                        key={responder.car_id}
                        expanded={false}
                        header={responder.unit_id + ' ' + responder.shift + ' [' + responder.station + ']'}
                        icon={<Icon>airport_shuttle</Icon>}
                        node="div"
                    >
                        <div>Unit Type: {responder.unit_type}</div>
                        <div>Event Duration: {responder.extended_data?.event_duration}</div>
                        <br />
                        {responderStatus[responder.car_id] && 
                            
                            <Table>
                                <thead>
                                    <tr>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        TimeStamp
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {responderStatus[responder.car_id].map((status, index) => 
                                        <tr key={status.key}>
                                            <td>{status.key}</td>
                                            <td>{status.value.timestamp}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        }
                    </CollapsibleItem>
                )}
            </Collapsible>
        );
    }
}