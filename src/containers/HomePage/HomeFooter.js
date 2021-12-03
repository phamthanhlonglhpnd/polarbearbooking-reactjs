import React, { Component } from 'react';
import './HomeFooter.scss';
import { connect } from 'react-redux';


class HomeFooter extends Component {
    
    render() {

        return (
            <div className="footer">
                <div className="footer-container">
                    <div className="footer-top">
                        <div className="footer-info">
                            <div className="footer-logo">POLARBEAR CARE</div>
                            <div className="footer-title">Công ty Cổ phần Công nghệ PolarbearCare</div>
                            <div className="footer-address">
                                <i className="fas fa-location-arrow"></i>
                                <span className="footer-content">28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                            </div>
                            <div className="footer-confirm">
                                <i className="fas fa-check"></i>
                                <span className="footer-confirm-title">ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
                            </div>
                            <div className="footer-listImg">
                                <div className="footer-img footer-img-1"></div>
                                <div className="footer-img footer-img-2"></div>
                            </div>
                        </div>
                        <ul className="footer-service">
                            <li className="footer-item">Liên hệ hợp tác</li>
                            <li className="footer-item">Câu hỏi thường gặp</li>
                            <li className="footer-item">Điều khoản sử dụng</li>
                            <li className="footer-item">Chính sách Bảo mật</li>
                            <li className="footer-item">Quy trình hỗ trợ giải quyết khiếu nại</li>
                            <li className="footer-item">Quy chế hoạt động</li>
                        </ul>
                        <div className="footer-facility">
                            <div className="footer-facility-item">
                                <div className="footer-title">Trụ sở tại Hà Nội</div>
                                <div className="footer-content">28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>
                            </div>
                            <div className="footer-facility-item">
                                <div className="footer-title">Văn phòng tại TP Hồ Chí Minh</div>
                                <div className="footer-content">6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1</div>
                            </div>
                            <div className="footer-facility-item">
                                <div className="footer-title">Hỗ trợ khách hàng</div>
                                <div className="footer-content">Support@bookingcare.vn (7h - 18h)</div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <span className="footer-bottom-content">Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng: Android/iPhone/iPad/Khác</span>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
