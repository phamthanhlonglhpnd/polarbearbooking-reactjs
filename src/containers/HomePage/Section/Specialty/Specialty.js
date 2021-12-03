import React, { Component } from 'react';
import './Specialty.scss';
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
                        <div className="section-title"><FormattedMessage id="homepage.popular-specialization"/></div>
                        <Slider {...settings} className="section-option">
                            <div className="section-item">
                                <div className="specialty-img specialty-img-1"></div>
                                <div className="section-name">
                                    Cơ xương khớp
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="specialty-img specialty-img-2"></div>
                                <div className="section-name">
                                    Tiêu hóa
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="specialty-img specialty-img-3"></div>
                                <div className="section-name">
                                    Tim mạch
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="specialty-img specialty-img-4"></div>
                                <div className="section-name">
                                    Thần kinh
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="specialty-img specialty-img-5"></div>
                                <div className="section-name">
                                    Chụp cộng hưởng từ
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="specialty-img specialty-img-6"></div>
                                <div className="section-name">
                                    Tai mũi họng
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
