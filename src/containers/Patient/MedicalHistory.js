import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { convertTimeStampToDate } from '../../components/Formating/GeneralClass';
import { getMedicalHistory } from '../../services/userService';
import { LANGUAGES } from '../../utils';
import './MedicalHistory.scss';

class MedicalHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        let res = await getMedicalHistory(this.props.userInfo.id);
        if(res && res.errCode===0) {
            this.setState({
                data: res.history
            })
        }
    }


    render() {
        let {data} = this.state;
        let {language} = this.props;
        return (
            <div className="container" style={{paddingBottom: '389px'}}>
                <div className='title'>
                    <FormattedMessage id="menu.user.medical-history"/>
                </div>
                <table id="customers">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Reason</th>
                                <th>Doctor</th>
                                <th>Status</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistory);
