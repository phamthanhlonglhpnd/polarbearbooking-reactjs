import React, { Component } from 'react';
import './Handbook.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { convertToImage } from '../../../../components/Formating/GeneralClass';
import { Link } from 'react-router-dom';
import * as actions from '../../../../store/actions';

class Handbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            handbooks: []
        }
    }

    async componentDidMount() {
        await this.props.getHomeHandbooksSuccess();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.handbooks!==this.props.handbooks) {
            this.setState({
                handbooks: this.props.handbooks
            })
        }
    }


    render() {
        let { handbooks } = this.state;
        let settings = this.props.settings;
        return (
            <div className="section">
                <div className="section-content">
                    <Link to='/search-handbook/' className="section-btn"><FormattedMessage id="homepage.see-more"/></Link>
                    <div className="section-bottom">
                        <div className="section-title"><FormattedMessage id="homepage.handbook"/></div>
                        <Slider {...settings} className="section-option">
                            {handbooks && handbooks.length>0 && handbooks.map(handbook => (
                                <Link to={`/detail-handbook-by-id/${handbook.id}`} className="section-item" key={handbook.id}>
                                    <div
                                        className="facility-img"
                                        style={{backgroundImage: `url(${convertToImage(handbook.image)})`}}
                                    ></div>
                                    <div className="section-name">
                                        {handbook.title}
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
        handbooks: state.admin.handbooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHomeHandbooksSuccess: () => dispatch(actions.getHomeHandbooksSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook)
