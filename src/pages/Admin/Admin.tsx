
import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";

interface AdminUser {
  id: number;
  username: string;
  fullName: string;
  role: "ADMIN" | "STUDENT";
}

interface Student {
  id: number;
  username: string;
  fullName: string;
  role?: "ADMIN" | "STUDENT";
  status: "ACTIVE" | "LOCKED";
  createdAt?: string;
}

const API_URL = "https://hsk-9ph0.onrender.com";

function Admin() {
  const navigate = useNavigate();

  const [user, setUser] = useState<AdminUser | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    password: "",
  });

  const token = sessionStorage.getItem("token");

  // Xoa thong tin dang nhap va quay ve trang Login
  const handleUnauthorized = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  }, [navigate]);

  // Doc thong bao loi tu API
  async function readResponse(response: Response): Promise<{
    message?: string;
    students?: Student[];
    student?: Student;
  }> {
    try {
      return await response.json();
    } catch {
      return {};
    }
  }

  // Tai danh sach hoc vien
  const loadStudents = useCallback(async () => {
    const currentToken = sessionStorage.getItem("token");

    if (!currentToken) {
      handleUnauthorized();
      return;
    }

    setLoadingStudents(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/students`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
          Accept: "application/json",
        },
      });

      const data = await readResponse(response);

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (response.status === 403) {
        throw new Error(
          data.message || "Tai khoan khong co quyen Admin."
        );
      }

      if (response.status === 404) {
        throw new Error(
          "API danh sach hoc vien chua ton tai tren backend Render. Hay kiem tra va deploy lai backend."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || `Khong the tai danh sach (HTTP ${response.status}).`
        );
      }

      setStudents(data.students ?? []);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Loi ket noi khi tai danh sach hoc vien."
      );
      setMessageType("error");
    } finally {
      setLoadingStudents(false);
    }
  }, [handleUnauthorized]);

  // Kiem tra thong tin Admin truoc khi hien thi trang
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (!storedToken || !storedUser) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const parsedUser: AdminUser = JSON.parse(storedUser);

      if (
        !parsedUser ||
        typeof parsedUser.id !== "number" ||
        typeof parsedUser.username !== "string" ||
        parsedUser.role !== "ADMIN"
      ) {
        if (parsedUser?.role === "STUDENT") {
          navigate("/student", { replace: true });
        } else {
          handleUnauthorized();
        }
        return;
      }

      setUser(parsedUser);
    } catch {
      handleUnauthorized();
    }
  }, [navigate, handleUnauthorized, token]);

  // Chi tai danh sach khi da xac dinh tai khoan Admin
  useEffect(() => {
    if (user?.role === "ADMIN") {
      void loadStudents();
    }
  }, [user, loadStudents]);

  function handleLogout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Tao tai khoan hoc vien
  async function handleCreateStudent(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");

    const username = form.username.trim();
    const fullName = form.fullName.trim();
    const password = form.password;

    if (!username || !fullName || !password) {
      setMessage("Vui long nhap day du thong tin.");
      setMessageType("error");
      return;
    }

    if (password.length < 8) {
      setMessage("Mat khau phai co it nhat 8 ky tu.");
      setMessageType("error");
      return;
    }

    const currentToken = sessionStorage.getItem("token");

    if (!currentToken) {
      handleUnauthorized();
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          username,
          fullName,
          password,
        }),
      });

      const data = await readResponse(response);

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (response.status === 403) {
        throw new Error(
          data.message || "Ban khong co quyen tao tai khoan hoc vien."
        );
      }

      if (response.status === 404) {
        throw new Error(
          "API tao hoc vien chua ton tai tren backend Render. Hay kiem tra va deploy lai backend."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || `Tao tai khoan that bai (HTTP ${response.status}).`
        );
      }

      setForm({
        username: "",
        fullName: "",
        password: "",
      });

      setMessage("Tao tai khoan hoc vien thanh cong!");
      setMessageType("success");

      await loadStudents();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Co loi xay ra khi tao tai khoan."
      );
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        <p>Dang tai trang quan tri...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
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
              Chào mừng bạn đến với hệ thống quản lý trung tâm
              tiếng Trung Hanzi Edu.
            </p>
          </div>

          <div className="admin-welcome-symbol">汉</div>
        </section>

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
              <p>Chưa kết nối dữ liệu lớp học</p>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span className="admin-stat-icon dark">♙</span>
                <span className="admin-stat-label">Học viên</span>
              </div>
              <strong className="admin-stat-number">
                {students.length}
              </strong>
              <p>Tài khoản học viên trong hệ thống</p>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span className="admin-stat-icon light-red">▦</span>
                <span className="admin-stat-label">Lịch học</span>
              </div>
              <strong className="admin-stat-number">—</strong>
              <p>Chưa kết nối dữ liệu lịch học</p>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span className="admin-stat-icon gray">☷</span>
                <span className="admin-stat-label">Bài tập</span>
              </div>
              <strong className="admin-stat-number">—</strong>
              <p>Chưa kết nối dữ liệu bài tập</p>
            </article>
          </div>
        </section>

        <section className="admin-student-management" id="students">
          <div className="admin-section-heading">
            <div>
              <h2>Quản lý tài khoản học viên</h2>
              <p>Tạo và theo dõi tài khoản do quản trị viên cấp</p>
            </div>
          </div>

          <div className="admin-student-form-card">
            <h3>+ Tạo tài khoản học viên</h3>
            <p className="admin-student-form-description">
              Tài khoản được tạo tại đây có thể dùng để đăng nhập
              vào hệ thống.
            </p>

            <form onSubmit={handleCreateStudent}>
              <div className="admin-student-form-grid">
                <label className="admin-form-field">
                  <span>Họ và tên</span>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    maxLength={100}
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="admin-form-field">
                  <span>Tên đăng nhập</span>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    placeholder="Nhập tên đăng nhập"
                    maxLength={50}
                    autoComplete="username"
                    required
                  />
                </label>

                <label className="admin-form-field">
                  <span>Mật khẩu</span>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    placeholder="Ít nhất 8 ký tự"
                    minLength={8}
                    autoComplete="new-password"
                    required
                  />
                </label>
              </div>

              {message && (
                <div
                  className={`admin-form-message ${messageType}`}
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="admin-create-student-button"
                disabled={submitting}
              >
                {submitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
              </button>
            </form>
          </div>

          <div className="admin-student-list-card">
            <div className="admin-student-list-heading">
              <div>
                <h3>Danh sách học viên</h3>
                <p>Tổng số: {students.length} tài khoản</p>
              </div>

              <button
                type="button"
                className="admin-refresh-button"
                onClick={() => void loadStudents()}
                disabled={loadingStudents}
              >
                {loadingStudents ? "Đang tải..." : "↻ Làm mới"}
              </button>
            </div>

            {loadingStudents && students.length === 0 ? (
              <p className="admin-student-empty">
                Đang tải danh sách học viên...
              </p>
            ) : students.length === 0 ? (
              <p className="admin-student-empty">
                Chưa có tài khoản học viên.
                {messageType === "error" && message
                  ? ` ${message}`
                  : ""}
              </p>
            ) : (
              <div className="admin-student-table-wrapper">
                <table className="admin-student-table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Họ và tên</th>
                      <th>Tên đăng nhập</th>
                      <th>Ngày tạo</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td className="admin-student-name">
                          {student.fullName}
                        </td>
                        <td>{student.username}</td>
                        <td>
                          {student.createdAt
                            ? new Date(
                                student.createdAt
                              ).toLocaleDateString("vi-VN")
                            : "—"}
                        </td>
                        <td>
                          <span
                            className={`admin-student-status ${
                              student.status === "ACTIVE"
                                ? "active"
                                : "locked"
                            }`}
                          >
                            {student.status === "ACTIVE"
                              ? "Hoạt động"
                              : "Đã khóa"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <section className="admin-management" id="classes">
          <div className="admin-section-heading">
            <div>
              <h2>Chức năng quản lý</h2>
              <p>Truy cập nhanh các khu vực của hệ thống</p>
            </div>
          </div>

          <div className="admin-management-grid">
            <a href="#classes" className="admin-management-card">
              <span className="admin-management-icon">▤</span>
              <div>
                <h3>Quản lý lớp học</h3>
                <p>Tạo lớp, cập nhật thông tin và quản lý danh sách lớp.</p>
              </div>
              <span className="admin-card-arrow">→</span>
            </a>

            <a href="#students" className="admin-management-card">
              <span className="admin-management-icon">♙</span>
              <div>
                <h3>Quản lý học viên</h3>
                <p>Theo dõi tài khoản và thông tin học viên.</p>
              </div>
              <span className="admin-card-arrow">→</span>
            </a>

            <a href="#schedules" className="admin-management-card">
              <span className="admin-management-icon">▦</span>
              <div>
                <h3>Quản lý lịch học</h3>
                <p>Sắp xếp thời gian và địa điểm học tập.</p>
              </div>
              <span className="admin-card-arrow">→</span>
            </a>

            <a href="#assignments" className="admin-management-card">
              <span className="admin-management-icon">☷</span>
              <div>
                <h3>Quản lý bài tập</h3>
                <p>Tạo bài tập và theo dõi bài nộp của học viên.</p>
              </div>
              <span className="admin-card-arrow">→</span>
            </a>

            <a href="#tests" className="admin-management-card">
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
