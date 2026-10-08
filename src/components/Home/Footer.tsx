const Footer = () => {
    return (
        <footer className="footer">

            <div className="container footer-container">

                <div>
                    <div className="logo">
                        <span className="logo-icon">中</span>
                        <span>Hanzi Edu</span>
                    </div>

                    <p>
                        Nền tảng hỗ trợ học tiếng Trung
                        đơn giản và hiệu quả.
                    </p>
                </div>

                <div className="footer-links">

                    <div>
                        <h4>Học tập</h4>
                        <a href="#">Khóa học</a>
                        <a href="#">Từ vựng</a>
                        <a href="#">Ngữ pháp</a>
                    </div>

                    <div>
                        <h4>Hỗ trợ</h4>
                        <a href="#">Giới thiệu</a>
                        <a href="#">Liên hệ</a>
                        <a href="#">Trợ giúp</a>
                    </div>

                </div>

            </div>

            <div className="footer-bottom">
                © 2026 Hanzi Edu. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;