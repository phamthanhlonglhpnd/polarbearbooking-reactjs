import React, { Component } from 'react';
import './DetailHandbook.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getDetailHandbook } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';
import HomeFooter from '../../HomePage/HomeFooter';

class DetailHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            handbook: {}
        }
    }

    async componentDidMount() {
        let res = await getDetailHandbook(this.props?.match?.params?.id);
        this.setState({
            handbook: res.handbook
        })
    }

    render() {

        let { handbook } = this.state;


        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className="detail-handbook">
                    <div className="container">
                        <div className="detail-handbook-title">{handbook?.title}</div>
                        <div className="detail-handbook-info">
                            <p>
                                <FormattedMessage id="homepage.product"/>
                                <Link to='/home' style={{color: 'blueviolet'}}>Polarbear Care</Link>
                            </p>
                            <p>
                                <FormattedMessage id="homepage.censor"/>
                                Pham Thanh Long
                            </p>
                            <p>
                                <FormattedMessage id="homepage.publish"/>
                                {handbook?.createdAt?.substr(0, 10)}
                            </p>
                            <p>
                                <FormattedMessage id="homepage.last-update"/>
                                {handbook?.updatedAt?.substr(0, 10)}
                            </p>
                            <p>
                                <FormattedMessage id="homepage.specialty"/>
                                <Link to={`/detail-specialty-by-id/${handbook?.specialtyId}`} style={{color: 'blueviolet'}}>
                                    {handbook?.specialtyHandbook?.name}
                                </Link>
                            </p>
                        </div>
                        <div className="detail-handbook-slogan">
                            Polarbear Care l?? N???n t???ng Y t??? Ch??m s??c s???c kh???e to??n di???n k???t n???i ng?????i d??ng v???i d???ch v??? y t??? - ch??m s??c s???c kh???e hi???u qu???, tin c???y v???i tr??n 100 b???nh vi???n, ph??ng kh??m uy t??n, h??n 600 b??c s?? chuy??n khoa gi???i v?? h??ng ngh??n d???ch v??? y t??? ch???t l?????ng cao.
                        </div>
                        <div className="detail-handbook-bottom">
                            <div className="detail-handbook-content">
                                <div            
                                    dangerouslySetInnerHTML={{__html: handbook?.descriptionHTML && handbook?.descriptionHTML}}
                                >    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeFooter/>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook)

