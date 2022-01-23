import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { CommonUtils, LANGUAGES } from '../../utils';
import * as actions from '../../store/actions'
import './PersonInfor.scss';
import { getPatientInformation, updateInformation } from '../../services/userService';
import { toast } from 'react-toastify';
import { convertToImage } from '../../components/Formating/GeneralClass';

class PersonInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            selectedImage: '',
            email: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            image: '',
            gender: '',
            id: '',
            defaultGender: ''
        }
    }
    
    async componentDidMount() {
        await this.props.fetchGenderStart();
        await this.getInfor();
    }

    getInfor = async () => {
        let {language} = this.props;
        let res = await getPatientInformation(this.props.userInfo.id);
        if(res && res.errCode===0) {
            let data = res.infor;
            let image = convertToImage(data.image)
            this.setState({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                phonenumber: data.phonenumber,
                address: data.address,
                selectedImage: image,
                defaultGender: (data?.genderData?.valueVi && data?.genderData?.valueEn) ? (language===LANGUAGES.VI ? data.genderData.valueVi : data.genderData.valueEn) : 'Choose...',
                id: data.id
            })
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders,
            })
        };
    }

    handleChangeInput = (key, e) => {
        let newState = {...this.state};
        newState[key] = e.target.value;
        this.setState({
            ...newState
        })
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

    handleUpdateInformation = async () => {
        let res = await updateInformation(this.state);
        if(res && res.errCode===0) {
            toast.success('Update information success')
        } else {
            toast.warn("Update information fail!")
        }
    }

    render() {
        let {language} = this.props;
        let {email, firstName, lastName, gender, address, phonenumber, selectedImage, defaultGender} = this.state;
        return (
            <div className='personInfo'>
                <div className="title" >Information</div>
                <form className="container">
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="inputEmail4">
                                <FormattedMessage id="system.user-manage.email"/>
                            </label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="inputEmail4" 
                                placeholder="Email"
                                value={email}
                                disabled
                            />
                        </div>
                        <div className="col-4">
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
                        <div className="col-4">
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
                            <label htmlFor="inputGender">
                                <FormattedMessage id="system.user-manage.gender"/>
                            </label>
                            <select 
                                id="inputGender" 
                                className="form-control"
                                value={gender}
                                onChange={(e) => this.handleChangeInput('gender', e)}
                            >
                                <option defaultValue>{defaultGender}</option>
                                {this.state.genderArr.length && this.state.genderArr.map((item, index) => (
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
                                    style={{backgroundImage: `url(${selectedImage})`}}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => this.handleUpdateInformation()}
                    >
                        <FormattedMessage id="system.user-manage.edit"/>
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        updateUserSuccess: (userInfo) => dispatch(actions.updateUserSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonInfor);
