import React, { Component } from 'react';
import { connect } from "react-redux";
import {Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import MedicalHistory from '../containers/Patient/MedicalHistory';
import MedicalSchedule from '../containers/Patient/MedicalSchedule';
import PersonInfor from '../containers/Patient/PersonInfor';

class Patient extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
            {isLoggedIn && <Header/>}
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/user/medical-history" component={MedicalHistory}/>
                        <Route path="/user/medical-examination-schedule" component={MedicalSchedule}/>
                        <Route path="/user/person-information" component={PersonInfor}/>
                    </Switch>
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
