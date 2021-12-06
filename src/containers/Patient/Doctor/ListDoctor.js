import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import {LANGUAGES, USER_ROLE} from '../../../utils';
import './ListDoctor.scss';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader'
import { convertToImage } from '../../../components/Formating/GeneralClass';

class ListDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctor: []
        }
    }

    async componentDidMount() {
        await this.props.getTopDoctorHomeSuccess();
    }

    handleChange = (e) => {

    }

    componentDidUpdate(prevProps) {
        if(prevProps.topDoctorHome!==this.props.topDoctorHome || prevProps.language!==this.props.language) {
            this.setState({
                listDoctor: this.props.topDoctorHome
            })
        }
    }

    render() {
        let {language} = this.props;
        let {listDoctor} = this.state;
        
        return (
            <div>
                <HomeHeader isShowBanner={false}/>
                <div className="listDoctor">
                    <div className="listDoctor-top">
                        <div className="listDoctor-search container">
                            <div className="listDoctor-title">Bac si noi bat</div>
                            <input 
                                className="form-control"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="listDoctor-bottom container">
                        <div className="listDoctor-result">Ket qua tim kiem</div>
                        {listDoctor && listDoctor.length>0 && listDoctor.map(doctor => (
                            <div className="listDoctor-item" key={doctor.id}>
                                <img className="listDoctor-avatar" src={`${convertToImage(doctor.image)}`} alt='' />
                                <div className="listDoctor-infor">
                                    <div className="listDoctor-name">
                                        <span>{language===LANGUAGES.VI ? doctor.positionData.valueVi : doctor.positionData.valueEn} </span>
                                        <span>{language===LANGUAGES.VI ? `${doctor.firstName} ${doctor.lastName}` : `${doctor.lastName} ${doctor.firstName}`}</span>
                                    </div>
                                    <div className="listDoctor-specialty">{doctor.Doctor_Infor.specialty.name}</div>
                                </div>
                            </div>
                        ))}
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
        topDoctorHome: state.admin.topDoctorHome
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctorHomeSuccess: () => dispatch(actions.getTopDoctorHomeSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctor);
