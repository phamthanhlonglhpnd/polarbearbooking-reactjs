import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ListDoctor.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import { Link } from 'react-router-dom';
import { searchInformationDoctor } from '../../../services/userService';
import IntroDoctor from './IntroDoctor';
import { FormattedMessage } from 'react-intl';

class ListDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctor: []
        }
    }

    async componentDidMount() {
        await this.props.getTopDoctorHomeSuccess();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.topDoctorHome!==this.props.topDoctorHome || prevProps.language!==this.props.language) {
            this.setState({
                listDoctor: this.props.topDoctorHome
            })
        }
    }

    handleChange = async (e) => {
        let res = await searchInformationDoctor(e.target.value);
        console.log(res);
        if(res && res.errCode===0) {
            this.setState({
                listDoctor: res.doctors
            })
        }
        if(!e.target.value) {
            this.setState({
                listDoctor: this.props.topDoctorHome
            })
        }
    }

    render() {
        let {listDoctor} = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className="listDoctor">
                    <div className="listDoctor-top">
                        <div className="listDoctor-search container">
                            <div className="listDoctor-title"><FormattedMessage id="common.doctor"/></div>
                            <input 
                                className="form-control"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="listDoctor-bottom">
                        <div className="listDoctor-result"><FormattedMessage id="common.result"/></div>
                        {listDoctor && listDoctor.length>0 && listDoctor.map(doctor => (
                            <div className="listDoctor-item" key={doctor.id}>
                                <IntroDoctor id={doctor.id}/>
                                <Link to={`/detail-doctor-by-id/${doctor.id}`} className="see-more"><FormattedMessage id="homepage.see-more"/></Link>
                            </div>
                        ))}
                    </div>
                </div>
                <HomeFooter/>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language, 
        topDoctorHome: state.admin.topDoctorHome
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctorHomeSuccess: () => dispatch(actions.getTopDoctorHomeSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctor);
