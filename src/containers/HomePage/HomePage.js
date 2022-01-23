import React, { Component } from 'react';
import './HomePage.scss';
import { connect } from 'react-redux';
const HomeHeader = React.lazy(() => import('./HomeHeader'));
const Specialty = React.lazy(() => import('./Section/Specialty/Specialty'));
const Facility = React.lazy(() => import('./Section/Facility/Facility'));
const Doctor = React.lazy(() => import('./Section/Doctor/Doctor'));
const Handbook = React.lazy(() => import('./Section/Handbook/Handbook'));
const About = React.lazy(() => import('./Section/About/About'));
const MobileApp = React.lazy(() => import('./Section/MobileApp/MobileApp'));

const HomeFooter = React.lazy(() => import('./HomeFooter'));


class HomePage extends Component {
    
    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        };
        return (
            <div>
                <React.Suspense fallback={null}>
                  <HomeHeader isShowBanner={true}/>
                </React.Suspense>
                <React.Suspense fallback={null}>
                  <Specialty settings={settings}/>
                </React.Suspense>
                <React.Suspense fallback={null}>
                  <Facility settings={settings}/>
                </React.Suspense>
                <React.Suspense fallback={null}>
                  <Doctor settings={settings}/>
                </React.Suspense>
                <React.Suspense fallback={null}>
                  <Handbook settings={settings}/>
                </React.Suspense>
                <React.Suspense fallback={null}>
                  <About/>
                </React.Suspense>
                <React.Suspense fallback={null}>
                  <MobileApp/>
                </React.Suspense>
                <React.Suspense fallback={null}>
                  <HomeFooter/>
                </React.Suspense>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
