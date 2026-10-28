
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";

interface AdminUser {
  id: number;
  username: string;
  fullName: string;
  role: "ADMIN" | "STUDENT";
}

function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const parsedUser: AdminUser = JSON.parse(storedUser);

      if (parsedUser.role !== "ADMIN") {
        navigate("/student", { replace: true });
        return;
      }

      setUser(parsedUser);
    } catch {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  function handleLogout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  if (!user) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        <p>Đang tải trang quản trị...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <a href="/" className="admin-brand">
          <span className="admin-brand-icon">中</span>
          <span>
            Hanzi <strong>Edu</strong>
          </span>
        </a>

        <div className="admin-sidebar-label">QUẢN LÝ HỆ THỐNG</div>

        <nav className="admin-nav">
          <a href="#overview" className="admin-nav-item active">
            <span className="admin-nav-icon">⌂</span>
            <span>Tổng quan</span>
          </a>

          <a href="#classes" className="admin-nav-item">
            <span className="admin-nav-icon">▤</span>
            <span>Quản lý lớp học</span>
          </a>

          <a href="#students" className="admin-nav-item">
            <span className="admin-nav-icon">♙</span>
            <span>Quản lý học viên</span>
          </a>

          <a href="#schedules" className="admin-nav-item">
            <span className="admin-nav-icon">▦</span>
            <span>Lịch học</span>
          </a>

          <a href="#assignments" className="admin-nav-item">
            <span className="admin-nav-icon">☷</span>
            <span>Bài tập</span>
          </a>

          <a href="#tests" className="admin-nav-item">
            <span className="admin-nav-icon">✓</span>
            <span>Bài kiểm tra</span>
          </a>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-note">
            <span className="admin-note-icon">中</span>
            <p>
              <strong>Hanzi Edu</strong>
              <span>Học tiếng Trung mỗi ngày</span>
            </p>
          </div>

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Noi dung chinh */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">Hanzi Edu / Quản trị</p>
            <h1>Bảng điều khiển</h1>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">
              {(user.fullName || user.username)
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="admin-profile-info">
              <strong>{user.fullName || user.username}</strong>
              <span>Quản trị viên</span>
            </div>
          </div>
        </header>

        <section id="overview" className="admin-welcome">
          <div className="admin-welcome-content">
            <span className="admin-welcome-tag">ADMIN DASHBOARD</span>

            <h2>Xin chào, {user.fullName || user.username}!</h2>

            <p>
              Chào mừng bạn đến với hệ thống quản lý trung tâm tiếng Trung
              Hanzi Edu.
            </p>
          </div>

          <div className="admin-welcome-symbol">汉</div>
        </section>

        {/* Thong ke */}
        <section className="admin-statistics">
          <div className="admin-section-heading">
            <div>
              <h2>Tổng quan hệ thống</h2>
              <p>Theo dõi hoạt động của trung tâm</p>
            </div>
          </div>

          <div className="admin-stat-grid">
            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span className="admin-stat-icon red">▤</span>
                <span className="admin-stat-label">Lớp học</span>
              </div>
              <strong className="admin-stat-number">—</strong>
              <p>Dữ liệu sẽ được kết nối từ hệ thống</p>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span className="admin-stat-icon dark">♙</span>
                <span className="admin-stat-label">Học viên</span>
              </div>
              <strong className="admin-stat-number">—</strong>
              <p>Dữ liệu sẽ được kết nối từ hệ thống</p>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span className="admin-stat-icon light-red">▦</span>
                <span className="admin-stat-label">Lịch học</span>
              </div>
              <strong className="admin-stat-number">—</strong>
              <p>Dữ liệu sẽ được kết nối từ hệ thống</p>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span className="admin-stat-icon gray">☷</span>
                <span className="admin-stat-label">Bài tập</span>
              </div>
              <strong className="admin-stat-number">—</strong>
              <p>Dữ liệu sẽ được kết nối từ hệ thống</p>
            </article>
          </div>
        </section>

        {/* Chuc nang quan ly */}
        <section className="admin-management">
          <div className="admin-section-heading">
            <div>
              <h2>Chức năng quản lý</h2>
              <p>Truy cập nhanh các khu vực của hệ thống</p>
            </div>
          </div>

          <div className="admin-management-grid">
            <a href="#classes" id="classes" className="admin-management-card">
              <span className="admin-management-icon">▤</span>
              <div>
                <h3>Quản lý lớp học</h3>
                <p>Tạo lớp, cập nhật thông tin và quản lý danh sách lớp.</p>
              </div>
              <span className="admin-card-arrow">→</span>
            </a>

            <a
              href="#students"
              id="students"
              className="admin-management-card"
            >
              <span className="admin-management-icon">♙</span>
              <div>
                <h3>Quản lý học viên</h3>
                <p>Theo dõi tài khoản và thông tin học viên.</p>
              </div>
              <span className="admin-card-arrow">→</span>
            </a>

            <a
              href="#schedules"
              id="schedules"
              className="admin-management-card"
            >
              <span className="admin-management-icon">▦</span>
              <div>
                <h3>Quản lý lịch học</h3>
                <p>Sắp xếp thời gian và địa điểm học tập.</p>
              </div>
              <span className="admin-card-arrow">→</span>
            </a>

            <a
              href="#assignments"
              id="assignments"
              className="admin-management-card"
            >
              <span className="admin-management-icon">☷</span>
              <div>
                <h3>Quản lý bài tập</h3>
                <p>Tạo bài tập và theo dõi bài nộp của học viên.</p>
              </div>
              <span className="admin-card-arrow">→</span>
            </a>

            <a href="#tests" id="tests" className="admin-management-card">
              <span className="admin-management-icon">✓</span>
              <div>
                <h3>Quản lý bài kiểm tra</h3>
                <p>Tổ chức kiểm tra và theo dõi kết quả học tập.</p>
              </div>
              <span className="admin-card-arrow">→</span>
            </a>
          </div>
        </section>

        <footer className="admin-footer">
          <span>© {new Date().getFullYear()} Hanzi Edu</span>
          <span>Hệ thống quản lý giáo dục tiếng Trung</span>
        </footer>
      </main>
    </div>
  );
}

export default Admin;
