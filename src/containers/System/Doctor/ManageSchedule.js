import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import './ManageSchedule.scss'
import { toast } from 'react-toastify';
import {bulkCreateSchedule, deleteScheduleByDate, getScheduleByDate} from '../../../services/userService';
import { setDate } from '../../../components/Formating/GeneralClass';

class System extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            selectedOption: '',
            doctorArr: [],
            currentDate: '',
            times: [],
            days: [],
            scheduleTime: []
        }
    }

    async componentDidMount() {
        let {language, userInfo} = this.props;
        let arrDate = setDate(language);
        let res = await getScheduleByDate(userInfo.id, arrDate[0].value);
        if(res && res.errCode===0) {
            this.setState({
                days: arrDate,
                scheduleTime: res.schedule
            })
        }
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
        if(prevProps.language !== this.props.language) {
            let arrDate = setDate(this.props.language);
            this.setState({
                days: arrDate
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
        let formatDate = new Date(currentDate).getTime();
        let schedule = times.filter(time => time.isActive===true);
        let doctorId = this.props.userInfo.id;
        let finalArr = schedule.map(item => ({
            doctorId: selectedOption.value || doctorId,
            date: formatDate,
            timeType: item.keyMap
        }))
        let res = await bulkCreateSchedule({
            arrSchedule: finalArr,
            doctorId: selectedOption.value || doctorId,
            date: formatDate
        });
        if(res && res.errCode===0) {
            toast.success('Lưu thành công!');
        } else {
            toast.error('Lưu thất bại!');
        }

        let newState = {...this.state};
        newState.times.map(item => {
            return item.isActive = false;
        })

        this.setState({
            currentDate: '',
            selectedOption: '',
            ...newState
        })
    }

    handleGetScheduleByDate = async (e) => {
        let res = await getScheduleByDate(this.props.userInfo.id, e.target.value);
        if(res && res.errCode===0 && res.schedule && res.schedule.length>0) {
            this.setState({
                scheduleTime: res.schedule
            })
        } else {
            this.setState({
                scheduleTime: []
            })
        }
    }

    handleDeleteSchedule = async (item) => {
        let res = await deleteScheduleByDate(item.doctorId, item.date, item.timeType);
        if(res && res.errCode===0) {
            toast.success('Delete success!')
        };
        let {userInfo} = this.props;
        let time = await getScheduleByDate(userInfo.id, this.state.days);
        if(time && time.errCode===0) {
            this.setState({
                scheduleTime: time.schedule
            })
        }
    }

    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        let {times, days, scheduleTime} = this.state;
        let {language} = this.props;
        
        return (
            <div className="schedule">
                <div className="title">
                    <FormattedMessage id="menu.doctor.manage-schedule"/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <label className='choose-title'><FormattedMessage id="menu.doctor.choose-date"/></label> <br/>
                            <DatePicker 
                                className="schedule-select form-control"
                                onChange={this.handleChangeDate}
                                value={this.state.currentDate}
                                minDate = {yesterday}
                            />
                        </div>
                    </div>
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
                    <button 
                        className="btn btn-primary"
                        onClick = {() => this.handleSaveSchedule()}
                    >
                        <FormattedMessage id="menu.doctor.save"/>
                    </button>
                    <div className='schedule-list'>
                        <label className='choose-title'><FormattedMessage id="menu.doctor.calendar"/></label>
                        <select 
                            className="schedule-list-select"
                            onChange={(e) => this.handleGetScheduleByDate(e)}
                        >
                            {days && days.length>0 && days.map((day, index) => (
                                <option value={day.value} key={index}>{day.lable}</option>
                            ))}
                        </select>
                        <div className="detailSchedule-time">
                            {(scheduleTime && scheduleTime.length>0) ? 
                                scheduleTime.map(time => (
                                <button 
                                    key={time.id}
                                    className="btn detailSchedule-btn"
                                    onClick={() => this.handleDeleteSchedule(time)}
                                >
                                    {language===LANGUAGES.VI ? time.timeData.valueVi : time.timeData.valueEn}
                                </button>
                            )) : (<div style={{color: 'white', marginTop: '30px'}}><FormattedMessage id="menu.doctor.no-schedule"/></div>)}
                        </div>
                    </div>
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
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsSuccess: () => dispatch(actions.getAllDoctorsSuccess()),
        getScheduleHoursSuccess: () => dispatch(actions.getScheduleHoursSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
