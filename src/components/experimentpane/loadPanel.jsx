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
            form: {
                experimentName: "",
                hitTitle: "",
                hitDescription: "",
                hitKeywords: "",
                workerCountry: "All",
                minApproved: ""
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
    }

    handleTextInputChange(event) {
        let field = {};
        field[event.target.id] = event.target.value;

        // works because this.state.form's keys match the form's controlIds
        this.setState({form: {...this.state.form, ...field}}, () => {
            console.log(this.state.form);
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // if no currExperiment is currently set, then add the new experiment to experimentNames
        if (!this.props.currExperiment) {
            this.props.addExperimentName(this.state.form.experimentName);
        }

        // TODO: thunk should save new experiment to database if no currExperiment exists, else just update existing experiment in database
        // TODO: how should hitKeywords be represented, array or string? similar Q's for workerCountry and minApproved
        this.props.setCurrExperiment({
            experimentName: this.state.form.experimentName,
            hitTitle: this.state.form.hitTitle,
            hitDescription: this.state.form.hitDescription,
            hitKeywords: this.state.form.hitKeywords,
            workerCountry: this.state.form.workerCountry,
            minApproved: this.state.form.minApproved
        });

        // once experiment is set, enable live pane
        // TODO: extract this to Redux thunk level?
        if (!this.props.livePaneEnabled) {
            this.props.enableLivePane(true);
        }
    }

    render() {
        return (
            <div className="mt-3">
                <h3>Load an old experiment</h3>

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

                {/* TODO: add validation (minApproved should be number, etc) */}
                <Form onSubmit={this.handleSubmit} onChange={this.handleTextInputChange}>
                    <Form.Group controlId="experimentName">
                        <Form.Label>Experiment Name (Remember This)</Form.Label>
                        {/* TODO: user shouldn't be able to change this once submitted */}
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter a task session name"
                            defaultValue={this.state.form.experimentName}
                        />
                    </Form.Group>
                    <Form.Group controlId="hitTitle">
                        <Form.Label>HIT Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Title (max 128 characters)"
                            defaultValue={this.state.form.hitTitle}
                        />
                    </Form.Group>
                    <Form.Group controlId="hitDescription">
                        <Form.Label>HIT Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Description (max 2000 characters)"
                            defaultValue={this.state.form.hitDescription}
                        />
                    </Form.Group>
                    <Form.Group controlId="hitKeywords">
                        <Form.Label>HIT Keywords</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Keywords (comma separated)"
                            defaultValue={this.state.form.hitKeywords}
                        />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="workerCountry">
                            <Form.Label>Worker Country</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.form.workerCountry}>
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
                                defaultValue={this.state.form.minApproved}
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