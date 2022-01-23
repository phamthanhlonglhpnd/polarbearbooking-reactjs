import React, { Component } from 'react';
import './Specialty.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../../store/actions';
import { convertToImage } from '../../../../components/Formating/GeneralClass';
import { Link } from 'react-router-dom';


class Speacialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialties: []
        }
    }

    async componentDidMount() {
        await this.props.getAllSpecialtySuccess();

    }

    componentDidUpdate(prevProps) {
        if(prevProps.language!==this.props.language || prevProps.specialties!==this.props.specialties) {
            this.setState({
                specialties: this.props.specialties
            })
        }
    }

    render() {
        let settings = this.props.settings;
        let {specialties} = this.state;
        return (
            <div className="section">
                <div className="section-content">
                    <Link to='/search-specialty/' className="section-btn"><FormattedMessage id="homepage.see-more"/></Link>
                    <div className="section-bottom">
                        <div className="section-title"><FormattedMessage id="homepage.popular-specialization"/></div>
                        <Slider {...settings} className="section-option">
                            {specialties && specialties.length>0 && specialties.map(specialty => (
                                <Link to={`/detail-specialty-by-id/${specialty.id}`} key={specialty.id}>
                                <div className="section-item">
                                    <div 
                                        className="specialty-img"
                                        style={{backgroundImage: `url(${convertToImage(specialty.image)})`}}
                                    ></div>
                                    <div className="section-name">
                                        {specialty.name}
                                    </div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        specialties: state.admin.specialties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialtySuccess: () => dispatch(actions.getAllSpecialtySuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speacialty);
