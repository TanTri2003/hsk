const features = [
    {
        icon: "📚",
        title: "Khóa học",
        description: "Học tiếng Trung từ cơ bản đến nâng cao.",
    },
    {
        icon: "🔤",
        title: "Từ vựng",
        description: "Học và ghi nhớ từ vựng thông qua ví dụ.",
    },
    {
        icon: "✍️",
        title: "Ngữ pháp",
        description: "Các cấu trúc ngữ pháp được giải thích dễ hiểu.",
    },
    {
        icon: "🎧",
        title: "Luyện nghe",
        description: "Cải thiện khả năng nghe tiếng Trung.",
    },
    {
        icon: "📝",
        title: "Bài tập",
        description: "Luyện tập kiến thức sau mỗi bài học.",
    },
    {
        icon: "🎯",
        title: "HSK",
        description: "Luyện thi HSK theo từng cấp độ.",
    },
];

const FeatureSection = () => {
    return (
        <section className="section">
            <div className="container">

                <div className="section-header">
                    <span>KHÁM PHÁ</span>
                    <h2>Học mọi thứ bạn cần</h2>
                    <p>
                        Một nơi để học và luyện tập tiếng Trung.
                    </p>
                </div>

                <div className="feature-grid">

                    {features.map((feature) => (
                        <div className="feature-card" key={feature.title}>

                            <div className="feature-icon">
                                {feature.icon}
                            </div>

                            <h3>{feature.title}</h3>

                            <p>
                                {feature.description}
                            </p>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default FeatureSection;