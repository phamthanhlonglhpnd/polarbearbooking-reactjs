import React, { Component } from 'react';
import './Doctor.scss';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import {LANGUAGES} from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { convertToImage } from '../../../../components/Formating/GeneralClass';


class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorArr: []
        }
    }

    async componentDidMount() {
        await this.props.getTopDoctorHomeSuccess();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.topDoctorHome!==this.props.topDoctorHome) {
            this.setState({
                doctorArr: this.props.topDoctorHome
            })
        }
    }

    render() {
        let settings = this.props.settings;
        let {language} = this.props;
        let {doctorArr} = this.state;
        return (
            <div className="section">
                <div className="section-content">
                    <Link to='/search-doctor/' className="section-btn"><FormattedMessage id="homepage.see-more"/></Link>
                    <div className="section-bottom">
                        <div className="section-title"><FormattedMessage id="homepage.outstanding-doctor"/></div>
                        <Slider {...settings} className="section-option">
                            {doctorArr && doctorArr.length>0 && doctorArr.map((item) => (
                                <Link to={`/detail-doctor-by-id/${item.id}`} key={item.id}>
                                    <div 
                                        className="section-item doctor-item" key={item.id}
                                    >
                                        <div 
                                            className="doctor-img"
                                            style={{backgroundImage: `url(${convertToImage(item.image)})`}}
                                        ></div>
                                        <div className="section-position">{language===LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}</div>
                                        <div className="section-name">
                                            {language===LANGUAGES.VI ? `${item.firstName} ${item.lastName}` : `${item.lastName} ${item.firstName} `}    
                                        </div>
                                    </div>
                                </Link>
                            )) }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorHome: state.admin.topDoctorHome
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctorHomeSuccess: () => dispatch(actions.getTopDoctorHomeSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
