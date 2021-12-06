import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { connect } from 'react-redux';
import './BookingModal.scss'
import InforDoctorForBooking from './InforDoctorForBooking';
import * as actions from '../../../store/actions';
import Selected from 'react-select';
import {LANGUAGES} from '../../../utils';
import moment from 'moment';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            firstName:'',
            lastName: '',
            phonenumber: '',
            person: '',
            gender: [],
            selectedGender: '',
            email: '', 
            address: '', 
            reason: '',
            date: '',
            doctorId: '',
            doctorName: '',
            timeType: '',
            time: '', 
            language: ''
        }
    }

    async componentDidMount() {
        await this.props.fetchGenderStart();
        if(this.props.genders && this.props.genders.length>0) {
            let newGender = this.convertSelectedOption(this.props.genders);
            this.setState({
                gender: newGender
            })
        }
        if(this.props?.scheduleProp?.date) {
            this.setState({
                date: this.props.scheduleProp.date,
                doctorId: this.props.scheduleProp.doctorId,
                timeType: this.props.scheduleProp.timeType
            })
        }
    }

    renderTime = () => {
        let date=''; let time = ''
        let {language, scheduleProp} = this.props;
        if(scheduleProp && scheduleProp.date && scheduleProp.timeData) {
            time = language===LANGUAGES.VI ? scheduleProp.timeData.valueVi : scheduleProp.timeData.valueEn;
            let newDate = moment.unix(+scheduleProp.date/1000).format('dddd - DD/MM/YYYY');
            let dateVI = newDate.charAt(0).toUpperCase() + newDate.slice(1);
            let dateEN = moment.unix(+scheduleProp.date/1000).format('ddd - DD/MM/YYYY');
            date = language===LANGUAGES.VI ? dateVI : dateEN;
        }
        return `${time}, ${date}`
    }

    renderNameDoctor = () => {
        let name = '';
        let {language, scheduleProp} = this.props;
        if(scheduleProp && scheduleProp?.doctorData?.firstName && scheduleProp?.doctorData?.lastName) {
            name = language===LANGUAGES.VI ? `${scheduleProp.doctorData.firstName} ${scheduleProp.doctorData.lastName}` : `${scheduleProp.doctorData.lastName} ${scheduleProp.doctorData.firstName}`;
        }
        return name;
    }

    handleSubmitBooking = () => {
        this.props.toggleModal();
        let time = this.renderTime();
        let doctorName = this.renderNameDoctor();
        this.props.postPatientBookingSuccess({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            doctorName: doctorName,
            date: this.state.date,
            timeType: this.state.timeType,
            time: time,
            language: this.props.language
        });
        this.setState({
            firstName: '',
            lastName: '',
            phonenumber: '',
            person: '',
            gender: [],
            selectedGender: '',
            email: '', 
            address: '', 
            reason: '',
            date: '',
            doctorId: '',
            timeType: ''
        })
    }

    handleOnChangeInput = (key, e) => {
        let newState = {...this.state};
        newState[key] = e.target.value;
        this.setState({
            ...newState
        })
    }

    handleChangeGender = (selectedGender) => {
        this.setState({selectedGender});
    }

    convertSelectedOption = (itemArr) => {
        let newArr = [];
        let {language} = this.props;
        if(itemArr && itemArr.length>0) {
            newArr = itemArr.map(item => ({
                value: item.keyMap,
                label: language===LANGUAGES.VI ? item.valueVi : item.valueEn
            }));
        }
        return newArr
    }

    componentDidUpdate(prevProps) {
        if(prevProps.language!==this.props.language || prevProps.genders!==this.props.genders) {
            if(this.props.genders && this.props.genders.length>0) {
                let newGender = this.convertSelectedOption(this.props.genders);
                this.setState({
                    gender: newGender
                })
            }
        }
        if(prevProps.scheduleProp!==this.props.scheduleProp) {
            this.setState({
                date: this.props.scheduleProp.date,
                doctorId: this.props.scheduleProp.doctorId,
                timeType: this.props.scheduleProp.timeType
            })
        }
    }

    render() {
        let {firstName, lastName, phonenumber, person, gender, selectedGender, email, address, reason} = this.state;
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={this.props.toggleModal}
                centered
                fullscreen="lg"
                style={{maxWidth: '1000px', width: '100%'}}
            >
                <ModalHeader toggle={this.props.toggleModal}>
                    <InforDoctorForBooking schedule={this.props.scheduleProp}/>
                </ModalHeader>
                
                <ModalBody>
                    <div className="container">
                        <span
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: '700',
                                fontSize: '18px',
                                marginBottom: '40px'
                            }}
                        >
                            <FormattedMessage id="menu.patient.booking"/>
                        </span>
                        <div className="row">
                            <div className="col-4">
                                <label>
                                    <FormattedMessage id="menu.patient.firstName"/>
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={firstName} 
                                    placeholder="Fullname"
                                    onChange={(e) => this.handleOnChangeInput('firstName', e)}
                                />          
                            </div>
                            <div className="col-4">
                                <label>
                                    <FormattedMessage id="menu.patient.lastName"/>
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={lastName} 
                                    placeholder="Fullname"
                                    onChange={(e) => this.handleOnChangeInput('lastName', e)}
                                />          
                            </div>
                            <div className="col-4">
                                <label>
                                    <FormattedMessage id="menu.patient.phone"/>
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={phonenumber} 
                                    placeholder="Phone number"
                                    onChange={(e) => this.handleOnChangeInput('phonenumber', e)}
                                />          
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="menu.patient.option"/>
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={person} 
                                    placeholder="Person"
                                    onChange={(e) => this.handleOnChangeInput('person', e)}
                                />          
                            </div>
                            <div className="col-6">
                                <label style={{marginBottom: '10px'}}>
                                    <FormattedMessage id="menu.patient.gender"/>
                                </label>
                                <Selected 
                                    options={gender}
                                    value={selectedGender}
                                    onChange={this.handleChangeGender}
                                />         
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="menu.patient.email"/>
                                </label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={email} 
                                    placeholder="Email"
                                    onChange={(e) => this.handleOnChangeInput('email', e)}
                                />          
                            </div>
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="menu.patient.address"/>
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={address} 
                                    placeholder="Address"
                                    onChange={(e) => this.handleOnChangeInput('address', e)}
                                />          
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>
                                    <FormattedMessage id="menu.patient.reason"/>
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={reason} 
                                    placeholder="Reason"
                                    onChange={(e) => this.handleOnChangeInput('reason', e)}
                                />          
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="px-3"
                        color="primary"
                        onClick={() => this.handleSubmitBooking()}
                    >
                        <FormattedMessage id="menu.patient.confirm"/>
                    </Button>
                    {' '}
                    <Button 
                        onClick={this.props.toggleModal}
                        className="px-3"
                    >
                        <FormattedMessage id="menu.patient.cancel"/>
                    </Button>
                </ModalFooter>
            </Modal>    
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()), 
        postPatientBookingSuccess: (patient) => dispatch(actions.postPatientBookingSuccess(patient))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
