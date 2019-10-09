import React from 'react';
import { connect } from 'react-redux';
import { LoginActions } from './../../redux/actions/loginActions'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';


class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose = () => {
        console.log(this.refs.loginAccessKey.value);
        console.log(this.refs.loginSecretKey.value);

        this.props.setLoginTokens({
            accessKey: this.refs.loginAccessKey.value,
            secretKey: this.refs.loginSecretKey.value
        })

        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Welcome to LegionTools!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                        LegionTools allows users to easily recruit and route Amazon Mechanical Turk (AMT) workers for synchronous realtime crowdsourcing tasks.
                        </p>
                        <p>
                        For more details, read the Legion Tools User Guide.
                        </p>
                        <p>
                        When you have HITS posted through LegionTools, we recommend <b>not reloading the page</b> as this may cause issues with LegionTools retaining session data. Fortunately, if you try to reload the page, you will be prompted to confirm and can select "Cancel" to cancel the reload.
                        </p>

                        <FormControl className="my-2" ref="loginAccessKey" type="text" placeholder="Access Key" />
                        <FormControl className="my-2" ref="loginSecretKey" type="text" placeholder="Secret Key" />

                        <p>
                        LegionTools was originally developed by Mitchell Gordon and Walter Lasecki at the University of Rochester, and is currently maintained by Sai Gouravajhala, Alan Lundgard, and Walter Lasecki. The React/Redux rewrite was done by Eashwar Mohan.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>
                        Login
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    tokens: (state.loginReducers.setLoginTokens.tokens)
})

const mapDispatchToProps = dispatch => ({
    setLoginTokens: tokens => dispatch(LoginActions.setLoginTokens(tokens))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);