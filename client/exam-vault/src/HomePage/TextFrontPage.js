import './FrontPage.css'
import { Link } from "react-router-dom";

const TextFrontPage = () => {
  return (
    <div>
       <header>
        <div className="header-section flex container">
          <div className="header-left">
            <h1>Notes & Papers Hub </h1>
            <p>
            Here teachers as well as students can acess the exam papers as well as notes of the semesters. 
            Teachers can uplod the notes of the semesters and students can easily download from this hub.
            </p>
            <button className="GetStartButton">
              <Link
                to="/registration"
                style={{ textDecoration: "none"}}
              >
                Registration
              </Link>
            </button>
          </div>
          <div className="header-right">
            <img src="Images/student.jpeg" alt="Notes & Paper Hub" />
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <div className="features-header flex">
            <h4 className="features-heading-text">
              Some Functionalities of Notes & Papers
            </h4>{" "}
          </div>
          <hr />
          <div className="features-area flex">
  <a href="/registration" target="blank" className="features-card card-1">
    <h5 className="features-text">
      Teachers and Students can upload the papers of the exams.
    </h5>
  </a>

  <a href="/registration" target="blank" className="features-card card-2">
    <h5 className="features-text">
      Teachers and Students can preview the all approved exam papers.
        </h5>
  </a>

  <a href="/registration" target="blank" className="features-card card-3">
    <h5 className="features-text">
      Teachers and Students can check own uploaded papers.
    </h5>
  </a>

  <a href="/registration" target="blank" className="features-card card-4">
    <h5 className="features-text">
      Teahers and Students can check the analytics of the papers. 
    </h5>
  </a>

  <a href="/registration" target="blank" className="features-card card-5">
    <h5 className="features-text">
      Teachers can approve or reject the uploded papers of the students. 
            </h5>
  </a>

  <a href="/registration" target="blank" className="features-card card-6">
    <h5 className="features-text">
      Teachers and Students can download the approved papers.
     </h5>
  </a>

  <a href="/registration" target="blank" className="features-card card-7">
    <h5 className="features-text">
      Teachers can upload the notes of the semester.
     </h5>
  </a>

  <a href="/registration" target="blank" className="features-card card-8">
    <h5 className="features-text">
      Students can download the semesters wise notes.
     </h5>
  </a>

  <a href="/registration" target="blank" className="features-card card-9">
    <h5 className="features-text">
      Teachers and Students can preview the semesters notes.
     </h5>
  </a>
</div>
        </div>
      </section>

      <section className="cta-section">
  <div className="container flex cta-section-container">
    {/* <h2 style={{ color: "white" }}>Join Us in Making a Difference</h2> */}
    <div className="card">
      <h5 className="card-header" style={{background:"white"}}>Notes & Papers Hub</h5>
      <div className="card-body">
        <p className="card-text">
          Here Teacher and students can use this portal, this portal is for both teahers and students. 
          Here they can upload, download, preview, the papers and notes. 
          for take advantage of this hub, please login or signup.
        </p>
        <button className="GetStartButton" style={{marginRight:"3rem"}}>
          <Link
            to="/registration"
            style={{  textDecoration: "none" }}
          >
            Registration
          </Link>
        </button>
        <button className="GetStartButton" style={{marginRight:"3rem"}}>
          <Link
            to="/login_form"
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        </button>
      </div>
    </div>
  </div>
</section>

      <br />
      <br />
    </div>
  )
}

export default TextFrontPage
