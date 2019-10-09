import { ExperimentPaneActions } from '../../../redux/actions/experimentPaneActions';
import InfoModal from '../../infoModal';
import RetainerTab from './retainerTab';
import DirectTab from './directTab';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


class RecruitingPanel extends React.Component {
    componentDidMount() {
        this.props.enableSandboxMode(true);
        this.props.enableRetainerMode(true);
    }

    render() {
        return (
            <div>
                <h3 className="pt-4">Recruiting</h3>
                <h5>Currently in {this.props.sandboxMode ? "SANDBOX" : "LIVE"} mode.</h5>
                <Button variant="warning" onClick={() => {this.props.enableSandboxMode(!this.props.sandboxMode);}}>Click to toggle modes.</Button> 
                <InfoModal 
                    buttonText="What do the modes mean?"
                    title="Sandbox mode and Live mode" 
                    content={"Sandbox mode allows you to test your HIT for free at <a href=\"https://workersandbox.mturk.com\">MTurk Worker Sandbox</a>.\n\
                    Live mode actually posts your HIT to Mechanical Turk for real workers to complete, costing money to your account."}/>

                <p>
                    Access Key: {this.props.tokens ? this.props.tokens.accessKey : "Loading..."}
                </p>
                <p>
                    SecretKey: {this.props.tokens ? this.props.tokens.secretKey : "Loading..."}
                </p>

                <Form.Check type="radio" id="uniqueWorkers" label="Require unique workers"/>
                <Button variant="warning">Reset History</Button>
                <Button variant="danger">Delete keys</Button>
                <InfoModal
                    buttonText="About unique workers"
                    title="Requiring Unique Workers"
                    content={"Requiring unique workers prevents the same worker from completing your HIT multiple times. This requires temporarily storing your MTurk Access and Secret keys on our server.\n\
                    You can reset the history of unique workers by clicking the Reset History button.\n\
                    You can delete your MTurk keys from our server by clicking the Delete Keys button."}/>
                <b>For account balance, visit <a href="https://requester.mturk.com/mturk/youraccount">here</a>.</b>

                <Tabs defaultActiveKey="retainer" id="editor-pane" onSelect={(key) => this.props.enableRetainerMode((key === "retainer" ? true : false))}>
                    <Tab eventKey="retainer" title="Retainer" >
                        <RetainerTab />
                    </Tab>
                    <Tab eventKey="direct" title="Direct (Classic)">
                        <DirectTab />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    tokens: (state.loginReducers.setLoginTokens.tokens),
    sandboxMode: (state.experimentPaneReducers.setSandboxMode.enabled)
})

const mapDispatchToProps = dispatch => ({
    enableSandboxMode: sandboxMode => dispatch(ExperimentPaneActions.setSandboxMode(sandboxMode)),
    enableRetainerMode: retainerMode => dispatch(ExperimentPaneActions.setRetainerMode(retainerMode))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecruitingPanel);