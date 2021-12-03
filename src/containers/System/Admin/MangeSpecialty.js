import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from "../../store/actions";
// import {LANGUAGES, USER_ROLE} from '../../utils';
import './ManageSpecilaty.scss';
import { FormattedMessage } from 'react-intl';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    

    componentDidMount() {
        
    }

    render() {
        
        return (
            <div>ManageSpecialty</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
