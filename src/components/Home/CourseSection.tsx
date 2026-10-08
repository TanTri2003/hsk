const courses = [
    {
        level: "HSK 1",
        chinese: "初级汉语",
        description: "Làm quen với tiếng Trung cơ bản.",
    },
    {
        level: "HSK 2",
        chinese: "基础汉语",
        description: "Mở rộng vốn từ và giao tiếp cơ bản.",
    },
    {
        level: "Giao tiếp",
        chinese: "日常会话",
        description: "Luyện giao tiếp trong cuộc sống hàng ngày.",
    },
];

const CourseSection = () => {
    return (
        <section className="section course-section" id="courses">
            <div className="container">

                <div className="section-header">
                    <span>KHÓA HỌC</span>
                    <h2>Khóa học nổi bật</h2>
                    <p>
                        Bắt đầu hành trình học tiếng Trung của bạn.
                    </p>
                </div>

                <div className="course-grid">

                    {courses.map((course) => (
                        <div className="course-card" key={course.level}>

                            <div className="course-image">
                                中
                            </div>

                            <div className="course-content">

                                <span className="course-level">
                                    {course.level}
                                </span>

                                <h3>{course.chinese}</h3>

                                <p>
                                    {course.description}
                                </p>

                                <button>
                                    Xem khóa học →
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default CourseSection;