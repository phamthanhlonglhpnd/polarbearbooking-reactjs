import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss';
import * as actions from '../../../store/actions';
// import {LANGUAGES} from '../../../utils';
import {withRouter} from 'react-router';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import DetailSchedule from './DetailSchedule';
import DetailClinic from './DetailClinic';
import IntroDoctor from './IntroDoctor';
import DoctorMarkdown from './DoctorMarkdown';
import LikkAndShare from '../SocialPlugin/LikkAndShare';
import Comment from '../SocialPlugin/Comment';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    async componentDidMount() {

    }

    render() {
        let id = this.props?.match?.params?.id ? this.props.match.params.id : '';
        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ? 
        "https://bookingcare.vn/" : window.location.href;
        return (
            
            <div className="detail">
                <HomeHeader isShowBanner={false}/>
                <div className="detail-container">
                    <div className="detail-top">
                        <div className="container">
                            <IntroDoctor id={id}/>
                            <LikkAndShare
                                dataHref={currentURL}
                            />
                            <div className="detail-schedule">
                                <div className="detail-schedule-left">
                                    <DetailSchedule param = {id}/>
                                </div>
                                <div className="detail-schedule-right">
                                    <DetailClinic param = {id}/>
                                </div>
                            </div>
                        </div>     
                    </div>
                    <div className="detail-infor">
                        <DoctorMarkdown param={id}/>
                    </div>
                    <div className="detail-bottom">
                        <Comment
                            dataHref={currentURL}
                            width="100%"
                        />
                    </div>
                </div>
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctorSuccess: (id) => dispatch(actions.getDetailDoctorSuccess(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor));
