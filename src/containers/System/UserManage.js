import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createNewUser, deleteUser, editUser, getAllUsers } from '../../services/userService';

import ModalUser from './ModalUser';
import './UserManage.scss'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isShowModal: false,
        }
    }

    getAllUserFromDB = async () => {
        let data = await getAllUsers("ALL");
        if(data?.users) {
            this.setState({
                arrUsers: data.users,
            })
        }
    }

    async componentDidMount() {
        await this.getAllUserFromDB();
    }

    toggleModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal,
        })
    }

    handleCreateNewUser = async (data) => {
        try {
            let response = await createNewUser(data);
            if(response?.data && response.data.errCode!==0) {
                alert(response.data.errMessage)
            } else {
                await this.getAllUserFromDB();
                this.setState({
                    isShowModal: false,    
                })
            }
        } catch(e) {
            console.log(e);
        }    
    }

    handleEditUser = async (id) => {
        try {
            let response = await editUser(id)
            if(response?.data && response.data.errCode!==0) {
                alert(response.data.errMessage)
            } else {
                await this.getAllUserFromDB();
                this.setState({
                    isShowModal: false,
                })
            }
        } catch(e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (id) => {
        try {
            let response = await deleteUser(id);
            if(response && response.errCode!==0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromDB();
            }
        } catch(e) {
            console.log(e);
        }
    }


    render() {
        return (
            <div className="users-container">
                <ModalUser 
                    isOpen={this.state.isShowModal}
                    toggleModal={this.toggleModal}
                    handleCreateNewUser={() => this.handleCreateNewUser}
                    handleEditUser={() => this.handleEditUser}
                />
                <div className="title text-center">
                    Manage users
                </div>
                <button 
                    className="btn btn-primary px-3 mx-3"
                    onClick={() => this.toggleModal()}
                >
                    <i className="fas fa-plus"></i>
                    <span>Add new user</span>
                </button>
                <div className="users-table mt-4 mx-3">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.arrUsers.length>0 && this.state.arrUsers.map(item => (
                                <tr key={item.id}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>
                                        <button 
                                            className="btn-edit"
                                            onClick={() => this.handleEditUser(item.id)}
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => this.handleDeleteUser(item.id)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
