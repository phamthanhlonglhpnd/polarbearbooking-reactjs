import React from 'react';
import './MobileApp.scss';
import mobile from '../../../../assets/images/About/mobile_app.jpg';
import googlePlay from '../../../../assets/images/About/google-play-badge.svg';
import appStore from '../../../../assets/images/About/app-store-badge-black.svg';

import { FormattedMessage } from 'react-intl';

export default function MobileApp() {
    return (
        <div className='section'>
            <div className='section-content'>
                <div className='mobile'>
                    <img src={mobile} alt='' className='mobile-image'/> 
                    <div className='mobile-content'>
                        <div className="section-title">
                            <FormattedMessage id="homepage.app"/>
                        </div> 
                                    
                        <div className='mobile-bottom'>
                            <div className='mobile-item'>
                                <i className="fas fa-check" style={{marginRight: '10px'}}></i>
                                <FormattedMessage id="homepage.faster"/>
                            </div>
                            <div className='mobile-item'>
                                <i className="fas fa-check" style={{marginRight: '10px'}}></i>
                                <FormattedMessage id="homepage.convenient"/>
                            </div>
                            <div className='mobile-item'>
                                <i className="fas fa-check" style={{marginRight: '10px'}}></i>
                                <FormattedMessage id="homepage.receive"/>
                            </div>            
                            <div className='mobile-item'>
                                <i className="fas fa-check" style={{marginRight: '10px'}}></i>
                                <FormattedMessage id="homepage.instructions"/>
                            </div>
                            <div className='mobile-item'>
                                <img src={googlePlay} alt='/' className='mobile-store'/>
                                <img src={appStore} alt='/' className='mobile-store'/>
                            </div>
                        </div>                                            
                    </div>
                </div>
            </div>
        </div>
    )
}
