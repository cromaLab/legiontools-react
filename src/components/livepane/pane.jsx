import React from 'react';
import { connect } from 'react-redux';
import HideView from './hide_view';


class LivePane extends React.Component {
    render() {
        return (
            <div>
                <HideView />
                <h1>Overview</h1>
            </div>
        );
    }
}

export default connect(null, null)(LivePane);