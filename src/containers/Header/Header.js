import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import {LANGUAGES, USER_ROLE} from '../../utils';
import './Header.scss';
import { FormattedMessage } from 'react-intl';

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
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header">
                {/* thanh navigator */}
                <div className="header-left">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="header-right">
                    <span className="header-account">
                        <FormattedMessage id="homeheader.welcome"/> {userInfo && userInfo.lastName ? userInfo.lastName : ""}!
                    </span>
                    <div className="header-language">
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
                    </div>
                    <div className="btn btn-logout" onClick={processLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
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
