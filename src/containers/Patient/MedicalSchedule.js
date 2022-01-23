import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { convertTimeStampToDate } from '../../components/Formating/GeneralClass';
import { cancelBooking, getMedicalBooking } from '../../services/userService';
import { LANGUAGES } from '../../utils';
import './MedicalSchedule.scss';

class MedicalSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        let res = await getMedicalBooking(this.props.userInfo.id);
        if(res && res.errCode===0) {
            this.setState({
                data: res.history
            })
        }
    }

    componentDidUpdate(preProps) {

    }

    handleCancelBooking = async (item) => {
        let res = await cancelBooking(item);
        if(res && res.errCode===0) {
            toast.success('Cancel success!')
        }
        let dataBooking =  await getMedicalBooking(this.props.userInfo.id);
        if(dataBooking && dataBooking.errCode===0) {
            this.setState({
                data: dataBooking.history
            })
        }
    }
    render() {
        let {data} = this.state;
        let {language} = this.props;
        return (
            <div className="container" style={{paddingBottom: '370px'}}>
                <div className='title'>
                    <FormattedMessage id="menu.user.medical-examination-schedule"/>
                </div>
                <table id="customers">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Reason</th>
                                <th>Doctor</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data && data.length>0) ? data.map(item => (
                                <tr key={item.id}>
                                    <td>{language===LANGUAGES.VI ? item.timeDatas.valueVi : item.timeDatas.valueEn}</td>
                                    <td>{convertTimeStampToDate(item.date)}</td>
                                    <td>{item.reason}</td>
                                    <td>{language===LANGUAGES.VI ? `${item.doctor.firstName} ${item.doctor.lastName}` : `${item.doctor.lastName} ${item.doctor.firstName}`}</td>
                                    <td>{language===LANGUAGES.VI ? item.status.valueVi : item.status.valueEn}</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => this.handleCancelBooking(item)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            )) : <tr>
                                    <td style={{textAlign: 'center', color: 'white'}} colSpan="6">No data</td>
                                </tr>}
                        </tbody>
                </table>
            </div>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalSchedule);
