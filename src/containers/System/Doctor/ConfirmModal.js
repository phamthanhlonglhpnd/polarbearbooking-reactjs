import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { CommonUtils } from '../../../utils';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            image: ''
        }
    }

    componentDidMount() {
        this.setState({
            email: this.props.patientData.email
        })
    }

    componentDidUpdate(preProps) {
        if(preProps.patientData!==this.props.patientData) {
            this.setState({
                email: this.props.patientData.email
            })
        }
    }

    toggle = () => {
        this.props.toggleModal();
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangeImage = async (e) => {
        let file = e.target.files[0];
        if(file) {
            let fileBase64 = await CommonUtils.convertBase64(file);
            this.setState({
                image: fileBase64
            })
        }  
    }

    handleSendPrescription = () => {
        this.props.sendPrescription(this.state);
        this.toggle();
    }

    render() {
        let {email} = this.state
        let {isShowModal} = this.props;
        return (
            <Modal 
                isOpen={isShowModal} 
                toggle={() => this.toggle()}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    <div>Gui hoa don cho benh nhan</div>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6">
                            <label>Email</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => this.handleChangeEmail(e)}
                            />
                        </div>
                        <div className="col-6">
                            <label>Gui hoa don</label>
                            <input 
                                type="file"
                                className="form-control"
                                onChange={(e) => this.handleChangeImage(e)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="px-3"
                        color="primary"
                        onClick={() => this.handleSendPrescription()}
                    >
                        Confirm
                    </Button>
                    <Button 
                        className="px-3"
                        toggle={this.toggle}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>    
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
