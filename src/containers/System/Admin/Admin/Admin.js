import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import './Admin.scss';
import { convertToImage, setDate } from '../../../../components/Formating/GeneralClass';
import { LANGUAGES } from '../../../../utils';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getAllBooking } from '../../../../services/userService';
import GoogleMapReact from 'google-map-react';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
           users: [],
           doctors: [],
           clinics: [],
           isShowDoctors: true,
           isMarkerShown: false,
           bookingData: []
        }
    }
    
    

    async componentDidMount() {
        await this.props.getAllUsersSuccess();
        await this.props.getTopDoctorHomeSuccess();
        await this.props.getHomeClinicSuccess();
        this.delayedShowMarker();
        let dates = [];
        [...setDate(this.props.language)].map(item => (
            dates.push(item.value)
        ))
        let bookingData = [];
        dates.map( async (date) => {
            let res = await getAllBooking(date);
            if(res && res.errCode===0) {
                bookingData.push(res.bookingData.length);
            }
            if(bookingData.length===7) {
                this.setState({
                    bookingData: bookingData
                })
            }
        })
        
    }

    componentDidUpdate(preProps) {
        if(preProps.topDoctorHome!==this.props.topDoctorHome || preProps.language!==this.props.language) {
            this.setState({
                doctors: this.props.topDoctorHome
            })
        }
        if(preProps.clinics!==this.props.clinics || preProps.language!==this.props.language) {
            this.setState({
                clinics: this.props.clinics
            })
        }
    }

    handleShow = () => {
        this.setState({
            isShowDoctors: !this.state.isShowDoctors
        })
    }
    
      delayedShowMarker = () => {
        setTimeout(() => {
          this.setState({ isMarkerShown: true })
        }, 3000)
      }
    
      handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
      }

    render() {
        const {doctors, isShowDoctors, clinics, bookingData} = this.state;
        const {language} = this.props;
        let timeData = [];
        [...setDate(language)].map(item => (
            timeData.push(item.lable)
        ))
        const data = {
            labels: timeData,
            datasets: [
            {
                label: 'Count',
                data: bookingData && bookingData.length>0 ? bookingData : [],
                fill: false,
                backgroundColor: 'red',
                borderColor: 'white',
            },
            ],
        }; 
        const options = {
            responsive: true,
            plugins: {
                legend: {
                position: 'top',
                },
                title: {
                display: true,
                text: 'Booking on all days',
                },
            },
        };

        const coordinates = { lat: 0, lng: 0 };
        return (
            <div className='admin'>
                <div className='admin-general'>
                    <div className='admin-general-item'>
                        <div style={{backgroundColor: '#3498DB', padding: '20px 30px', borderRadius: '10px', marginRight: '20px'}}>
                            <i className='admin-general-icon admin-general-icon fas fa-cog'></i>
                        </div>
                        <div>
                            CPU Traffic
                            <br/>
                            <span style={{fontWeight: '700'}}>10%</span>
                        </div>
                    </div>
                    <div className='admin-general-item'>
                        <div style={{backgroundColor: '#E74C3C', padding: '20px 30px', borderRadius: '10px', marginRight: '20px'}}>
                            <i className='admin-general-icon fas fa-thumbs-up'></i>
                        </div>
                        
                        <div>
                            Satification 
                            <br/>
                            <span style={{fontWeight: '700'}}>95%</span>%
                        </div>
                    </div>
                    <div className='admin-general-item'>
                        <div style={{backgroundColor: '#00BC8C', padding: '20px 30px', borderRadius: '10px', marginRight: '20px'}}>
                            <i className="admin-general-icon far fa-bookmark"></i>
                        </div>
                        
                        <div>
                            Booking
                            <br/>
                            <span style={{fontWeight: '700'}}>5000</span>
                        </div>
                    </div>
                    <div className='admin-general-item'>
                        <div style={{backgroundColor: '#F39C12', padding: '20px 30px', borderRadius: '10px', marginRight: '20px'}}>
                            <i className='admin-general-icon far fa-user'></i>
                        </div>
                        
                        <div>
                            Users
                            <br/>
                            <span style={{fontWeight: '700'}}>80000</span>
                        </div>
                    </div>
                </div>
                <div className='admin-doctor'>
                    {isShowDoctors && (
                        <div className='admin-doctor-item'>
                            <div className='admin-doctor-top'>
                                <span>All Doctors</span>
                                <div>
                                    <i className="fas fa-minus" style={{marginRight: '10px'}}></i>
                                    <i onClick={this.handleShow} className="fas fa-times"></i>
                                </div>
                            </div>
                            <div className='admin-doctor-bottom'>
                                {doctors && doctors.length>0 && doctors.map(doctor => (
                                    <div className='admin-doctor-item' key={doctor.id}>
                                        <img className='admin-doctor-avatar' src={`${convertToImage(doctor.image)}`}  alt=""/>
                                        <div>{language===LANGUAGES.VI ? doctor.positionData.valueVi : doctor.positionData.valueEn}</div>
                                        <div>{language===LANGUAGES.VI ? `${doctor.firstName} ${doctor.lastName}` : `${doctor.lastName} ${doctor.firstName}`}</div>
                                    </div>
                                ))}
                            </div>
                            <button className='admin-button' onClick={this.handleViewAllDoctor}>View All Doctors</button>
                        </div>
                    )}
                    
                </div>
                <div className='admin-clinic row'>
                    <div className='col-8'>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                            defaultCenter={coordinates}
                            defaultZoom={14}
                            center={coordinates}
                            margin={[50, 50, 50, 50]}
                            options={''}
                            onChange={''}
                            onChildClick={''}
                        >

                        </GoogleMapReact>
                    </div>
                    <div className='admin-clinic-list col-4'>
                        {clinics && clinics.length>0 && clinics.map(clinic => (
                            <div className='admin-clinic-item' key={clinic.id}>
                                <img className='admin-clinic-avatar' alt="" src={`${convertToImage(clinic.image)}`}/>
                                <div>
                                    <span style={{fontSize: '16px', marginBottom: '10px', fontWeight: 'bold'}}>{clinic.name}</span>
                                    <br/>
                                    <i className="admin-clinic-icon fas fa-location-arrow"></i>
                                    <span>{clinic.address}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='admin-booking'>
                     <div className='admin-booking-chart'>
                         <Line options={options} data={data}/>
                     </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath,
        language: state.app.language, 
        usersArr: state.admin.usersArr,
        topDoctorHome: state.admin.topDoctorHome,
        clinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersSuccess: () => dispatch(actions.getAllUsersSuccess()),
        getTopDoctorHomeSuccess: () => dispatch(actions.getTopDoctorHomeSuccess()),
        getHomeClinicSuccess: () => dispatch(actions.getHomeClinicSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
