import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, ACTIONS, CommonUtils} from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss'
import UserTableManage from './UserTableManage';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            selectedImage: '',
            action: '',
            id: '',
            email: '',
            password: '',
            firstName: '', 
            lastName:'',
            gender: '',
            positionId: '',
            roleId: '',
            phonenumber: '',
            address: '',
            image: ''
        }
    }
    
    async componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
        
    }

    componentDidUpdate(prevProps) {
        if(prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders,
            })
        }
        if(prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: this.props.positions
            })
        }
        if(prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles
            })
        }
        
    }  

    handleChangeImg = async (e) => {
        let file = e.target.files[0];
        if(file) {
            let img = URL.createObjectURL(file);
            let fileBase64 = await CommonUtils.convertBase64(file);
            this.setState({
                selectedImage: img,
                image: fileBase64
            })
        }    
    }

    checkInput = () => {
        let flag = true;
        let arrInput = ["email", "password", "firstName", "lastName", "address", "phonenumber", "gender", "positionId", "roleId"];
        for(let i=0; i<arrInput.length; i++) {
            if(this.state[arrInput[i]]==="") {
                flag = false;
                break;
            }
        }
        return flag;
    }

    handleChangeInput = (key, e) => {
        let newState = {...this.state};
        newState[key] = e.target.value;
        this.setState({
            ...newState
        })
    }

    handleSave = () => {
        let check = this.checkInput();
        if(!check) {
            alert("Plz fill this field!")
        } else {
            if(this.state.action===ACTIONS.CREATE) {
                this.props.addNewUserSuccess(this.state);
            }
            if(this.state.action===ACTIONS.EDIT) {
                this.props.updateUserSuccess(this.state);
            }
            this.setState({
                email: '',
                password: '',
                firstName: '', 
                lastName:'',
                gender: '',
                positionId: '',
                roleId: '',
                phonenumber: '',
                address: '',
                image: '',
                selectedImage: '',
                action: ACTIONS.CREATE
            })
        }
    }

    handleUpdateFromParent = (userInfo) => {
        let imageBase64 = '';
        if(userInfo.image) {
            imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary');
        }
        this.setState({
            id: userInfo.id,
            email: userInfo.email,
            password: "HARDCODE",
            firstName: userInfo.firstName, 
            lastName:userInfo.lastName,
            gender: userInfo.gender,
            positionId: userInfo.positionId,
            roleId: userInfo.roleId,
            phonenumber: userInfo.phonenumber,
            address: userInfo.address,
            image: '',
            action: ACTIONS.EDIT,
            selectedImage: imageBase64
        })
    }

    render() {
        let {language} = this.props;
        let {email, password, firstName, lastName, gender, positionId, roleId, phonenumber, address} = this.state;
        return (
            <>
                <div className="text-center" >User Redux</div>
                <form className="container">
                    <div className="row">
                        <div className="form-group col-md-3">
                        <label htmlFor="inputEmail4">
                            <FormattedMessage id="system.user-manage.email"/>
                        </label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="inputEmail4" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => this.handleChangeInput('email', e)}
                            disabled={this.state.action===ACTIONS.EDIT ? true : false}
                        />
                        </div>
                        <div className="form-group col-md-3">
                        <label htmlFor="inputPassword4">
                            <FormattedMessage id="system.user-manage.password"/>
                        </label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="inputPassword4" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => this.handleChangeInput('password', e)}
                            disabled={this.state.action===ACTIONS.EDIT ? true : false}
                        />
                        </div>
                        <div className="form-group col-md-3">
                        <label htmlFor="inputFirstName">
                            <FormattedMessage id="system.user-manage.first-name"/>
                        </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputFirstName" 
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => this.handleChangeInput('firstName', e)}
                        />
                        </div>
                        <div className="form-group col-md-3">
                        <label htmlFor="inputLastName">
                            <FormattedMessage id="system.user-manage.last-name"/>
                        </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputLastName" 
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => this.handleChangeInput('lastName', e)}
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label htmlFor="inputPhonenumber">
                                <FormattedMessage id="system.user-manage.phone-number"/>
                            </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="inputPhoneNumber" 
                                placeholder="Phone Number"
                                value={phonenumber}
                                onChange={(e) => this.handleChangeInput('phonenumber', e)}
                            />
                        </div>
                        <div className="form-group col-md-9">
                            <label htmlFor="inputAddress">
                                <FormattedMessage id="system.user-manage.address"/>
                            </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="inputAddress" 
                                placeholder="Address"
                                value={address}
                                onChange={(e) => this.handleChangeInput('address', e)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label htmlFor="inputPosition">
                                <FormattedMessage id="system.user-manage.position"/>
                            </label>
                            <select 
                                id="inputPosition" 
                                className="form-control"
                                value={positionId}
                                onChange={(e) => this.handleChangeInput('positionId', e)}
                            >
                                <option defaultValue>Choose...</option>
                                {this.state.positionArr.length>0 && this.state.positionArr.map((item, index) => (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputGender">
                                <FormattedMessage id="system.user-manage.gender"/>
                            </label>
                            <select 
                                id="inputGender" 
                                className="form-control"
                                value={gender}
                                onChange={(e) => this.handleChangeInput('gender', e)}
                            >
                                <option defaultValue>Choose...</option>
                                {this.state.genderArr.length && this.state.genderArr.map((item, index) => (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputRoleID">
                                <FormattedMessage id="system.user-manage.role"/>
                            </label>
                            <select 
                                id="inputRole" 
                                className="form-control"
                                value={roleId}
                                onChange={(e) => this.handleChangeInput('roleId', e)}
                            >
                                <option defaultValue>Choose...</option>
                                {this.state.roleArr.length && this.state.roleArr.map((item, index) => (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputImage">
                                <FormattedMessage id="system.user-manage.image"/>
                            </label>
                            <div className="preview-content">
                                <input 
                                    type="file" 
                                    hidden 
                                    className="form-control" 
                                    id="inputImage"
                                    onChange={(e) => this.handleChangeImg(e)}
                                />
                                <label className="preview-btn" htmlFor="inputImage">Tải ảnh <i className="fas fa-upload"></i></label>
                                <div 
                                    className="preview-container"
                                    style={{backgroundImage: `url(${this.state.selectedImage})`}}
                                >
                                    {/* <img className="preview-image" src={this.state.selectedImage} alt=""/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        className={this.state.action===ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                        onClick={() => this.handleSave()}
                    >
                        <FormattedMessage id={this.state.action===ACTIONS.EDIT ? "system.user-manage.edit" : "system.user-manage.save"}/>
                    </button>
                </form>
                <UserTableManage handleUpdateFromParent = {this.handleUpdateFromParent}/>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        addNewUserSuccess: (userInfo) => dispatch(actions.addNewUserSuccess(userInfo)),
        getAllUsersSuccess: () => dispatch(actions.getAllUsersSuccess()),
        updateUserSuccess: (userInfo) => dispatch(actions.updateUserSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
