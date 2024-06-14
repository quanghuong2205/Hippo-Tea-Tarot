'use strict';
import Button from '../../components/atoms/Button';
import { SOCIAL_LINKS } from './constant';
function Footer() {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='col-3 col-md-12 gx-md-1 gy-md-3'>
                        <div className='footer-col'>
                            <h4>Quán trà Hippo</h4>
                            <ul>
                                <li>Điện thoại: 012345678</li>
                                <li>Email: quanghuong@gmail.com</li>
                                <li>
                                    Địa chỉ: số 17, mễ trì thượng, quận Nam
                                    Từ Niêm , TP.Hà Nội
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='col-3 col-md-12 gx-md-1 gy-md-3'>
                        <div className='footer-col'>
                            <h4>Về chúng tôi</h4>
                            <ul>
                                <li>
                                    <a href='#'>Giới thiệu</a>
                                </li>
                                <li>
                                    <a href='#'>Liên hệ</a>
                                </li>
                                <li>
                                    <a href='#'>Hợp tác</a>
                                </li>
                                <li>
                                    <a href='#'>Điều khoản</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='col-3 col-md-12 gx-md-1 gy-md-3'>
                        <div className='footer-col'>
                            <h4>Chi nhánh</h4>
                            <ul>
                                <li>
                                    <a href='#'>Hưng Yên</a>
                                </li>
                                <li>
                                    <a href='#'>Hà Nội</a>
                                </li>
                                <li>
                                    <a href='#'>TP.Hồ Chí Minh</a>
                                </li>
                                <li>
                                    <a href='#'>Hải Dương</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='col-3 col-md-12 gx-md-1 gy-md-3'>
                        <div className='footer-col'>
                            <h4>Nền tảng mạng xã hội</h4>
                            <div className='social-links'>
                                {SOCIAL_LINKS.map((link) => (
                                    <Button
                                        linkTo={link.path}
                                        key={link.path}>
                                        <link.icon />
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
