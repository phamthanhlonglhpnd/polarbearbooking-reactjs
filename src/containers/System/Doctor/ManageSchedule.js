import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import './ManageSchedule.scss'
import { toast } from 'react-toastify';
import {bulkCreateSchedule} from '../../../services/userService';
import moment from 'moment';

class System extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            selectedOption: '',
            doctorArr: [],
            currentDate: '',
            times: [],
        }
    }

    async componentDidMount() {
        await this.props.getAllDoctorsSuccess();
        await this.props.getScheduleHoursSuccess();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.doctors !== this.props.doctors || prevProps.language !== this.props.language || prevProps.times !== this.props.times) {
            let doctorSelect = this.convertOption(this.props.doctors);
            let data = this.props.times;
            if(data && data.length>0) {
                data = data.map(item => ({...item, isActive: false}));
            }
            this.setState({
                doctorArr: doctorSelect,
                times: data
            })
        }
        
    }

    convertOption = (doctorArr) => {
        let newDoctorArr = [];
        let {language} = this.props;
        if(doctorArr && doctorArr.length>0) {
            newDoctorArr = doctorArr.map(item => ({
                value: item.id,
                label: language===LANGUAGES.VI ? `${item.firstName} ${item.lastName}` : `${item.lastName} ${item.firstName}`
            }));
        }
        return newDoctorArr;
    }

    handleChangeDoctor = (selectedOption) => {
        this.setState({selectedOption});
    };

    handleChangeDate = (date) => {
        if(date) {
            this.setState({
                currentDate: date[0]
            })
        }
    }

    handleActive = (item) => {
        let {times} = this.state;
        if(times && times.length>0) {
            times = times.map(time => {
                if(time.id===item.id) {
                    time.isActive = !time.isActive;
                }
                return time;
            })
        }
        this.setState({
            times: times
        })  
    }

    handleSaveSchedule = async () => {
        let {times, selectedOption, currentDate} = this.state;
        if(!currentDate) {
            toast.error('Plz choose date!');
            return;
        };
        if(!selectedOption) {
            toast.error('Plz choose doctor!');
            return;
        }
        //Object.fromEntries(Object.entries(item).slice(3, 5))
        let formatDate = new Date(currentDate).getTime();
        let schedule = times.filter(time => time.isActive===true)
        let finalArr = schedule.map(item => ({
            doctorId: selectedOption.value,
            date: formatDate,
            timeType: item.keyMap
        }))
        let res = await bulkCreateSchedule({
            arrSchedule: finalArr,
            doctorId: selectedOption.value,
            date: formatDate
        });
        if(res && res.errCode===0) {
            toast.success('Lưu thành công!');
        } else {
            toast.error('Lưu thất bại!');
        }
        
    }

    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        let {times} = this.state;
        let {language} = this.props;
        return (
            <div className="schedule">
                <div className="schedule-title">
                    <FormattedMessage id="menu.doctor.manage-schedule"/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <label><FormattedMessage id="menu.doctor.choose-doctor"/></label>
                            <Select
                                className="schedule-select"
                                value={this.state.selectedOption}
                                onChange={this.handleChangeDoctor}
                                options={this.state.doctorArr}
                            />
                        </div>
                        <div className="col-6">
                            <label><FormattedMessage id="menu.doctor.choose-date"/></label> <br/>
                            <DatePicker 
                                className="schedule-select form-control"
                                onChange={this.handleChangeDate}
                                value={this.state.currentDate}
                                minDate = {yesterday}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="schedule-date">
                            {times && times.length>0 && times.map((item) => (
                                <button 
                                    className={item.isActive ? "btn schedule-btn schedule-active": "btn schedule-btn"} 
                                    key={item.id}
                                    onClick={() => this.handleActive(item)}
                                >
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button 
                        className="btn btn-primary"
                        onClick = {this.handleSaveSchedule}
                    >
                        <FormattedMessage id="menu.doctor.save"/>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctors: state.admin.doctors,
        times: state.admin.times,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsSuccess: () => dispatch(actions.getAllDoctorsSuccess()),
        getScheduleHoursSuccess: () => dispatch(actions.getScheduleHoursSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
