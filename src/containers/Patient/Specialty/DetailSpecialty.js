import React, { Component } from 'react';
import './DetailSpecialty.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailSpecialty, getDoctorsBySpecialty } from '../../../services/userService';
import { convertToImage } from '../../../components/Formating/GeneralClass';
import IntroDoctor from '../Doctor/IntroDoctor';
import DetailSchedule from '../Doctor/DetailSchedule';
import DetailClinic from '../Doctor/DetailClinic';
import { LANGUAGES } from '../../../utils';


class DetailSpeacialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialty: {},
            doctors: [],
            provinceArr: []
        }
    }

    async componentDidMount() {
        await this.props.fetchProvinceSuccess();
        if(this.props?.match?.params?.id) {
            let resSpecialty = await getDetailSpecialty(this.props.match.params.id);
            let resDoctors = await getDoctorsBySpecialty(this.props.match.params.id);
            this.setState({
                specialty: resSpecialty.specialty,
                doctors: resDoctors.doctors
            })
        }
        
    }

    componentDidUpdate(prevProps) {
        if(prevProps.provinces!==this.props.provinces || prevProps.language!==this.props.language) {
            let data = this.props.provinces;
            if(data && data.length>0) {
                data.unshift({
                    id: 100,
                    keyMap: 'ALL',
                    valueVi: 'Toàn quốc',
                    valueEn: 'ALL'
                })
            }
            this.setState({
                provinceArr: data
            })
        }
    }

    handleChangeProvince = async (e) => {
        if(this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = e.target.value;
            let res = await getDetailSpecialty(id, location);
            if(res.doctors!==this.state.doctors) {
                this.setState({
                    doctors: res.doctors
                })
            }
        }
        
    }

    render() {
        let {specialty, doctors, provinceArr} = this.state;
        let {language} = this.props
        return (
            <div className="specialty">
                <img
                    className="specialty-background" 
                    src={`${convertToImage(specialty.image)}`} alt="" 
                />
                <HomeHeader isShowBanner={false}/>
                
                    <div className="specialty-description container">
                        <div className="specialty-name">{specialty.name}</div>
                        <div           
                            dangerouslySetInnerHTML={{__html: specialty.descriptionHTML}}
                        >    
                        </div>
                    </div>

                    <div className="specialty-bottom">
                        <div className="specialty-container">
                            <select
                                onChange={(e) => this.handleChangeProvince(e)}
                                className="specialty-province">
                                {provinceArr && provinceArr.length>0 && provinceArr.map(item=> (
                                    <option 
                                        key={item.id}
                                        value={item.keyMap}
                                    >
                                        {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                ))}
                            </select>
                            {doctors && doctors.length>0 && doctors.map(doctor => (
                                <div className="specialty-doctor" key={doctor.doctorId}>
                                    <div className="specialty-doctor-content">
                                        <div className="specialty-doctor-left">
                                            <IntroDoctor id={doctor.doctorId}/>
                                            <DetailClinic param={doctor.doctorId} />
                                        </div>
                                        <div className="specialty-doctor-right">
                                            <DetailSchedule param={doctor.doctorId}/>
                                        </div>
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
        provinces: state.admin.provinces,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProvinceSuccess: () => dispatch(actions.fetchProvinceSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpeacialty);
