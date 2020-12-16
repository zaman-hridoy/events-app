import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

function EventActivity() {
    return (
        <div>
            <Header attached="top" content="Recent Activity" />
            <Segment attached>
                <p>Recent activity</p>
            </Segment>
        </div>
    )
}

export default EventActivity;
