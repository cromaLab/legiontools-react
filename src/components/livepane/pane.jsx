import React from 'react';
import { connect } from 'react-redux';
import HideView from '../hide_view';
import InfoModal from '../infoModal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


class LivePane extends React.Component {

    constructor(props) {
        super(props)

        this.hitsList = this.hitsList.bind(this);
        this.workersReadyCard = this.workersReadyCard.bind(this);
    }

    hitsList() {
        return (
            <ul>
                <li>this will</li>
                <li>eventually have</li>
                <li>the hits</li>
            </ul>
        );
    }

    workersReadyCard() {
        return (
            <Card className="d-flex">
                <h2>Workers ready</h2>
                <h1>0</h1>
                <Form.Group controlId="sendRetainedWorkersURL">
                    <Form.Control type="text" placeholder="USE HTTPS! Enter URL to send retained workers to" />
                </Form.Group>
                <Form.Group controlId="numRoutedWorkers">
                    <Form.Control type="text" placeholder="How many workers to route?" />
                </Form.Group>
                <Button variant="primary">ROUTE!</Button>
                <Button variant="danger">CLEAR ENTIRE QUEUE (PAYS WORKERS)</Button>
            </Card>
        )
    }

    render() {
        return (
            <div>
                <HideView />
                <Card>    
                    <h1>Overview</h1>
                    <Button variant="primary">LOAD ALL REVIEWABLE HITS</Button>
                    <Button variant="success">APPROVE ALL LOADED HITS</Button>
                    <Button variant="warning">DISPOSE ALL LOADED HITS</Button>
                    <InfoModal
                        buttonText="?"
                        title="Loading and Approving HITs"
                        content={"Clicking Load Hits gathers all of your completed HITs for your approval or rejection.\n\
                        You can approve HITs individually or all at once by clicking Approve All Loaded Hits.\n\
                        After submitting optional bonuses to workers, you can dispose HITs (send workers their bonuses) individually or all at once by clicking Dispose All Loaded HITs."}
                    />
                    {this.hitsList()}
                </Card>
                {this.props.retainerMode ? this.workersReadyCard() : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    retainerMode: (state.experimentPaneReducers.setRetainerMode.enabled),
    sandboxMode: (state.experimentPaneReducers.setSandboxMode.enabled)
})

export default connect(mapStateToProps, null)(LivePane);