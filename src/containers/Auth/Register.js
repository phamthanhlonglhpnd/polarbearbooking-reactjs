import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { handleSignUp } from '../../services/userService';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            firstName: '',
            lastName: '',
            errMessage: ''
        }
        
    }

    handleChangeInput = (e, key) => {
        let newState = {...this.state};
        newState[key] = e.target.value;
        this.setState({
            ...newState
        })
    }

    handleRegister = async () => {
        this.setState({
            errMessage: ""
        })
        try {
            let data = await handleSignUp({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            });
            if(data) {
                if(data.errCode !== 0) {
                    this.setState({
                        errMessage: data.message
                    })
                } else {
                    this.props.userRegisterSuccess(data.userData)
                }
            }
            
        } catch(e) {
            console.log(e);
        }
    }

    handleRegisterCode = (e) => {
        if(e.key==="Enter") {
            this.handleRegister();
        }
    }

    handleShowPassWord = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        
        return (
            <div className="more-snow">
                <div className="login">
                    <div className="login-container">
                        <div className="login-content row">
                            <div style={{textAlign: 'center', fontSize: '18px'}} className="col-12">Register</div>
                            <div className="col-12">
                                <label>First Name</label>
                                <input 
                                    type="text"
                                    className="login-input form-control" 
                                    placeholder="Enter your first name"
                                    value={this.state.firstName}
                                    onChange={e => this.handleChangeInput(e, 'firstName')}
                                />
                            </div>
                            <div className="col-12">
                                <label>Last Name</label>
                                <div className="login-password">
                                    <input 
                                        type='text'
                                        className="login-input form-control" 
                                        placeholder="Enter your last name"
                                        value={this.state.lastName}
                                        onChange={e => this.handleChangeInput(e, 'lastName')}
                                    />
                                </div>
                            </div>
                            <div className="col-12" style={{color: "red"}}>
                                    {this.state.errMessage}
                            </div>
                        </div>
                        <div className="login-content row">
                            <div className="col-12">
                                <label>Email</label>
                                <input 
                                    type="text"
                                    className="login-input form-control" 
                                    placeholder="Enter your email"
                                    value={this.state.email}
                                    onChange={e => this.handleChangeInput(e, 'email')}
                                />
                            </div>
                            <div className="col-12">
                                <label>Password</label>
                                <div className="login-password">
                                    <input 
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className="login-input form-control" 
                                        placeholder="Enter your password"
                                        value={this.state.password}
                                        onChange={e => this.handleChangeInput(e, 'password')}
                                        onKeyDown = {(e) => this.handleRegisterCode(e)}
                                    />
                                    {
                                        this.state.isShowPassword ? 
                                            (<i onClick={() => this.handleShowPassWord()} className="fas fa-eye"></i>) : 
                                            (<i onClick={() => this.handleShowPassWord()} className="fas fa-eye-slash"></i>)
                                    }
                                    
                                </div>
                            </div>
                            <div className="col-12" style={{color: "red"}}>
                                    {this.state.errMessage}
                            </div>
                            <div className="col-12">
                                <button 
                                    className="login-btn"
                                    onClick = {() => this.handleRegister()}
                
                                >
                                    Register
                                </button>
                            </div>
                            <div className="col-12">
                                <span className="login-options">Or Register With</span>
                            </div>
                            <div className="col-12 text-center">
                                <i className="fab fa-facebook"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-google-plus"></i>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userRegisterFail: () => dispatch(actions.userRegisterFail()),
        userRegisterSuccess: (userInfo) => dispatch(actions.userRegisterSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
