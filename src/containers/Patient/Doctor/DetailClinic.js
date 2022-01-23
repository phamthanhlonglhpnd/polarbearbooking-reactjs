import React, { Component } from 'react';
import './DetailClinic.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getGeneralClinic } from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import * as actions from '../../../store/actions';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // addressClinic: '', 
            // nameClinic: '',
            // price: '',
            // payment: '',
            // note: '',
            clinic: {},
            isDetail: false
        }
    }

    async componentDidMount() {
        if(this.props.param) {
            let res =  await getGeneralClinic(this.props.param);
            this.setState({
                clinic: res.clinic
            })
        }
    }

    showDetail = () => {
        this.setState({
            isDetail: !this.state.isDetail
        })
    }
    
    render() {
        let {clinic, isDetail} = this.state;
        let {language} = this.props;
        let priceVND = clinic?.priceData?.valueVi ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(clinic.priceData.valueVi) : '';
        let priceUSA = clinic?.priceData?.valueEn ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(clinic.priceData.valueEn) : '';
        let paymentVi = clinic?.paymentData?.valueVi ? clinic.paymentData.valueVi : '';
        let paymentEn = clinic?.paymentData?.valueEn ? clinic.paymentData.valueEn : '';
        let price  = language===LANGUAGES.VI ? priceVND : priceUSA;
        let payment = language===LANGUAGES.VI ? paymentVi : paymentEn
        return (
            
            <div className="detailClinic">
                <div className="detailClinic-top">
                    <div className="detailClinic-title">
                        <FormattedMessage id="menu.doctor.title"/>
                    </div>
                    <div className="detailClinic-name">
                        {clinic.nameClinic}
                    </div>
                    < div className="detailClinic-address">
                        {clinic.addressClinic}
                    </div>
                </div>
                <div className="detailClinic-bottom">
                    <div className="detailClinic-price">
                        <span className="detailClinic-detail-title"><FormattedMessage id="menu.doctor.price"/>: </span>
                        {price}
                    </div>
                    <button 
                        className="detailClinic-btn"
                        onClick={() => this.showDetail()}
                    >
                        {!isDetail ? <FormattedMessage id="menu.doctor.detail"/> : <FormattedMessage id="menu.doctor.hide-detail"/>}
                        
                    </button>
                </div>
                {isDetail ? (
                    <div className="detailClinic-detail">
                    <div className="detailClinic-detail-price">
                        <span className="detailClinic-detail-title"><FormattedMessage id="menu.doctor.price"/>: </span>
                        {price}
                    </div>
                    <div className="detailClinic-detail-payment">
                        <span className="detailClinic-detail-title"><FormattedMessage id="menu.doctor.payment"/>: </span>
                        {payment}
                    </div>
                    <div className="detailClinic-detail-note">
                        <span className="detailClinic-detail-title"><FormattedMessage id="menu.doctor.note"/>: </span>
                        {clinic.note}
                    </div>
                </div>
                ) : ''}
                
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
