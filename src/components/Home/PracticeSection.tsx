const practices = [
    {
        icon: "🎧",
        title: "Luyện nghe",
    },
    {
        icon: "🔤",
        title: "Từ vựng",
    },
    {
        icon: "✍️",
        title: "Ngữ pháp",
    },
    {
        icon: "🗣️",
        title: "Phát âm",
    },
];

const PracticeSection = () => {
    return (
        <section className="practice-section">
            <div className="container">

                <div className="practice-content">

                    <div>
                        <span>LUYỆN TẬP</span>

                        <h2>
                            Luyện tập mỗi ngày
                        </h2>

                        <p>
                            Dành vài phút mỗi ngày để cải thiện
                            khả năng tiếng Trung của bạn.
                        </p>

                        <button className="primary-button">
                            Bắt đầu luyện tập
                        </button>
                    </div>

                    <div className="practice-grid">

                        {practices.map((practice) => (
                            <div
                                className="practice-card"
                                key={practice.title}
                            >
                                <span>
                                    {practice.icon}
                                </span>

                                <h3>
                                    {practice.title}
                                </h3>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
};

export default PracticeSection;