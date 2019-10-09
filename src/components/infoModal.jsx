import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/*
    This class takes in a string as the 'content' prop, with paragraphs separated by newline.
    It also takes a modal title as the 'title' prop.
*/
class InfoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this.handleClose = this.handleClose.bind(this);
        this.setText = this.setText.bind(this);
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    setText = () => {
        const text = this.props.content.split("\n");
        
        const paragraphs = text.map( (paragraph, index) => {
            return(
                <p key={index}>
                    {paragraph}
                </p>
            );
        });
        return (
            <>
            {paragraphs}
            </>
        );
    }

    render() {
        return (
            <div>
                <Button variant="outline-info" size="sm" className="my-3" onClick={() => {this.setState({show:true});}}>
                    {this.props.buttonText}
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.setText()}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default connect(null, null)(InfoModal);