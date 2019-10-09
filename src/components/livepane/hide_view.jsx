import React from 'react';
import { connect } from 'react-redux';


class HideView extends React.Component {
    render() {
        return (
            <div className={this.props.enabled ? "" : "disableView"}></div>
        );
    }
}
const mapStateToProps = state => ({
    enabled: (state.experimentPaneReducers.enableLivePane.enabled)
})

export default connect(mapStateToProps, null)(HideView);