
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

interface LoginResponse {
    message: string;
    token?: string;
    user?: {
        id: number;
        username: string;
        fullName: string;
        role: "ADMIN" | "STUDENT";
    };
}

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (!username.trim() || !password) {
            setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
            return;
        }

        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password,
                }),
            });

            const data: LoginResponse = await response.json();

            if (!response.ok || !data.token || !data.user) {
                setError(data.message || "Đăng nhập thất bại. Vui lòng thử lại.");
                return;
            }

            // Lưu thông tin phiên đăng nhập
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));

            // Chuyển trang theo quyền tài khoản
            if (data.user.role === "ADMIN") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/student", { replace: true });
            }
        } catch {
            setError(
                "Không thể kết nối máy chủ. Vui lòng kiểm tra backend có đang chạy không."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="login-page">
            <section className="login-card">
                <Link to="/" className="login-brand" aria-label="Hanzi Edu trang chủ">
                    <span className="login-brand-icon">汉</span>

                    <span className="login-brand-name">
                        Hanzi <span>Edu</span>
                    </span>
                </Link>

                <div className="login-heading">
                    <span className="login-eyebrow">HANZI EDU • LEARN CHINESE</span>

                    <h1>Chào mừng trở lại!</h1>

                    <p>
                        Đăng nhập để tiếp tục hành trình học tiếng Trung của bạn.
                    </p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="username">Tài khoản</label>

                        <div className="login-input-wrapper">
                            <span className="login-input-icon" aria-hidden="true">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
                                </svg>
                            </span>

                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Nhập tài khoản của bạn"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                autoComplete="username"
                                autoCapitalize="none"
                                spellCheck={false}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Mật khẩu</label>

                        <div className="login-input-wrapper">
                            <span className="login-input-icon" aria-hidden="true">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <rect x="4" y="10" width="16" height="11" rx="2" />
                                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    <circle cx="12" cy="15" r="1" />
                                    <path d="M12 16v2" />
                                </svg>
                            </span>

                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                                required
                                disabled={loading}
                            />

                            <button
                                type="button"
                                className="login-password-toggle"
                                onClick={() => setShowPassword((previous) => !previous)}
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                aria-pressed={showPassword}
                                disabled={loading}
                            >
                                {showPassword ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="login-error" role="alert">
                            <span aria-hidden="true">!</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-submit"
                        disabled={loading}
                    >
                        <span>{loading ? "Đang đăng nhập..." : "Đăng nhập"}</span>

                        {!loading && (
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        )}
                    </button>
                </form>

                <div className="login-divider">
                    <span />
                    <p>HỌC TẬP MỖI NGÀY</p>
                    <span />
                </div>

                <p className="login-back">
                    Chưa muốn đăng nhập? <Link to="/">Quay về trang chủ</Link>
                </p>

                <footer className="login-footer">
                    © {new Date().getFullYear()} Hanzi Edu. Học tiếng Trung dễ dàng hơn.
                </footer>
            </section>

            <div className="login-decoration login-decoration-one" />
            <div className="login-decoration login-decoration-two" />
        </main>
    );
}

export default Login;
