import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, userMenu } from './menuApp';
import {LANGUAGES, USER_ROLE} from '../../utils';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import logo from '../../assets/images/HomeHeader/logo.jpg';
import { Link } from 'react-router-dom';
import UserManage from '../System/UserManage';
import UserRedux from '../System/Admin/ManageUser/UserRedux';
import ManageDoctor from '../System/Admin/ManageDoctor/ManageDoctor';
import MangeSpecialty from '../System/Admin/ManageSpecialty/ManageSpecialty';
import ManageClinic from '../System/Admin/ManageClinic/ManageClinic';
import Admin from '../System/Admin/Admin/Admin';
import ManageSchedule from '../System/Doctor/ManageSchedule';
import ManagePatient from '../System/Doctor/ManagePatient';
import MedicalHistory from '../Patient/MedicalHistory';
import MedicalSchedule from '../Patient/MedicalSchedule';
import PersonInfor from '../Patient/PersonInfor';
import ManageHandbook from '../System/Admin/ManageHandbook/ManageHandbook';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    
    changeLanguage = (language) => {
        this.props.appChangeLanguage(language);
    }

    componentDidMount() {
        let {userInfo} = this.props;
        let menu = [];
        if(userInfo && userInfo?.roleId) {
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if(role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
            if(role === USER_ROLE.PATIENT) {
                menu = userMenu;
            }
        }
    this.setState({
            menuApp: menu
        })
    }

    handleLogout = () => {
        this.props.processLogout();
    }

    render() {
        const { language, userInfo,  systemMenuPath} = this.props;
        return (
            <>
                <div className="header">
                    {/* thanh navigator */}
                    <Link to='/home' className="header-left">
                        {/* <Navigator menus={this.state.menuApp} /> */}
                        <img src={logo} alt="" className='header-logo'/>
                        <span className='header-brand'>Polarbear Booking</span>
                    </Link>
                    <div className="header-right">
                        <div className='header-right-left'>
                            <i className=' fas fa-bars'></i>
                            <Link to='/home'>Home</Link>
                            <Link to='/'>Contact</Link>
                        </div>
                        <div className='header-right-right'>
                            <span className="header-account">
                                <FormattedMessage id="homeheader.welcome"/> {userInfo && userInfo.lastName ? userInfo.lastName : ""}!
                            </span>
                            <i className=" far fa-bell"></i>
                            <span 
                                className={language === LANGUAGES.VI ? "header-language-VI header-active" : "header-language-VI"}
                                onClick={() => this.changeLanguage(LANGUAGES.VI)}
                            >
                                VN
                            </span>
                            <span 
                                className={language === LANGUAGES.EN ? "header-language-EN header-active" : "header-language-EN"}
                                onClick={() => this.changeLanguage(LANGUAGES.EN)}
                            >
                                EN
                            </span>
                            <div className="btn btn-logout" onClick={() => this.handleLogout()} title="Logout">
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        </div>
                    </div>    
                </div>
                <div className='body'>
                    <div className='body-left'>
                        <Navigator menus={this.state.menuApp}/>
                    </div>
                    <div className='body-right'>
                        <Switch>
                            <Route path="/system/admin" component={Admin} />
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={MangeSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinic}/>
                            <Route path="/system/manage-handbook" component={ManageHandbook}/>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule}/>
                            <Route path="/doctor/manage-patient" component={ManagePatient}/>
                            <Route path="/user/medical-history" component={MedicalHistory}/>
                            <Route path="/user/medical-examination-schedule" component={MedicalSchedule}/>
                            <Route path="/user/person-information" component={PersonInfor}/>
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath,
        language: state.app.language, 
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        appChangeLanguage: (language) => dispatch(actions.appChangeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
