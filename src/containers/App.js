import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import ConfirmModal from '../components/ConfirmModal';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import VerifyEmail from './Patient/VerifyEmail/VerifyEmail';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import ListDoctor from './Patient/Doctor/ListDoctor';
import DetailClinic from './Patient/Clinic/DetailClinic';
import ListSpecialty from './Patient/Specialty/ListSpecialty';
import ListClinic from './Patient/Clinic/ListClinic';
import Patient from '../routes/Patient';
import Register from './Auth/Register';
import Header from './Header/Header';
import DetailHandbook from './Patient/HandBook/DetailHandbook';
const HomePage = React.lazy(() => import('./HomePage/HomePage'));

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />

                        <div className="content-container">
                            <React.Suspense fallback={null}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.REGISTER} component={userIsNotAuthenticated(Register)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(Header)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Header)} />
                                    <Route path={path.PATIENT} component={userIsAuthenticated(Header)} />
                                    <Route path={path.HOMEPAGE} component={(HomePage)} />
                                    <Route path={path.DETAIL_DOCTOR} component={(DetailDoctor)}/>
                                    <Route path={path.DETAIL_SPECIALTY} component={(DetailSpecialty)}/>
                                    <Route path={path.DETAIL_CLINIC} component={(DetailClinic)}/>
                                    <Route path={path.DETAIL_HANDBOOK} component={(DetailHandbook)}/>
                                    <Route path={path.SEARCH_DOCTOR} component={(ListDoctor)} />
                                    <Route path={path.SEARCH_SPECIALTY} component={(ListSpecialty)}/>
                                    <Route path={path.SEARCH_CLINIC} component={(ListClinic)} />
                                    <Route path={path.VERIFY_EMAIL} component={(VerifyEmail)}/>
                                </Switch>
                            </React.Suspense>
                        </div>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);