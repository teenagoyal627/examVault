import "./FrontPage.css";
import { Link } from "react-router-dom";

const TextFrontPage = () => {
  return (
    <div>
      <header id="/">
        <div className="header-section flex container">

          <div className="header-left">
            <h2>Centralized Hub for Academic Notes & Papers</h2>
            <p>
              Here teachers as well as students can acess the exam papers as
              well as notes of the semesters. Teachers can uplod the notes of
              the semesters and students can easily download from this hub.
            </p>
            <Link to="/registration" style={{ textDecoration: "none" }} className="GetStartButton gradient-bg">Registration</Link>
            <Link to="/login_form" style={{ textDecoration: "none" }} className="GetStartButton outlined">Learn More</Link>
          </div>



          <div className="header-right">
            <img src="Images/frontpageImage.jpg" alt="Notes & Paper Hub" />
          </div>
        </div>
      </header>

      <section id="features" className="features-section">
        <div className="container">
          <div className="features-header">
            <h2 className="section-title">Core Features of Notes & Papers Hub</h2>
            <p className="section-subtitle">Explore key tools designed for students and teachers</p>
          </div>

          <div className="features-grid">

            <Link to='/registration' className="feature-card">
              <span className="feature-icon">📤</span>
              <h3>Upload Papers</h3>
              <p>Teachers & students can upload exam papers easily.</p>
            </Link>

            <Link to='/registration' className="feature-card">
              <span className="feature-icon">👀</span>
              <h3>Preview Papers</h3>
              <p>View all approved exam papers and notes. </p>
            </Link>

            <Link to='/registration' className="feature-card">
              <span className="feature-icon">📊</span>
              <h3>View Analytics</h3>
              <p>Check subject-wise, year-wise paper statistics.</p>
            </Link>

            <Link to='/registration' className="feature-card">
              <span className="feature-icon">🔍</span>
              <h3>Search Papers & Notes </h3>
              <p>Teachers and students can search the notes & papers for preview. </p>
            </Link>

          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container flex about-container">
          <div className="about-text">
            <h2>About Notes & Papers Hub</h2>
            <p>
              Notes & Papers Hub is designed to streamline academic resources sharing between teachers and students.
              Whether it's uploading exam papers, previewing content,or downloading semester notes — our platform ensures everything is accessible one place.
            </p>
          </div>
          <div className="about-image">
            <img src="Images/About.jpg" alt="about section" />
          </div>
        </div>
      </section>

      <section className="faq-section container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Answers to common questions from students and teachers</p>

        <div className="faq-grid">
          <div className="faq-item">
            <h4>📝 How do I upload exam papers?</h4>
            <p>Once you're registered and logged in, go to the upload section, choose the paper file and semester, and click upload.</p>
          </div>

          <div className="faq-item">
            <h4>📚 Can students download notes freely?</h4>
            <p>Yes, after login, students can browse notes semester-wise and download them easily.</p>
          </div>

          <div className="faq-item">
            <h4>👁️ How can I preview papers before downloading?</h4>
            <p>Click on any View paper to preview it in image formate before downloading.</p>
          </div>

          <div className="faq-item">
            <h4>📈 Who can access analytics?</h4>
            <p>Both teachers and students can view analytics like most downloaded papers, subjects, and semester-wise data.</p>
          </div>

        </div>
      </section>
     


    </div>
  );
};

export default TextFrontPage;
