import React, { Component } from 'react';
import './ListSpecialty.scss';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { convertToImage } from '../../../components/Formating/GeneralClass';
import { Link } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import { searchInformationSpecialty } from '../../../services/userService';
import HomeFooter from '../../HomePage/HomeFooter';
import { FormattedMessage } from 'react-intl';


class ListSpeacialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
            handbooks: [],
            isShowOverlay: false
        }
    }

    async componentDidMount() {
        await this.props.getAllSpecialtySuccess();
        await this.props.getHomeHandbooksSuccess();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.language!==this.props.language || prevProps.specialties!==this.props.specialties) {
            this.setState({
                specialties: this.props.specialties
            })
        }
        if(prevProps.handbooks!==this.props.handbooks) {
            this.setState({
                handbooks: this.props.handbooks
            })
        }
    }

    handleChange = async (e) => {
        let res = await searchInformationSpecialty(e.target.value);
        if(res && res.errCode===0) {
            this.setState({
                specialties: res.specialties
            })
        };
        if(!e.target.value) {
            this.setState({
                specialties: this.props.specialties
            })
        }
    }

    render() {
        let { specialties, handbooks } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div style={{
                    display: 'flex', 
                    marginTop: '100px',
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: '30px'
                }}>
                    <div className="listSpecialty">
                        <div className="listSpecialty-top">
                            <div className="listSpecialty-search container">
                                <div className="listClinic-title"><FormattedMessage id="common.specialty" /></div>
                                    <input 
                                        className="form-control"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                            </div>    
                        </div>
                        {specialties && specialties.length>0 && specialties.map(specialty => (
                            <div key={specialty.id}>
                                <div className="listSpecialty-item">
                                    <img 
                                        className="listSpecialty-image"
                                        src={`${convertToImage(specialty.image)}`}
                                        alt=""
                                    />
                                    <div className="listSpecialty-right">
                                        <div className="listSpecialty-name">
                                            {specialty.name}
                                        </div>
                                        <Link to={`/detail-specialty-by-id/${specialty.id}`} className="see-more"><FormattedMessage id="homepage.see-more"/></Link>
                                    </div>
                                    
                                </div>
                            </div>               
                        ))}
                    </div>
                    <div className='handbook'>
                        <div className="section-title"><FormattedMessage id="homepage.handbook"/></div>
                        {handbooks && handbooks.length>0 && handbooks.map(handbook => (
                            <div className='handbook-item' key={handbook.id}>
                                <div className='handbook-title'>
                                    {handbook.title}
                                </div>
                                <img
                                    src={`${convertToImage(handbook?.image)}`}
                                    alt=''
                                    className='handbook-image'
                                />
                                <div className='handbook-specialty'>
                                    <FormattedMessage id="homepage.specialty"/>
                                    <Link to={`/detail-specialty-by-id/${handbook?.specialtyId}`} style={{color: 'blueviolet'}}>
                                        {handbook?.specialtyHandbook?.name}
                                    </Link>
                                </div>
                                <Link to={`/detail-handbook-by-id/${handbook.id}`} className="see-more">
                                    <FormattedMessage id="homepage.goto-post"/>
                                </Link>
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
        specialties: state.admin.specialties,
        handbooks: state.admin.handbooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialtySuccess: () => dispatch(actions.getAllSpecialtySuccess()),
        getHomeHandbooksSuccess: () => dispatch(actions.getHomeHandbooksSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSpeacialty);
