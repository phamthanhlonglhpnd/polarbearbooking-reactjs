import React, { Component} from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getDoctorForBooking, getIntroDoctor } from '../../../services/userService';
import * as actions from '../../../store/actions';
import {LANGUAGES, LanguageUtils} from '../../../utils';
import moment from 'moment';

class IntroDoctorForBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            intro: {},
        }
    }
    
    async componentDidMount() {
        if(this.props?.schedule.date && this.props?.schedule?.doctorId) {   
            await this.setInforDoctor(this.props.schedule.doctorId, this.props.schedule.date);
        }
    }

    setInforDoctor = async (id, date) => {
        let result = {};
        if(id) {
            let res = await getDoctorForBooking(id, date);
            if(res && res.data && res.errCode===0) {
                result = res.data
            }
        }
        this.setState({
            intro: result
        })
    }

    renderIntroDoctor = (intro) => {
        let {language, schedule} = this.props;
        let name = ''; let price = ''; let position = ''; let date=''; let time = '';
        if(intro && intro?.doctor?.firstName && intro?.doctor?.lastName && intro?.doctor?.positionData) {
            name = language===LANGUAGES.VI ? `${intro.doctor.firstName} ${intro.doctor.lastName}` : `${intro.doctor.lastName} ${intro.doctor.firstName}`;
            position = language===LANGUAGES.VI ? intro.doctor.positionData.valueVi : intro.doctor.positionData.valueEn;
        }
        if(intro && intro?.price?.priceData) {
            price = language===LANGUAGES.VI ? intro.price.priceData.valueVi + ' VND' : intro.price.priceData.valueEn + ' USD';
        }
        if(schedule && schedule.date && schedule.timeData) {
            time = language===LANGUAGES.VI ? schedule.timeData.valueVi : schedule.timeData.valueEn;
            let newDate = moment.unix(+schedule.date/1000).format('dddd - DD/MM/YYYY');
            let dateVI = newDate.charAt(0).toUpperCase() + newDate.slice(1);
            let dateEN = moment.unix(+schedule.date/1000).format('ddd - DD/MM/YYYY');
            date = language===LANGUAGES.VI ? dateVI : dateEN;
        }
        return (
            <>
                <div className="name">
                    <span className="title"><FormattedMessage id="menu.patient.title"/></span>
                    <span>{position} {name}</span>
                </div>
                <div className="date">
                    <span className="title"><FormattedMessage id="menu.patient.time"/></span>
                    <span>{time}, {date}</span>
                </div>
                <div className="price">
                    <span className="title"><FormattedMessage id="menu.patient.price"/></span>
                    <span>{price}</span>
                </div>
            </>
        )
    }

    componentDidUpdate(preProps) {
        if(preProps.schedule.doctorId!==this.props.schedule.doctorId || preProps.language!==this.props.language || preProps.schedule.date !== this.props.schedule.date) {
            this.setInforDoctor(this.props.schedule.doctorId, this.props.schedule.date);
        }
    }

    render() {
        let {intro} = this.state;
        
        return (
            <div className="container">
                {this.renderIntroDoctor(intro)}
            </div>                                          
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getIntroDoctorSuccess: (id) => dispatch(actions.getIntroDoctorSuccess(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroDoctorForBooking);