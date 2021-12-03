import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '', 
            firstName: '', 
            lastName: '',
            address: '', 
            phonenumber: ''
        }
    }

    componentDidMount() {
    }

    handleOnChangeInput = (key, e) => {
        let newState = {...this.state};
        newState[key] = e.target.value;
        this.setState({
            ...newState
        })
    }

    checkInput = () => {
        let flag = true;
        let arrInput = ["email", "password", "firstName", "lastName", "address", "phonenumber"];
        for(let i=0; i<arrInput.length; i++) {
            if(this.state[arrInput[i]]==="") {
                flag = false;
                break;
            }
        }
        return flag;
    }

    createNewUser = () => {
        let check = this.checkInput();
        if(!check) {
            alert("Plz fill this field!")
        } else {
            this.props.handleCreateNewUser(this.state);
            this.setState({
                email: '',
                password: '', 
                firstName: '', 
                lastName: '',
                address: '', 
                phonenumber: ''
            })
        } 
    }

    editUser = () => {
        let check = this.checkInput();
        if(!check) {
            alert("Plz fill this field!")
        } else {
            this.props.handleEditUser(this.state);
            this.setState({
                email: '',
                password: '', 
                firstName: '', 
                lastName: '',
                address: '', 
                phonenumber: ''
            })
        }
    }

    toggle = () => {
        this.props.toggleModal();
    }

    render() {
        let {email, password, firstName, lastName, address, phonenumber} = this.state;
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => this.toggle()}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    {this.props.isEditing ? "Edit user" : "Create new user"}
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <form action='/post-crud' method="POST">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="inputEmail4">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            value={email} 
                                            placeholder="Email"
                                            onChange={(e) => this.handleOnChangeInput('email', e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword4">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            value={password} 
                                            placeholder="Password"
                                            onChange={(e) => this.handleOnChangeInput('password', e)}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="inputEmail4">First Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={firstName}  
                                            placeholder="First Name"
                                            onChange={(e) => this.handleOnChangeInput('firstName', e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword4">Last Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={lastName} 
                                            placeholder="Last Name"
                                            onChange={(e) => this.handleOnChangeInput('lastName', e)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Address</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={address} 
                                        placeholder="Address"
                                        onChange={(e) => this.handleOnChangeInput('address', e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress2">Phone Number</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={phonenumber} 
                                        placeholder="Phone Number"
                                        onChange={(e) => this.handleOnChangeInput('phonenumber', e)}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="px-3"
                        color="primary"
                        onClick={() => this.createNewUser()}
                    >
                        Add
                    </Button>
                    {' '}
                    <Button 
                        onClick={() => this.toggle()}
                        className="px-3"
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
