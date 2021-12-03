import React, { Component } from 'react';
import './Facility.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


class Speacialty extends Component {

    render() {
        let settings = this.props.settings;
        return (
            <div className="section">
                <div className="section-content">
                    <button className="section-btn"><FormattedMessage id="homepage.see-more"/></button>
                    <div className="section-bottom">
                        <div className="section-title"><FormattedMessage id="homepage.outstanding-medical-facility"/></div>
                        <Slider {...settings} className="section-option">
                            <div className="section-item">
                                <div className="facility-img facility-img-1"></div>
                                <div className="section-name">
                                    Bệnh viện Hữu Nghị Việt Đức
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="facility-img facility-img-2"></div>
                                <div className="section-name">
                                    Bệnh viện Chợ Rẫy
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="facility-img facility-img-3"></div>
                                <div className="section-name">
                                    Phòng khám Bệnh viện Đại học Y Dược 1
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="facility-img facility-img-4"></div>
                                <div className="section-name">
                                    Bệnh viện K-Cơ sở Phan Chu Trinh
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="facility-img facility-img-5"></div>
                                <div className="section-name">
                                    Bệnh viện Ung Bướu Hưng Việt
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="facility-img facility-img-6"></div>
                                <div className="section-name">
                                    Hệ thống Y tế Thu Cúc
                                </div>
                            </div>
                            
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

export default connect(mapStateToProps, mapDispatchToProps)(Speacialty);
