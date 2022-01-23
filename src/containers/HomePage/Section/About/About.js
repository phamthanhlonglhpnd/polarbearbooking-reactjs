import React, { Component } from 'react';
import './About.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
            <div className="section">
                <div className="section-content">
                    <div className="section-title">
                        <FormattedMessage id="homepage.about"/>
                    </div>  
                    <div className="about-content">
                        <iframe
                            className="about-video"
                            src="https://www.youtube.com/embed/i3wQ9BHIm1I" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        >

                        </iframe>
                        <div className="about-media">
                            <div className="about-list">
                                <div className="about-img about-img-1"></div>
                                <div className="about-img about-img-2"></div>
                                <div className="about-img about-img-3"></div>
                                <div className="about-img about-img-4"></div>
                                <div className="about-img about-img-5"></div>
                                <div className="about-img about-img-6"></div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
