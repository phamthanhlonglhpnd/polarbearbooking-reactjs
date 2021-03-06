import React, { Component } from 'react';
import { connect } from "react-redux";
import {Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import PersonInfor from '../containers/Patient/PersonInfor';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';


class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
            {isLoggedIn && <Header/>}
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/doctor/manage-schedule" component={ManageSchedule}/>
                        <Route path="/doctor/manage-patient" component={ManagePatient}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
