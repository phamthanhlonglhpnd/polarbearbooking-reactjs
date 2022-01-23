import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
        
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ""
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data) {
                if(data.errCode !== 0) {
                    this.setState({
                        errMessage: data.message
                    })
                } else {
                    this.props.userLoginSuccess(data.user)
                }
            }
            
        } catch(e) {
            if(e.response?.data?.message) {
                this.setState({
                    errMessage: e.response.data.message
                })
            }
        }
    }

    handleLoginCode = (e) => {
        if(e.key==="Enter") {
            this.handleLogin();
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
                            <div style={{textAlign: 'center', fontSize: '18px'}} className="col-12">Login</div>
                            <div className="col-12">
                                <label>Username</label>
                                <input 
                                    type="text"
                                    className="login-input form-control" 
                                    placeholder="Enter your username"
                                    value={this.state.username}
                                    onChange={e => this.handleOnChangeUsername(e)}
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
                                        onChange={e => this.handleOnChangePassword(e)}
                                        onKeyDown = {(e) => this.handleLoginCode(e)}
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
                                    onClick = {() => this.handleLogin()}
                
                                >
                                    Login
                                </button>
                            </div>
                            <div className="col-12">
                                <span>Forgot password</span>
                            </div>
                            <div className="col-12">
                                <span className="login-options">Or Login With</span>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
