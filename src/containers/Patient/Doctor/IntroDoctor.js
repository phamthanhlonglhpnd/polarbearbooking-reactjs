import React, { Component} from 'react';
import { connect } from 'react-redux';
import { formatImage } from '../../../components/Formating/GeneralClass';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';
import './IntroDoctor.scss';

class IntroDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            intro: {}
        }
    }
    
    async componentDidMount() {
        if(this.props.id) {
            await this.props.getIntroDoctorSuccess(this.props.id);
        }
    }

    componentDidUpdate(preProps) {
        let {language} = this.props;
        if(preProps.language!==language || preProps.introDoctor!==this.props.introDoctor) {
            this.setState({
                intro: this.props.introDoctor
            })
        }
    }

    render() {
        let {intro} = this.state;
        let {language} = this.props;
        let image = formatImage(intro.image);
        let NameVI = (intro.firstName && intro.lastName && intro.positionData) ? `${intro.positionData.valueVi} ${intro.firstName} ${intro.lastName}` : '';
        let NameEN = (intro.firstName && intro.lastName && intro.positionData) ? `${intro.positionData.valueEn} ${intro.lastName} ${intro.firstName}` : '';
        return (
            <div className="detail-profile">
                <div 
                    className="detail-image"
                    style={{backgroundImage: `url(${image})`}}
                ></div>
                <div className="detail-general">
                    <div className="detail-name">{language===LANGUAGES.VI ? NameVI : NameEN}</div>
                    <div className="detail-position">{intro?.Markdown && intro.Markdown.description}</div>
                </div>
            </div>                                          
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        introDoctor: state.admin.introDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getIntroDoctorSuccess: (id) => dispatch(actions.getIntroDoctorSuccess(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroDoctor);