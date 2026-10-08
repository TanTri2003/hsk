const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="container hero-container">

                <div className="hero-content">

                    <span className="hero-label">
                        🀄 Học tiếng Trung mỗi ngày
                    </span>

                    <h1>
                        Học tiếng Trung
                        <br />
                        <span>dễ dàng hơn</span>
                    </h1>

                    <p>
                        Học từ vựng, ngữ pháp, phát âm và luyện thi HSK
                        theo cách đơn giản và hiệu quả.
                    </p>

                    <div className="hero-buttons">
                        <button className="primary-button">
                            Bắt đầu học
                        </button>

                        <button className="secondary-button">
                            Khám phá khóa học
                        </button>
                    </div>

                </div>

                <div className="hero-card">
                    <div className="chinese-character">
                        学
                    </div>

                    <p>Học tập</p>

                    <span>学习 · Xuéxí</span>
                </div>

            </div>
        </section>
    );
};

export default Hero;