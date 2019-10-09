import React from 'react';
import { connect } from 'react-redux';
import HideView from './hide_view';


class LivePane extends React.Component {
    render() {
        return (
            <div>
                <HideView />
                <h1>Overview</h1>
                {this.props.retainerMode ? <h2>retainer mode</h2> : <h2>direct mode</h2>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    retainerMode: (state.experimentPaneReducers.setRetainerMode.enabled)
})

export default connect(mapStateToProps, null)(LivePane);