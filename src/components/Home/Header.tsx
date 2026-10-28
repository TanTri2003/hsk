import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header className="header">
            <div className="container header-container">

                <div className="logo">
                    <span className="logo-icon">中</span>
                    <span>Hanzi Edu</span>
                </div>

                <nav className="nav">
                    <a href="#home">Trang chủ</a>
                    <a href="#courses">Khóa học</a>
                    <a href="#vocabulary">Từ vựng</a>
                    <a href="#grammar">Ngữ pháp</a>
                    <a href="#hsk">HSK</a>
                    <Link to="/classroom">Lớp học</Link>
                </nav>

                <Link to="/login" className="login-button">
                    Đăng nhập
                </Link>

            </div>
        </header>
    );
};

export default Header;