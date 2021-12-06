import React, { Component} from 'react';
import { connect } from 'react-redux';
import { formatImage } from '../../../components/Formating/GeneralClass';
import { getIntroDoctor } from '../../../services/userService';
// import * as actions from '../../../store/actions';
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
            let res = await getIntroDoctor(this.props.id);
            this.setState({
                intro: res.intro
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroDoctor);