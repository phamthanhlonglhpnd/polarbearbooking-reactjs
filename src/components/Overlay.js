import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Overlay.scss';

class Overlay extends Component {
    
    render() {
        let {isShowOverlay} = this.props;
        return (
            <>
                {isShowOverlay && 
                <div className="overlay">
                    <div className='overlay-loading'>
                        <i className="overlay-icon fas fa-spinner"></i> 
                        <span className='overlay-title'>Loading...</span>
                    </div>
                    
                </div>}
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
