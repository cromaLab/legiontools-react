import React from 'react';
import { connect } from 'react-redux';
import { LoginActions } from '../../redux/actions/actions.js'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';


class RecruitingPanel extends React.Component {
    render() {
        return (
            <div>
                <p>
                    Access Key: {this.props.tokens ? this.props.tokens.accessKey : "Loading..."}
                </p>
                <p>
                    SecretKey: {this.props.tokens ? this.props.tokens.secretKey : "Loading..."}
                </p>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    tokens: (state.loginReducers.setLoginTokens.tokens)
})

export default connect(mapStateToProps, null)(RecruitingPanel);