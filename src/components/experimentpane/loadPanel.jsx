import React from 'react';
import { connect } from 'react-redux';
import { LivePaneActions } from '../../redux/actions/livePaneActions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

class LoadPanel extends React.Component {
    render() {
        return (
            <div className="mt-3">
                <h2>Load an old experiment</h2>

                <div className="my-3">
                    <Button variant="info" className="mx-1">Copy</Button>
                    <Button variant="danger" className="mx-1">Delete</Button>
                    <Form.Group controlId="loadOldExperiment" className="my-2">
                        <Form.Control as="select">
                            <option>-----</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <h3>Or create a new experiment</h3>

                <Form>
                    <Form.Group controlId="experimentName">
                        <Form.Label>Experiment Name (Remember This)</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter a task session name"
                            defaultValue=""
                        />
                    </Form.Group>
                    <Form.Group controlId="hitTitle">
                        <Form.Label>HIT Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Title (max 128 characters)"
                            defaultValue=""
                        />
                    </Form.Group>
                    <Form.Group controlId="hitDescription">
                        <Form.Label>HIT Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Description (max 2000 characters)"
                            defaultValue=""
                        />
                    </Form.Group>
                    <Form.Group controlId="hitKeywords">
                        <Form.Label>HIT Keywords</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Keywords (comma separated)"
                            defaultValue=""
                        />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="workerCountry">
                            <Form.Label>Worker Country</Form.Label>
                            <Form.Control as="select">
                                <option>All</option>
                                <option>US</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="minPercentApproved">
                            <Form.Label>Min % Approved</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                defaultValue=""
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>
                
                <Button variant="primary" onClick={() => {this.props.enableLivePane(!this.props.livePaneEnabled)}}>Update</Button>
                
            </div>
        );
    }
}


const mapStateToProps = state => ({
    tokens: (state.loginReducers.setLoginTokens.tokens),
    livePaneEnabled: (state.livePaneReducers.enableLivePane.enabled)
})

const mapDispatchToProps = dispatch => ({
    enableLivePane: enabled => dispatch(LivePaneActions.enableLivePane(enabled))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadPanel);