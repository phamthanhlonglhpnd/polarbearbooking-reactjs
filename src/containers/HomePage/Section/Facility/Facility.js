import React, { Component } from 'react';
import './Facility.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { getHomeClinic } from '../../../../services/userService';
import { convertToImage } from '../../../../components/Formating/GeneralClass';
import { Link } from 'react-router-dom';


class Facility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinics: []
        }
    }

    async componentDidMount() {
        let res = await getHomeClinic();
        if(res && res.errCode===0) {
            this.setState({
                clinics: res.clinic
            })
        }
    }

    render() {
        let settings = this.props.settings;
        let {clinics} = this.state;
        return (
            <div className="section">
                <div className="section-content">
                    <button className="section-btn"><FormattedMessage id="homepage.see-more"/></button>
                    <div className="section-bottom">
                        <div className="section-title"><FormattedMessage id="homepage.outstanding-medical-facility"/></div>
                        <Slider {...settings} className="section-option">
                            {clinics && clinics.length>0 && clinics.map(clinic => (
                                <Link to={`/detail-clinic-by-id/${clinic.id}`} className="section-item" key={clinic.id}>
                                    <div
                                        className="facility-img"
                                        style={{backgroundImage: `url(${convertToImage(clinic.image)})`}}
                                    ></div>
                                    <div className="section-name">
                                        {clinic.name}
                                    </div>
                                </Link>
                            ))}
                            
                            
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facility)
