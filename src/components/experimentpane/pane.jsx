import React from 'react';
import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LoadPanel from './loadPanel';
import RecruitingPanel from './recruitingPanel';


class ExperimentPane extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="experiment" id="editor-pane">
                <Tab eventKey="experiment" title="Load Panel">
                    <LoadPanel />
                </Tab>
                <Tab eventKey="recruiting" title="Recruiting Panel">
                    <RecruitingPanel />
                </Tab>
            </Tabs>
        );
    }
}

export default connect(null, null)(ExperimentPane);