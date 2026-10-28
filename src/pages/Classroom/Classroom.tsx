import { useState } from "react";
import "./Classroom.scss"

const schedule = [
  {
    day: "T2",
    date: "26",
    title: "Từ vựng HSK 3",
    time: "19:00 - 20:30",
    type: "Từ vựng",
    color: "red",
  },
  {
    day: "T3",
    date: "27",
    title: "Ngữ pháp tiếng Trung",
    time: "19:00 - 20:30",
    type: "Ngữ pháp",
    color: "blue",
  },
  {
    day: "T4",
    date: "28",
    title: "Luyện nghe HSK 3",
    time: "19:00 - 20:30",
    type: "Luyện nghe",
    color: "orange",
  },
  {
    day: "T5",
    date: "29",
    title: "Luyện đọc HSK 3",
    time: "19:00 - 20:30",
    type: "Luyện đọc",
    color: "green",
  },
  {
    day: "T6",
    date: "30",
    title: "Ôn tập tổng hợp",
    time: "19:00 - 20:30",
    type: "Ôn tập",
    color: "purple",
  },
  {
    day: "T7",
    date: "31",
    title: "Kiểm tra cuối tuần",
    time: "20:00 - 21:00",
    type: "Kiểm tra",
    color: "red",
  },
  {
    day: "CN",
    date: "01",
    title: "Tự học và ôn bài",
    time: "Tự chọn",
    type: "Tự học",
    color: "blue",
  },
];

const tests = [
  {
    title: "Kiểm tra từ vựng HSK 3",
    description: "Ôn tập 50 từ vựng đã học trong tuần.",
    questions: 50,
    duration: 30,
    level: "HSK 3",
    status: "Chưa làm",
  },
  {
    title: "Bài kiểm tra ngữ pháp",
    description: "Kiểm tra kiến thức ngữ pháp cơ bản.",
    questions: 20,
    duration: 20,
    level: "Cơ bản",
    status: "Chưa làm",
  },
  {
    title: "Luyện đọc hiểu tiếng Trung",
    description: "Đọc đoạn văn và trả lời câu hỏi.",
    questions: 15,
    duration: 25,
    level: "HSK 3",
    status: "Đã hoàn thành",
  },
];

const assignments = [
  {
    title: "Học 30 từ vựng mới",
    subject: "Từ vựng",
    deadline: "29/10/2026",
    status: "Đang thực hiện",
  },
  {
    title: "Hoàn thành bài tập ngữ pháp",
    subject: "Ngữ pháp",
    deadline: "30/10/2026",
    status: "Chưa làm",
  },
  {
    title: "Luyện nghe bài 5",
    subject: "Luyện nghe",
    deadline: "31/10/2026",
    status: "Đã hoàn thành",
  },
];

function Classroom() {
  const [activeTab, setActiveTab] = useState("Lịch học");
  const [selectedDay, setSelectedDay] = useState("28");
  const [completedTests, setCompletedTests] = useState<string[]>([]);

  const currentSchedule = schedule.find(
    (item) => item.date === selectedDay,
  );

  const handleStartTest = (title: string) => {
    setCompletedTests((previous) =>
      previous.includes(title)
        ? previous
        : [...previous, title],
    );

    alert(
      `Bạn đã mở bài kiểm tra: ${title}\n\nBạn có thể thay chức năng này bằng trang làm bài kiểm tra thực tế.`,
    );
  };

  return (
    <main className="classroom">
      <section className="classroom__hero">
        <div className="classroom__hero-content">
          <span className="classroom__eyebrow">
            中 HANZI EDU · KHÔNG GIAN HỌC TẬP
          </span>

          <h1>
            Lớp học của
            <br />
            <span>bạn</span>
          </h1>

          <p>
            Theo dõi lịch học, hoàn thành bài tập và chinh phục
            mục tiêu tiếng Trung của bạn mỗi ngày.
          </p>

          <div className="classroom__hero-actions">
            <button
              className="classroom__button classroom__button--primary"
              onClick={() => setActiveTab("Lịch học")}
            >
              Xem lịch học →
            </button>

            <button
              className="classroom__button classroom__button--light"
              onClick={() => setActiveTab("Kiểm tra")}
            >
              Làm bài kiểm tra
            </button>
          </div>
        </div>

        <div className="classroom__hero-card">
          <div className="classroom__hero-symbol">学</div>
          <h2>Học tập mỗi ngày</h2>
          <p>坚持学习 · Tiến bộ từng ngày</p>

          <div className="classroom__hero-stats">
            <div>
              <strong>75%</strong>
              <span>Tiến độ học</span>
            </div>

            <div>
              <strong>12</strong>
              <span>Bài đã học</span>
            </div>
          </div>
        </div>
      </section>

      <div className="classroom__container">
        <section className="classroom__welcome">
          <div>
            <span className="classroom__section-label">
              TỔNG QUAN
            </span>

            <h2>Chào mừng bạn đến lớp học!</h2>

            <p>
              Hãy duy trì thói quen học tập để đạt mục tiêu HSK
              của bạn.
            </p>
          </div>

          <div className="classroom__level">
            <span>🎯</span>
            <div>
              <strong>Mục tiêu hiện tại</strong>
              <p>Chinh phục HSK 3</p>
            </div>
          </div>
        </section>

        <section className="classroom__stats">
          <article className="classroom__stat-card">
            <div className="classroom__stat-icon red">▦</div>
            <div>
              <span>Lịch học tuần này</span>
              <strong>6 buổi</strong>
              <small>Học theo kế hoạch</small>
            </div>
          </article>

          <article className="classroom__stat-card">
            <div className="classroom__stat-icon blue">✓</div>
            <div>
              <span>Bài tập cần làm</span>
              <strong>02 bài</strong>
              <small>Cố gắng hoàn thành nhé!</small>
            </div>
          </article>

          <article className="classroom__stat-card">
            <div className="classroom__stat-icon orange">✎</div>
            <div>
              <span>Bài kiểm tra</span>
              <strong>
                {tests.filter(
                  (test) =>
                    test.status === "Chưa làm" &&
                    !completedTests.includes(test.title),
                ).length}
              </strong>
              <small>Đang chờ hoàn thành</small>
            </div>
          </article>

          <article className="classroom__stat-card">
            <div className="classroom__stat-icon green">↗</div>
            <div>
              <span>Tiến độ học tập</span>
              <strong>75%</strong>
              <div className="classroom__progress">
                <span style={{ width: "75%" }} />
              </div>
            </div>
          </article>
        </section>

        <nav className="classroom__tabs">
          {["Lịch học", "Bài tập", "Kiểm tra", "Kết quả"].map(
            (tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab
                    ? "classroom__tab active"
                    : "classroom__tab"
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ),
          )}
        </nav>

        {activeTab === "Lịch học" && (
          <section className="classroom__section">
            <div className="classroom__section-heading">
              <div>
                <span className="classroom__section-label">
                  STUDY SCHEDULE
                </span>
                <h2>Lịch học của bạn</h2>
                <p>
                  Chọn một ngày để xem nội dung học tập.
                </p>
              </div>

              <span className="classroom__week-label">
                Tuần hiện tại
              </span>
            </div>

            <div className="classroom__calendar">
              {schedule.map((item) => (
                <button
                  key={item.date}
                  className={`classroom__day ${
                    selectedDay === item.date ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDay(item.date)}
                >
                  <span>{item.day}</span>
                  <strong>{item.date}</strong>
                  <i />
                </button>
              ))}
            </div>

            <div className="classroom__schedule-detail">
              <div className="classroom__schedule-date">
                <div className="classroom__schedule-date-icon">
                  日
                </div>

                <div>
                  <h3>
                    {currentSchedule
                      ? currentSchedule.title
                      : "Chưa có lịch học"}
                  </h3>

                  <p>
                    {currentSchedule
                      ? currentSchedule.time
                      : "Bạn có thể bổ sung lịch học sau."}
                  </p>
                </div>
              </div>

              {currentSchedule && (
                <div className="classroom__schedule-info">
                  <span
                    className={`classroom__badge ${currentSchedule.color}`}
                  >
                    {currentSchedule.type}
                  </span>

                  <span className="classroom__schedule-status">
                    ● Theo kế hoạch
                  </span>
                </div>
              )}
            </div>

            <div className="classroom__section-heading classroom__upcoming-heading">
              <div>
                <h2>Lịch học trong tuần</h2>
                <p>Những nội dung bạn sẽ học trong tuần.</p>
              </div>
            </div>

            <div className="classroom__schedule-list">
              {schedule.map((item) => (
                <article
                  className="classroom__schedule-item"
                  key={item.date}
                >
                  <div className="classroom__schedule-date-box">
                    <strong>{item.date}</strong>
                    <span>{item.day}</span>
                  </div>

                  <div className="classroom__schedule-item-content">
                    <h3>{item.title}</h3>
                    <p>◷ {item.time}</p>
                  </div>

                  <span
                    className={`classroom__badge ${item.color}`}
                  >
                    {item.type}
                  </span>

                  <button
                    className="classroom__text-button"
                    onClick={() => setSelectedDay(item.date)}
                  >
                    Chi tiết →
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Bài tập" && (
          <section className="classroom__section">
            <div className="classroom__section-heading">
              <div>
                <span className="classroom__section-label">
                  HOMEWORK
                </span>
                <h2>Bài tập của bạn</h2>
                <p>
                  Theo dõi thời hạn và hoàn thành bài tập đúng hạn.
                </p>
              </div>
            </div>

            <div className="classroom__assignment-list">
              {assignments.map((item) => (
                <article
                  className="classroom__assignment"
                  key={item.title}
                >
                  <div className="classroom__assignment-icon">
                    笔
                  </div>

                  <div className="classroom__assignment-content">
                    <h3>{item.title}</h3>
                    <p>
                      {item.subject} · Hạn nộp: {item.deadline}
                    </p>
                  </div>

                  <span
                    className={`classroom__status ${
                      item.status === "Đã hoàn thành"
                        ? "completed"
                        : item.status === "Chưa làm"
                          ? "pending"
                          : "in-progress"
                    }`}
                  >
                    {item.status}
                  </span>

                  <button
                    className="classroom__button classroom__button--outline"
                    onClick={() =>
                      alert(`Bài tập: ${item.title}`)
                    }
                  >
                    Xem bài
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Kiểm tra" && (
          <section className="classroom__section">
            <div className="classroom__section-heading">
              <div>
                <span className="classroom__section-label">
                  TEST & PRACTICE
                </span>
                <h2>Bài kiểm tra</h2>
                <p>
                  Kiểm tra kiến thức và đánh giá trình độ tiếng Trung.
                </p>
              </div>
            </div>

            <div className="classroom__test-grid">
              {tests.map((test) => {
                const completed =
                  test.status === "Đã hoàn thành" ||
                  completedTests.includes(test.title);

                return (
                  <article
                    className="classroom__test-card"
                    key={test.title}
                  >
                    <div className="classroom__test-top">
                      <span className="classroom__test-icon">
                        文
                      </span>

                      <span
                        className={`classroom__status ${
                          completed ? "completed" : "pending"
                        }`}
                      >
                        {completed ? "Đã hoàn thành" : "Chưa làm"}
                      </span>
                    </div>

                    <span className="classroom__section-label">
                      {test.level}
                    </span>

                    <h3>{test.title}</h3>
                    <p>{test.description}</p>

                    <div className="classroom__test-meta">
                      <span>☷ {test.questions} câu hỏi</span>
                      <span>◷ {test.duration} phút</span>
                    </div>

                    <button
                      className="classroom__button classroom__button--primary classroom__test-button"
                      onClick={() => handleStartTest(test.title)}
                    >
                      {completed ? "Xem bài kiểm tra" : "Bắt đầu làm bài →"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === "Kết quả" && (
          <section className="classroom__section">
            <div className="classroom__section-heading">
              <div>
                <span className="classroom__section-label">
                  LEARNING PROGRESS
                </span>
                <h2>Kết quả học tập</h2>
                <p>
                  Theo dõi sự tiến bộ của bạn qua từng kỹ năng.
                </p>
              </div>
            </div>

            <div className="classroom__results">
              {[
                { name: "Từ vựng", score: 85 },
                { name: "Ngữ pháp", score: 72 },
                { name: "Nghe hiểu", score: 68 },
                { name: "Đọc hiểu", score: 90 },
              ].map((item) => (
                <article
                  className="classroom__result-item"
                  key={item.name}
                >
                  <div className="classroom__result-header">
                    <strong>{item.name}</strong>
                    <span>{item.score}/100</span>
                  </div>

                  <div className="classroom__result-progress">
                    <span style={{ width: `${item.score}%` }} />
                  </div>
                </article>
              ))}
            </div>

            <div className="classroom__result-note">
              <span>✦</span>
              <div>
                <h3>Tiếp tục phát huy!</h3>
                <p>
                  Hãy luyện tập thường xuyên để cải thiện những kỹ
                  năng còn hạn chế và tiến gần hơn đến mục tiêu HSK.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="classroom__reminder">
          <div className="classroom__reminder-icon">学</div>

          <div>
            <h3>Mỗi ngày một chút, tiếng Trung tiến bộ hơn!</h3>
            <p>
              Duy trì lịch học đều đặn là chìa khóa để chinh phục HSK.
            </p>
          </div>

          <button
            onClick={() => setActiveTab("Lịch học")}
          >
            Tiếp tục học →
          </button>
        </section>
      </div>
    </main>
  );
}
export default Classroom;