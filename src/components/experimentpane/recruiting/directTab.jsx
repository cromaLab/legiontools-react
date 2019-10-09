import { ExperimentPaneActions } from '../../../redux/actions/experimentPaneActions';
import InfoModal from '../../infoModal'
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class DirectTab extends React.Component {
    
    render() {
        return (
            <div className="mt-3">
                <Form.Row>
                    <Form.Group as={Col} controlId="HITUrl">
                        <Form.Label>URL</Form.Label>
                        <Form.Control type="text" placeholder="USE HTTPS! Enter URL to send workers to" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="HITPrice">
                        <Form.Label>Price (cents)</Form.Label>
                        <Form.Control type="text" placeholder="Price in cents" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="numHITs">
                        <Form.Label>Num HITs</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="numAssignments">
                        <Form.Label>Num Assignments</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                </Form.Row>

                <InfoModal 
                    buttonText="Num HITs vs Num Assignments"
                    title="Number of HITs and Number of Assignments"
                    content={"Num HITs is the number of individual HITs you would like to post.\n\
                    Num Assignments is the number of times you would like each individual HIT to be completed.\n\
                    For example, if you set number of HITs to 2 and number of assignments to 3, then each of the 2 HITs will be completed by 3 workers for a total of 6 worker responses."}/>

                <Button variant="primary">
                    POST HITS
                </Button>
                <Button variant="danger">
                    EXPIRE ALL HITS
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

export default connect(mapStateToProps, mapDispatchToProps)(DirectTab);