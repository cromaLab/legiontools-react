import { ExperimentPaneActions } from '../../../redux/actions/experimentPaneActions';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


class RetainerTab extends React.Component {
    
    render() {
        return (
            <div className="mt-3">
                <Form.Row>
                    <Form.Group as={Col} controlId="assignableHITCount">
                        <Form.Label>Target number of assignable HITs</Form.Label>
                        <Form.Control type="text" placeholder="0" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="minTaskPrice">
                        <Form.Label>Min task price (cents)</Form.Label>
                        <Form.Control type="text" placeholder="Min price in cents" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="maskTaxPrice">
                        <Form.Label>Max task price (cents)</Form.Label>
                        <Form.Control type="text" placeholder="Max price in cents" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="instructionUrl">
                        <Form.Label>Instructions Page URL</Form.Label>
                        <Form.Control type="text" placeholder="Workers will see this prior to accepting the HIT" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="tutorialUrl">
                        <Form.Label>Tutorial Page URL</Form.Label>
                        <Form.Control type="text" placeholder="Workers will be routed to this to be trained." />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="postTutorialWaitingUrl">
                        <Form.Label>Post-Tutorial Waiting Page URL</Form.Label>
                        <Form.Control type="text" placeholder="Workers will see this page after successful tutorial completion" />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary">
                    START RECRUITING
                </Button>
                <Button variant="danger">
                    STOP RECRUITING
                </Button>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    tokens: (state.loginReducers.setLoginTokens.tokens),
    sandboxMode: (state.experimentPaneReducers.setSandboxMode.enabled)
})

const mapDispatchToProps = dispatch => ({
    enableSandboxMode: sandboxMode => dispatch(ExperimentPaneActions.setSandboxMode(sandboxMode))
})

export default connect(mapStateToProps, mapDispatchToProps)(RetainerTab);