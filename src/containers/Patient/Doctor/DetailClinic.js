import React, { Component } from 'react';
import './DetailClinic.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getDetailDoctor } from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import * as actions from '../../../store/actions';


class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressClinic: '', 
            nameClinic: '',
            price: '',
            payment: '',
            note: '',
            isDetail: false
        }
    }

    async componentDidMount() {
        await this.props.getGeneralClinicSuccess(this.props.param);
    }

    componentDidUpdate(prevProps) {
        let {language} = this.props;
        if(prevProps.generalClinic!==this.props.generalClinic || prevProps.language!==this.props.language) {
            let data = this.props.generalClinic;
            let priceVND = data?.priceData?.valueVi ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data.priceData.valueVi) : '';
            let priceUSA = data?.priceData?.valueEn ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(data.priceData.valueEn) : '';
            let paymentVi = data?.paymentData?.valueVi ? data.paymentData.valueVi : '';
            let paymentEn = data?.paymentData?.valueEn ? data.paymentData.valueEn : '';
            if(data) {
                this.setState({
                    addressClinic: data.addressClinic,
                    nameClinic: data.nameClinic,
                    price: language===LANGUAGES.VI ? priceVND : priceUSA,
                    payment: language===LANGUAGES.VI ? paymentVi : paymentEn,
                    note: data.note
                })
            } else {
                this.setState({
                    addressClinic: '', 
                    nameClinic: '',
                    price: '',
                    payment: '',
                    note: '',
                })
            }
        }
    }

    showDetail = () => {
        this.setState({
            isDetail: !this.state.isDetail
        })
    }
    
    render() {
        let {addressClinic, nameClinic, price, payment, note, isDetail} = this.state;
        return (
            
            <div className="detailClinic">
                <div className="detailClinic-top">
                    <div className="detailClinic-title">
                        <FormattedMessage id="menu.doctor.title"/>
                    </div>
                    <div className="detailClinic-name">
                        {nameClinic}
                    </div>
                    < div className="detailClinic-address">
                        {addressClinic}
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
                        {note}
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
        generalClinic: state.admin.generalClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGeneralClinicSuccess: (doctorId) => dispatch(actions.getGeneralClinicSuccess(doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
