import React, { Component } from 'react';
import './DetailClinic.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import { convertToImage } from '../../../components/Formating/GeneralClass';
import { LANGUAGES } from '../../../utils';
import { getDetailClinic } from '../../../services/userService';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinic: {}
        }
    }

    async componentDidMount() {
        if(this.props.match.params.id) {
            let res = await getDetailClinic(this.props.match.params.id);
            if(res && res.errCode===0) {
                this.setState({
                    clinic: res.clinic
                })
            }
        }
        
    }

    componentDidUpdate(prevProps) {
        
    }

    render() {
        let {clinic} = this.state;
        return (
            <div className="clinic">
                <HomeHeader isShowBanner={false}/>
                <div 
                    className="clinic-image"
                    style={{backgroundImage: `url(${convertToImage(clinic.image)})`}}
                ></div>
                <div className="clinic-header">
                    
                </div>
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
