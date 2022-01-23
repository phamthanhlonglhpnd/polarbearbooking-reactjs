import React, { Component } from 'react';
import './ListClinic.scss';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { convertToImage } from '../../../components/Formating/GeneralClass';
import { Link } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import { searchInformationClinic } from '../../../services/userService';
import HomeFooter from '../../HomePage/HomeFooter';
import { FormattedMessage } from 'react-intl';


class ListClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinics: []
        }
    }

    async componentDidMount() {
        await this.props.getHomeClinicSuccess();

    }

    componentDidUpdate(prevProps) {
        if(prevProps.language!==this.props.language || prevProps.clinics!==this.props.clinics) {
            this.setState({
                clinics: this.props.clinics
            })
        }
    }

    handleChange = async (e) => {
        let res = await searchInformationClinic(e.target.value);
        if(res && res.errCode===0) {
            this.setState({
                clinics: res.clinics
            })
        };
        if(!e.target.value) {
            this.setState({
                clinics: this.props.clinics
            })
        }
    }

    render() {
        let {clinics} = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className="listClinic container">
                    
                        <div className="listClinic-title"><FormattedMessage id="common.clinic" /></div>
                        <div className="listClinic-search">
                            <input 
                                placeholder=" "
                                className="listClinic-input"
                                onChange={(e) => this.handleChange(e)}
                            />  
                            <label className="listClinic-label">Search</label>      
                        </div>    
                        {clinics && clinics.length>0 && clinics.map(clinic => (
                            <div key={clinic.id} className="listClinic-item">
                               <img 
                                    className="listClinic-image"
                                    src={`${convertToImage(clinic.image)}`}
                                    alt=""
                                />
                                <div>
                                    <div className="listClinic-name">
                                        
                                        {clinic.name}
                                    </div>
                                    <div className="listClinic-address">
                                        <i className="fas fa-location-arrow"></i>
                                        {clinic.address}
                                    </div>
                                    <Link to={`/detail-clinic-by-id/${clinic.id}`} className="see-more"><FormattedMessage id="homepage.see-more"/></Link>
                                </div>
                                       
                            </div>                   
                        ))}
                    
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
        clinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHomeClinicSuccess: () => dispatch(actions.getHomeClinicSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
