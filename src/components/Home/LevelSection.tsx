const levels = [
    "HSK 1",
    "HSK 2",
    "HSK 3",
    "HSK 4",
    "HSK 5",
    "HSK 6",
];

const LevelSection = () => {
    return (
        <section className="level-section" id="hsk">
            <div className="container">

                <div className="section-header">
                    <span>LỘ TRÌNH HỌC</span>
                    <h2>Học theo cấp độ HSK</h2>
                    <p>
                        Chọn cấp độ phù hợp với trình độ của bạn.
                    </p>
                </div>

                <div className="level-list">

                    {levels.map((level, index) => (
                        <div className="level-item" key={level}>

                            <div className="level-number">
                                {index + 1}
                            </div>

                            <h3>{level}</h3>

                            <span>
                                Bắt đầu học →
                            </span>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default LevelSection;