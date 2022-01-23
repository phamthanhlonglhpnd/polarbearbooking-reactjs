import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import Admin from '../containers/System/Admin/Admin/Admin';
import ManageClinic from '../containers/System/Admin/ManageClinic/ManageClinic';
import ManageDoctor from '../containers/System/Admin/ManageDoctor/ManageDoctor';
import ManageHandbook from '../containers/System/Admin/ManageHandbook/ManageHandbook';
import ManageSpecialty from '../containers/System/Admin/ManageSpecialty/ManageSpecialty';
import UserRedux from '../containers/System/Admin/ManageUser/UserRedux';
import UserManage from '../containers/System/UserManage';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <>
            {this.props.isLoggedIn && <Header/>}
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/admin" component={Admin} />
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/manage-doctor" component={ManageDoctor} />
                        <Route path="/system/manage-specialty" component={ManageSpecialty} />
                        <Route path="/system/manage-clinic" component={ManageClinic}/>
                        <Route path="/system/manage-handbook" component={ManageHandbook}/>
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
