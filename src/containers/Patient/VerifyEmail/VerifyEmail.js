import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LANGUAGES} from '../../../utils';
import { postVerifyBooking } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';


class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            status: false
        }
    }

    componentDidMount() {
        this.setContent(this.props.language);
    }

    setContent = async (language) => {
        let urlParam = new URLSearchParams(this.props.location.search);
        let token = urlParam.get('token');
        let doctorId = urlParam.get('doctorId');
        
        let res = await postVerifyBooking({
            token: token,
            doctorId: doctorId
        });

        let contentVISuccess = 'Xác nhận lịch hẹn thành công!';
        let contentENSuccess = 'Appointment confirmation successful!';
        let contentVIFail = 'Lịch hẹn đã được xác nhận hoặc không tồn tại!';
        let contentENFail = 'Appointment confirmed or non-existent!'
        if(res && res.errCode===0) {
            this.setState({
                content: language === LANGUAGES.VI ? contentVISuccess : contentENSuccess
            })
        }
        if(res && res.errCode===2) {
            this.setState({
                content: language === LANGUAGES.VI ? contentVIFail : contentENFail
            })
        }
    }

    componentDidUpdate(preProps) {
        if(preProps.language!==this.props.language) {
            this.setContent(this.props.language);
        }
    }
    
    render() {
        
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div style={{
                    textTransform: 'uppercase',
                    fontSize: '30px',
                    fontWeight: '600',
                    background: 'linear-gradient(to right, #30CFD0 0%, #330867 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                    marginTop: '100px'
                    
                    
                }}>
                    {this.state.content}
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
