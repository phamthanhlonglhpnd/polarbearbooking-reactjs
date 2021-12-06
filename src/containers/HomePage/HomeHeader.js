import React, { Component } from 'react';
import './HomeHeader.scss';
import { connect } from 'react-redux';
import img1 from '../../assets/images/HomeHeader/kham_chuyenkhoa.png';
import img2 from '../../assets/images/HomeHeader/kham_tuxa.png';
import img3 from '../../assets/images/HomeHeader/kham_tongquat.png';
import img4 from '../../assets/images/HomeHeader/dichvu_xetnghiem.png';
import img5 from '../../assets/images/HomeHeader/suckhoe_tinhthan.png'; 
import img6 from '../../assets/images/HomeHeader/kham_nhakhoa.png';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../store/actions';
import {LANGUAGES} from '../../utils';
import {Link} from 'react-router-dom';
import { convert, convertObject} from '../../components/Formating/GeneralClass';
import Select from 'react-select';
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        // borderBottom: '1px dotted pink',
        // color: state.isSelected ? 'red' : 'blue',
      }),
      control: () => ({
        width: 460,
        margin: 0
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
      }
  }

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            listSpecialty: [],
            selectedSpecialty: ''
        }
    }

    async componentDidMount() {
        await this.props.getGeneralSpecialtySuccess();
    }

    componentDidUpdate(preProps) {
        if(preProps.generalSpecialties!==this.props.generalSpecialties) {
            let selectedSpecialty = convertObject(this.props.generalSpecialties, 'id', 'name', 'SPECIALTY', this.props.language);
            let listSpecialty = convert(this.props.generalSpecialties, 'SPECIALTY', this.props.language)
            this.setState({
                selectedSpecialty: selectedSpecialty,
                listSpecialty: listSpecialty
            })
        }
    }

    handleChangeLanguage = (language) => {
        this.props.appChangeLanguage(language);
    }

    handleChangeSelect = (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        }) 
    }

    render() {
        let {language} = this.props;
        let {listSpecialty, selectedSpecialty} = this.state;
        
        return (
            <>
                <div className="home-header">
                    <div className="home-header-content">
                        <div className="home-header-left">
                            
                                <i className="fas fa-bars"></i>
                                <Link to='/home' className="home-header-logo">
                                    PolarbearCare
                                </Link>
                            
                        </div>
                        <div className="home-header-center">
                            <div className="home-header-option">
                                <span className="home-header-name">
                                    <FormattedMessage id="homeheader.medical-specialty"/>
                                </span>
                                <div className="home-header-detail">
                                    <FormattedMessage id="homeheader.search-doctor"/>
                                </div>
                            </div>
                            <div className="home-header-option">
                                <span className="home-header-name">
                                    <FormattedMessage id="homeheader.health-facility"/>
                                </span>
                                <div className="home-header-detail">
                                    <FormattedMessage id="homeheader.select-facility"/>
                                </div>
                            </div>
                            <Link to='/search-doctor/' className="home-header-option">
                                <span className="home-header-name">
                                    <FormattedMessage id="homeheader.doctor"/>
                                </span>
                                <div className="home-header-detail">
                                    <FormattedMessage id="homeheader.select-doctor"/>
                                </div>
                            </Link>
                            <div className="home-header-option">
                                <span className="home-header-name">
                                    <FormattedMessage id="homeheader.health-package"/>
                                </span>
                                <div className="home-header-detail">
                                    <FormattedMessage id="homeheader.select-package"/>
                                </div>
                            </div>
                        </div>
                        <div className="home-header-right">
                            <div className="home-header-question">?</div>
                            <div className="home-header-support">
                                <FormattedMessage id="homeheader.support"/>
                            </div>
                            <div className="home-header-language">
                                <span 
                                    className={language===LANGUAGES.VI ? "home-header-language-VI active": "home-header-language-VI"}
                                    onClick={() => {this.handleChangeLanguage(LANGUAGES.VI)}}
                                >
                                    VN
                                </span>
                                <span 
                                    className={language===LANGUAGES.EN ? "home-header-language-EN active": "home-header-language-EN"}
                                    onClick={() => {this.handleChangeLanguage(LANGUAGES.EN)}}
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner &&
                <div className="banner">
                    <div className="banner-content">
                        <h1 className="banner-title">
                            <FormattedMessage id="banner.title1"/>
                            <br/>
                            <b><FormattedMessage id="banner.title2"/></b>
                        </h1>
                        <div className="banner-search">
                            <div className="banner-search-write">
                                <i className="fas fa-search banner-search-icon"></i>
                                <Select
                                    placeholder="Search"
                                    className="banner-search-input"
                                    value={selectedSpecialty}
                                    name="selectedSpecialty"
                                    onChange={this.handleChangeSelect}
                                    options={listSpecialty}
                                    styles={customStyles}
                                />
                            </div>
                        </div>
                        <div className="banner-service">
                            <div className="banner-service-container">
                                <div className="banner-service-item">
                                    <div className="banner-service-box">
                                        <img className="banner-service-logo" src={img1} alt=""/>
                                            
                                    </div>
                                    
                                    <span className="banner-service-name">
                                        <FormattedMessage id="banner.specialty-examination"/>
                                    </span>
                                </div>
                                <div className="banner-service-item">
                                    <div className="banner-service-box">
                                        <img className="banner-service-logo" src={img2} alt=""/>

                                    </div>
                                    
                                    <span className="banner-service-name">
                                        <FormattedMessage id="banner.remote-examination"/>
                                    </span>
                                </div>
                                <div className="banner-service-item">
                                    <div className="banner-service-box">
                                        <img className="banner-service-logo" src={img3} alt=""/>

                                    </div>
                                    
                                    <span className="banner-service-name">
                                        <FormattedMessage id="banner.general-examination"/>
                                    </span>
                                </div>
                                <div className="banner-service-item">
                                    <div className="banner-service-box">
                                        <img className="banner-service-logo" src={img4} alt=""/>

                                    </div>
                                    
                                    <span className="banner-service-name">
                                        <FormattedMessage id="banner.medical-test"/>
                                    </span>
                                </div>
                                <div className="banner-service-item">
                                    <div className="banner-service-box">
                                        <img className="banner-service-logo" src={img5} alt=""/>

                                    </div>
                                    
                                    <span className="banner-service-name">
                                        <FormattedMessage id="banner.health-spirit"/>
                                    </span>
                                </div>
                                <div className="banner-service-item">
                                    <div className="banner-service-box">
                                        <img className="banner-service-logo" src={img6} alt=""/>

                                    </div>
                                    
                                    <span className="banner-service-name">
                                        <FormattedMessage id="banner.dental-examination"/>
                                    </span>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        generalSpecialties: state.admin.generalSpecialties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        appChangeLanguage: (language) => dispatch(actions.appChangeLanguage(language)),
        getGeneralSpecialtySuccess: () => dispatch(actions.getGeneralSpecialtySuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
