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
        this.resetForms = this.resetForms.bind(this);

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

    resetForms() {
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
    }

    handleDropdownChange(event) {
        if (event.target.value === "Select an experiment name") {
            this.resetForms();

            // clear out the currExperiment, allowing users to create a new one
            this.props.setCurrExperiment(null);

            // disable the live pane
            this.props.enableLivePane(false);
        }
        else {
            this.setState({dropdownValue: event.target.value});

            // TODO: loadExperiment action
            this.props.loadExperiment(event.target.value, this.props.tokens).then(() => {
                // TODO: will this execute if loadExperiment throws an error
                // after currExperiment is set, use currExperiment values to populate textForm
                return this.setState({
                    textForm: {
                        experimentName: this.props.currExperiment.experimentName,
                        hitTitle: this.props.currExperiment.hitTitle,
                        hitDescription: this.props.currExperiment.hitDescription,
                        hitKeywords: this.props.currExperiment.hitKeywords,
                        workerCountry: this.props.currExperiment.workerCountry,
                        minApproved: this.props.currExperiment.minApproved
                    }
                });
            }).then(() => {
                if (!this.props.livePaneEnabled) {
                    this.props.enableLivePane(true);
                }
            });
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

    copyExperiment(event) {
        event.preventDefault();

        // TODO: copyExperiment action
        this.props.copyExperiment(this.props.currExperiment, this.state.copyModal.value, this.props.tokens).then(() => {
            // update dropdownValue with new experimentName
            this.setState({dropdownValue: this.props.currExperiment.experimentName});

            // update text form with new experimentName
            this.setState({
                textForm: {
                    ...this.props.currExperiment
                }
            });

            this.closeCopyModal();
        });
    }

    openDeleteModal() {
        this.setState({showDeleteModal: true});
    }

    closeDeleteModal() {
        this.setState({showDeleteModal: false});
    }

    deleteExperiment() {
        // TODO: deleteExperiment action
        this.props.deleteExperiment(this.props.currExperiment.experimentName, this.props.tokens).then(() => {
            this.resetForms();

            this.closeDeleteModal();
        });
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

        // if no currExperiment is currently set, then create the new experiment
        if (!this.props.currExperiment) {
            // TODO: addExperiment action
            this.props.addExperiment(this.state.textForm, this.props.tokens).then(() => {
                // once experiment is set, enable live pane
                if (!this.props.livePaneEnabled) {
                    this.props.enableLivePane(true);
                }

                // update dropdownValue with currExperiment's name
                this.setState({dropdownValue: this.props.currExperiment.experimentName});
            });
        }
        else {
            // TODO: updateExperiment action
            this.props.updateExperiment(this.state.textForm, this.props.tokens).then(() => {
                // once experiment is set, enable live pane
                if (!this.props.livePaneEnabled) {
                    this.props.enableLivePane(true);
                }
            });
        }
    }

    render() {
        return (
            <div className="mt-3">
                <Modal show={this.state.copyModal.show} onHide={this.closeCopyModal}>
                    <ModalHeader closeButton>Please enter a unique new task name</ModalHeader>
                    <ModalBody>
                        {/* TODO: validate that modal value is unique before proceeding */}
                        <Form onSubmit={this.copyExperiment}>
                            <Form.Group controlId="copyExperiment">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Task session name"
                                    value={this.modalValue}
                                    onChange={this.handleCopyModalChange}
                                />
                            </Form.Group>
                                {/* TODO: margin utility doesn't work because of default btn styling */}
                                <Button className="m-0" variant="primary" type="submit">OK</Button>
                                <Button className="m-0" variant="secondary" onClick={this.closeCopyModal}>Cancel</Button>
                        </Form>
                    </ModalBody>
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
                {/* TODO: use this.props.currExperiment's value as the defaultValue for this form? */}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="experimentName">
                        <Form.Label>Experiment Name (Remember This)</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter a task session name"
                            value={this.state.textForm.experimentName}
                            onChange={this.handleTextInputChange}
                            disabled={this.props.currExperiment} // experimentName is used as id, cannot be changed
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
    loadExperiment: (name, tokens) => dispatch(ExperimentPaneActions.loadExperiment(name, tokens)),
    updateExperiment: (experiment, tokens) => dispatch(ExperimentPaneActions.updateExperiment(experiment, tokens)),
    addExperiment: (experiment, tokens) => dispatch(ExperimentPaneActions.addExperiment(experiment, tokens)),
    copyExperiment: (originalExperiment, copyName, tokens) => dispatch(ExperimentPaneActions.copyExperiment(originalExperiment, copyName, tokens)),
    deleteExperiment: (name, tokens) => dispatch(ExperimentPaneActions.deleteExperiment(name, tokens))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadPanel);