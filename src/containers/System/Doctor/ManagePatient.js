import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import {LANGUAGES, USER_ROLE} from '../../../utils';
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getPatients, sendPrescription } from '../../../services/userService';
import ConfirmModal from './ConfirmModal';
import { toast } from 'react-toastify';
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).add(0, 'days').startOf('day').valueOf(),
            patients: [],
            isShowModal: false,
            patientData: {}
        }
    }

    async componentDidMount() {
        await this.getPatientData();
    }

    getPatientData = async () => {
        let {currentDate} = this.state
        let formatDate = new Date(currentDate).getTime();
        let doctorId = this.props.userInfo.id;
            if(formatDate) {
                let res = await getPatients(doctorId, formatDate);
                if(res && res.errCode===0) {
                    this.setState({
                        patients: res.patients
                    })
                } else {
                    this.setState({
                        patients: []
                    })
                }
            } else {
                this.setState({
                    patients: []
                })
            }
    }

    handleChangeDate = async (date) => {
        if(date && this.props.userInfo.id) {
            this.setState({
                currentDate: date[0]
            }, async () => {
                await this.getPatientData();
            })
        }
    }

    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patients.email,
            timeType: item.timeType,
            firstName: item.patients.firstName,
            lastName: item.patients.lastName
        }
        this.setState({
            patientData: data,
            isShowModal: true
        })
    }

    toggleModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal,
        })
    }

    sendPrescription = async (data) => {
        let {patientData} = this.state;
        let res = await sendPrescription({
            email: data.email,
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            image: data.image,
            doctorId: patientData.doctorId,
            patientId: patientData.patientId,
            timeType: patientData.timeType,
            language: this.props.language
        });
        if(res && res.errCode===0) {
            toast.success('Confirm success!');
            await this.getPatientData();
        } else {
            toast.warn('Confirm fail!');
        }
    }

    render() {
        let {language} = this.props;
        let {patientData, isShowModal} = this.state;
        
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        let {patients, currentDate} = this.state; 
        return (
            <div style={{paddingBottom: '309px'}}>
                <div className="title">
                    <FormattedMessage id="menu.doctor.manage-patient"/>
                </div>
                <div className="container">
                    <div className="choose-title">
                        <span><FormattedMessage id="menu.doctor.choose-date"/></span>
                        <DatePicker
                            className="schedule-select form-control"
                            onChange={this.handleChangeDate}
                            value={currentDate}
                            minDate = {yesterday}
                        />
                    </div>
                    <div className="patient">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Time</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(patients && patients.length) ? patients.map((patient, index) => (
                                <tr key={patient.id}>
                                    <td>{index+1}</td>
                                    <td>
                                        {language===LANGUAGES.VI ? patient.timeDatas.valueVi : patient.timeDatas.valueEn}
                                    </td>
                                    <td>
                                        {language===LANGUAGES.VI ? `${patient.patients.firstName} ${patient.patients.lastName}` : `${patient.patients.lastName} ${patient.patients.firstName}`}
                                    </td>
                                    <td>
                                        {language===LANGUAGES.VI ? patient.patients.genderData.valueVi : patient.patients.genderData.valueEn}
                                    </td>
                                    <td>{patient.patients.phonenumber}</td>
                                    <td>{patient.patients.email}</td>
                                    <td>{patient.patients.address}</td>
                                    <td>
                                        <button 
                                            className="glow-on-hover"
                                            onClick={() => this.handleConfirm(patient)}
                                        >
                                            Confirm
                                        </button>
                                    </td>
                                </tr>
                            )) : <tr>
                                    <td colSpan="8" style={{textAlign: 'center'}}>No data</td>
                                </tr>}
                        </tbody>
                </table>
                    </div>
                </div>
                <ConfirmModal 
                    patientData={patientData} 
                    isShowModal={isShowModal}
                    toggleModal={this.toggleModal}
                    sendPrescription={this.sendPrescription}
                />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language, 
        patients: state.admin.patients,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientsSuccess: (doctorId, date) => dispatch(actions.getPatientsSuccess(doctorId, date))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
