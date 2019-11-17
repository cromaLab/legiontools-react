import React from 'react';
import { connect } from 'react-redux';
import { ExperimentPaneActions } from '../../redux/actions/experimentPaneActions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';

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
            dropdownValue: "Select an experiment name",
            copyModal: {
                show: false,
                value: ""
            },
            showDeleteModal: false
        };

        // helper func to reduce duplication
        this.resetState = this.resetState.bind(this);

        // handles text input form
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);

        // handles dropdown form
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        
        // handles copy functionality
        this.openCopyModal = this.openCopyModal.bind(this);
        this.closeCopyModal = this.closeCopyModal.bind(this);
        this.handleCopyModalChange = this.handleCopyModalChange.bind(this);
        this.copyExperiment = this.copyExperiment.bind(this);

        // handles delete functionality
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.deleteExperiment = this.deleteExperiment.bind(this);
    }

    resetState() {
        // clear out the currExperiment, allowing users to create a new one
        this.props.setCurrExperiment(null);

        // deselect currExperiment in the dropdown menu
        this.setState({dropdownValue: "Select an experiment name"});

        // empty text form
        this.setState({
            textForm: {
                experimentName: "",
                hitTitle: "",
                hitDescription: "",
                hitKeywords: "",
                workerCountry: "All",
                minApproved: ""
            }
        });

        // disable the live pane
        this.props.enableLivePane(false);
    }

    handleDropdownChange(event) {
        if (event.target.value === "Select an experiment name") {
            this.resetState();
        }
        else {
            this.setState({dropdownValue: event.target.value});

            // TODO: thunk that uses experimentName=this.state.dropdownValue in order to grab info about the currExperiment
            // within that thunk, dispatch a SET_CURR_EXPERIMENT action
            this.props.setCurrExperiment({
                experimentName: event.target.value,
                hitTitle: "",
                hitDescription: "",
                hitKeywords: "",
                workerCountry: "",
                minApproved: ""
            });

            // TODO: use currExperiment data to fill this.state.textForm

            if (!this.props.livePaneEnabled) {
                this.props.enableLivePane(true);
            }
        }
    }

    openCopyModal() {
        // modal asks user to give the copied experiment a unique name
        this.setState({
            copyModal: {
                ...this.state.copyModal,
                show: true
            }
        });
    }

    closeCopyModal() {
        // reset modal
        this.setState({
            copyModal: {
                show: false,
                value: ""
            }
        });
    }

    handleCopyModalChange(event) {
        this.setState({
            copyModal: {
                ...this.state.copyModal,
                value: event.target.value
            }
        });
    }

    copyExperiment() {
        // TODO: thunk updates DB with new experiment
        // setCurrExperiment with copied values except for the unique experimentName
        this.props.setCurrExperiment({
            experimentName: this.state.copyModal.value,
            hitTitle: this.props.currExperiment.hitTitle,
            hitDescription: this.props.currExperiment.hitDescription,
            hitKeywords: this.props.currExperiment.hitKeywords,
            workerCountry: this.props.currExperiment.workerCountry,
            minApproved: this.props.currExperiment.minApproved
        });

        // update experimentNames with new experimentName
        this.props.addExperimentName(this.state.copyModal.value);

        // update dropdownValue with new experimentName
        this.setState({dropdownValue: this.state.copyModal.value});

        // update text form with new experimentName
        this.setState({
            textForm: {
                ...this.props.currExperiment,
                experimentName: this.state.copyModal.value
            }
        });

        this.closeCopyModal();
    }

    openDeleteModal() {
        this.setState({showDeleteModal: true});
    }

    closeDeleteModal() {
        this.setState({showDeleteModal: false});
    }

    deleteExperiment() {
        // TODO: thunk deletes experiment from DB

        // remove the experiment from experimentNames
        this.props.removeExperimentName(this.props.currExperiment.experimentName);

        this.resetState();

        this.closeDeleteModal();
    }

    handleTextInputChange(event) {
        // works because this.state.textForm's keys match the form's controlIds
        this.setState({
            textForm: {
                ...this.state.textForm,
                [event.target.id]: event.target.value
            }
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
        if (!this.props.livePaneEnabled) {
            this.props.enableLivePane(true);
        }

        // TODO: thunk changes the dropdown menu's value accordingly 
        // (can't here because this.props.currExperiment isn't set yet)
        this.setState({dropdownValue: this.state.textForm.experimentName});
    }

    render() {
        return (
            <div className="mt-3">
                <Modal show={this.state.copyModal.show}>
                    <ModalHeader closeButton>Please enter a unique new task name</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.copyExperiment}>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Task session name"
                                value={this.modalValue}
                                onChange={this.handleCopyModalChange}
                            />
                        </Form>
                    </ModalBody>
                    <ModalFooter className="p-0">
                        <Button variant="primary" onClick={this.copyExperiment}>OK</Button>
                        <Button variant="secondary" onClick={this.closeCopyModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal show={this.state.showDeleteModal}>
                    <ModalBody>
                        <p>Are you sure you want to delete the experiment {this.props.currExperiment ? `"${this.props.currExperiment.experimentName}"`: ""}? This will stop recruiting and prevent you from approving/rejecting submitted HITs.</p>
                    </ModalBody>
                    <ModalFooter className="p-0">
                        <Button variant="primary" onClick={this.deleteExperiment}>OK</Button>
                        <Button variant="secondary" onClick={this.closeDeleteModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <h3>Load an old experiment</h3>

                <div className="my-3">
                    <Button variant="info" className="mx-1" 
                        disabled={!this.props.currExperiment}
                        onClick={this.openCopyModal}>Copy
                    </Button>
                    <Button variant="danger" className="mx-1"
                        disabled={!this.props.currExperiment}
                        onClick={this.openDeleteModal}>Delete
                    </Button>
                    <Form.Group controlId="loadOldExperiment" className="my-2">
                        <Form.Control as="select" value={this.state.dropdownValue} onChange={this.handleDropdownChange}>
                            <option>Select an experiment name</option>
                            {this.props.experimentNames && 
                             this.props.experimentNames.map(name => (<option key={name}>{name}</option>))}
                        </Form.Control>
                    </Form.Group>
                </div>

                <h3>Or create a new experiment</h3>

                {/* TODO: add validation (minApproved should be number, etc) */}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="experimentName">
                        <Form.Label>Experiment Name (Remember This)</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter a task session name"
                            value={this.state.textForm.experimentName}
                            onChange={this.handleTextInputChange}
                            disabled={this.props.currExperiment}
                        />
                    </Form.Group>
                    <Form.Group controlId="hitTitle">
                        <Form.Label>HIT Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Title (max 128 characters)"
                            value={this.state.textForm.hitTitle}
                            onChange={this.handleTextInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="hitDescription">
                        <Form.Label>HIT Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Description (max 2000 characters)"
                            value={this.state.textForm.hitDescription}
                            onChange={this.handleTextInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="hitKeywords">
                        <Form.Label>HIT Keywords</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter HIT Keywords (comma separated)"
                            value={this.state.textForm.hitKeywords}
                            onChange={this.handleTextInputChange}
                        />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="workerCountry">
                            <Form.Label>Worker Country</Form.Label>
                            <Form.Control as="select"
                                value={this.state.textForm.workerCountry}
                                onChange={this.handleTextInputChange}>
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
                                value={this.state.textForm.minApproved}
                                onChange={this.handleTextInputChange}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        {this.props.currExperiment ? 'Update' : 'Create'}
                    </Button>
                </Form>
                
            </div>
        );
    }
}


const mapStateToProps = state => ({
    tokens: (state.loginReducers.setLoginTokens.tokens),
    livePaneEnabled: (state.experimentPaneReducers.enableLivePane.enabled),
    currExperiment: (state.experimentPaneReducers.setCurrExperiment.experiment),
    experimentNames: (state.experimentPaneReducers.setExperimentNames.names)
})

const mapDispatchToProps = dispatch => ({
    enableLivePane: enabled => dispatch(ExperimentPaneActions.enableLivePane(enabled)),
    setCurrExperiment: experiment => dispatch(ExperimentPaneActions.setCurrExperiment(experiment)),
    addExperimentName: name => dispatch(ExperimentPaneActions.addExperimentName(name)),
    removeExperimentName: name => dispatch(ExperimentPaneActions.removeExperimentName(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadPanel);