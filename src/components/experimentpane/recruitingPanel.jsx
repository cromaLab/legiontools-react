import React from 'react';
import { connect } from 'react-redux';


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