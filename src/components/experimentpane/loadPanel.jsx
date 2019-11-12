import React from 'react';
import { connect } from 'react-redux';
import { ExperimentPaneActions } from '../../redux/actions/experimentPaneActions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

class LoadPanel extends React.Component {
    constructor(props) {
        super(props);

        // state tracks the values within the form elements
        this.state = {
            textForm: {
                experimentName: "",
                hitTitle: "",
                hitDescription: "",
                hitKeywords: "",
                workerCountry: "All",
                minApproved: ""
            },
            dropdownValue: "Select an experiment name"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange(event) {
        this.setState({dropdownValue: event.target.value}, () => {
            // ignore default value
            if (this.state.dropdownValue !== "Select an experiment name") {
                // TODO: thunk that uses experimentName=this.state.dropdownValue in order to grab info about the currExperiment
                this.props.setCurrExperiment({
                    experimentName: this.state.dropdownValue,
                    hitTitle: "",
                    hitDescription: "",
                    hitKeywords: "",
                    workerCountry: "",
                    minApproved: ""
                });
            }
        });
    }

    handleTextInputChange(event) {
        let field = {};
        field[event.target.id] = event.target.value;

        // works because this.state.textForm's keys match the form's controlIds
        this.setState({textForm: {...this.state.textForm, ...field}}, () => {
            console.log(this.state.textForm);
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // if no currExperiment is currently set, then add the new experiment to experimentNames
        if (!this.props.currExperiment) {
            this.props.addExperimentName(this.state.textForm.experimentName);
        }

        // TODO: thunk should save new experiment to database if no currExperiment exists, else just update existing experiment in database
        // TODO: how should hitKeywords be represented, array or string? similar Q's for workerCountry and minApproved
        this.props.setCurrExperiment({
            experimentName: this.state.textForm.experimentName,
            hitTitle: this.state.textForm.hitTitle,
            hitDescription: this.state.textForm.hitDescription,
            hitKeywords: this.state.textForm.hitKeywords,
            workerCountry: this.state.textForm.workerCountry,
            minApproved: this.state.textForm.minApproved
        });

        // once experiment is set, enable live pane
        // TODO: extract this to Redux thunk level?
        if (!this.props.livePaneEnabled) {
            this.props.enableLivePane(true);
        }

        // TODO: change the dropdown menu's value accordingly
    }

    render() {
        return (
            <div className="mt-3">
                <h3>Load an old experiment</h3>

                <div className="my-3">
                    <Button variant="info" className="mx-1">Copy</Button>
                    <Button variant="danger" className="mx-1">Delete</Button>
                    <Form.Group controlId="loadOldExperiment" className="my-2">
                        <Form.Control as="select" value={this.state.dropdownValue} onChange={this.handleDropdownChange}>
                            <option>Select an experiment name</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <h3>Or create a new experiment</h3>

                {/* TODO: add validation (minApproved should be number, etc) */}
                <Form onSubmit={this.handleSubmit} value={this.state.textForm} onChange={this.handleTextInputChange}>
                    <Form.Group controlId="experimentName">
                        <Form.Label>Experiment Name (Remember This)</Form.Label>
                        {/* TODO: user shouldn't be able to change this once submitted */}
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter a task session name"
                        />
                    </Form.Group>
                    <Form.Group controlId="hitTitle">
                        <Form.Label>HIT Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Title (max 128 characters)"
                        />
                    </Form.Group>
                    <Form.Group controlId="hitDescription">
                        <Form.Label>HIT Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Description (max 2000 characters)"
                        />
                    </Form.Group>
                    <Form.Group controlId="hitKeywords">
                        <Form.Label>HIT Keywords</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Keywords (comma separated)"
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
                        <Form.Group as={Col} md="6" controlId="minApproved">
                            <Form.Label>Min % Approved</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">{this.props.currExperiment ? 'Update' : 'Create'}</Button>
                </Form>
                
            </div>
        );
    }
}


const mapStateToProps = state => ({
    tokens: (state.loginReducers.setLoginTokens.tokens),
    livePaneEnabled: (state.experimentPaneReducers.enableLivePane.enabled),
    currExperiment: (state.experimentPaneReducers.setCurrExperiment.experiment),
    experimentNames: (state.experimentPaneReducers.addExperimentName.names)
})

const mapDispatchToProps = dispatch => ({
    enableLivePane: enabled => dispatch(ExperimentPaneActions.enableLivePane(enabled)),
    setCurrExperiment: experiment => dispatch(ExperimentPaneActions.setCurrExperiment(experiment)),
    addExperimentName: name => dispatch(ExperimentPaneActions.addExperimentName(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadPanel);