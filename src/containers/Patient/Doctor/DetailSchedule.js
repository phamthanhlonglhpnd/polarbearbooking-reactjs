import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSchedule.scss';
import {LANGUAGES} from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './BookingModal';
import { setDate } from '../../../components/Formating/GeneralClass';
// import * as actions from '../../../store/actions';

class DetailSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days: [],
            scheduleTime: [],
            scheduleProp: {},
            isShowModal: false
        }
    }

    async componentDidMount() {
        let {language} = this.props;
        let arrDate = setDate(language);
        let res = await getScheduleByDate(this.props.param, arrDate[0].value);
        this.setState({
            days: arrDate,
            scheduleTime: res.schedule
        })
        
    }

    componentDidUpdate(prevProps) {
        if(prevProps.language !== this.props.language) {
            let arrDate = setDate(this.props.language);
            this.setState({
                days: arrDate
            })
        }
    }

    handleChangeDate = async (e) => {
        let res = await getScheduleByDate(this.props.param, e.target.value);
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
 
    handleBooking = (time) => {
        this.toggleModal();
        this.setState({
            scheduleProp: time
        })
    } 

    toggleModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal,
        })
    }

    render() {
        let {days, scheduleTime} = this.state;
        let {language, param} = this.props;
        return (
            <>
                <div className="detailSchedule">
                    <div className="detailSchedule-date">
                        <select 
                            className="detailSchedule-select"
                            onChange={(e) => this.handleChangeDate(e)}
                        >
                            {days && days.length>0 && days.map((day, index) => (
                                <option value={day.value} key={index}>{day.lable}</option>
                            ))}
                        </select>
                        <div className="detailSchedule-calendar">
                            <i className="fas fa-calendar-alt"></i>
                            <span className="detailSchedule-title"><FormattedMessage id="menu.doctor.calendar"/></span>
                        </div>
                    </div>
                    <div className="detailSchedule-time">
                        {(scheduleTime && scheduleTime.length>0) ? 
                            scheduleTime.map(time => (
                            <button 
                                key={time.id}
                                className="btn detailSchedule-btn"
                                onClick={() => this.handleBooking(time)}
                            >
                                {language===LANGUAGES.VI ? time.timeData.valueVi : time.timeData.valueEn}
                                {time?.currentNumber=== time?.maxNumber ? <i class="fas fa-exclamation-triangle detailSchedule-warn"></i> : ''}
                            </button>
                        )) : (<FormattedMessage id="menu.doctor.no-schedule"/>)}
                    </div>
                    <div style={{marginBottom: '15px'}}>
                        <i class="fas fa-exclamation-triangle" style={{color: 'red', marginRight: '8px'}}></i> 
                        <FormattedMessage id="menu.doctor.warn"/>
                    </div>
                    <span>
                        <i style={{marginRight: '10px'}} className="far fa-hand-point-up"></i>
                        <FormattedMessage id="menu.doctor.option"/>
                    </span>
                </div>
                <BookingModal 
                    param={param}
                    scheduleProp={this.state.scheduleProp}
                    isOpen={this.state.isShowModal}
                    toggleModal={this.toggleModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSchedule);
