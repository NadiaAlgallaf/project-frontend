import React from 'react'
import { Link } from 'react-router'

function Homepage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container hero-content text-center">
            <p className="hero-small-title">YOUR CAREER STARTS HERE</p>

            <h1>
              Find the Right Job.
              <br />
              Build Your <span>Future.</span>
            </h1>

            <p className="hero-description">
              Discover opportunities, connect with employers, and take the next
              step in your career with CareerConnect.
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/jobs" className="btn hero-btn">
                Browse Jobs
              </Link>

              <Link to="/sign-up" className="btn hero-outline-btn">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 stat-item">
              <h3>Find</h3>
              <p>Career Opportunities</p>
            </div>

            <div className="col-md-4 stat-item">
              <h3>Apply</h3>
              <p>With Ease</p>
            </div>

            <div className="col-md-4 stat-item">
              <h3>Connect</h3>
              <p>With Employers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="container">
          <div className="text-center section-heading">
            <p className="section-small-title">WHY CAREERCONNECT?</p>

            <h2>Everything You Need in One Place</h2>

            <p>
              A simple platform that helps job seekers find opportunities and
              employers find the right candidates.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="feature-card h-100">
                <div className="feature-icon">
                  <i className="bi bi-search"></i>
                </div>

                <h5>Explore Jobs</h5>

                <p>
                  Browse available opportunities and find jobs that match your
                  interests.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card h-100">
                <div className="feature-icon">
                  <i className="bi bi-send"></i>
                </div>

                <h5>Easy Applications</h5>

                <p>
                  Apply to jobs directly through CareerConnect with a simple
                  process.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card h-100">
                <div className="feature-icon">
                  <i className="bi bi-clipboard-check"></i>
                </div>

                <h5>Track Applications</h5>

                <p>
                  Follow your application status and stay updated on your job
                  search.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card h-100">
                <div className="feature-icon">
                  <i className="bi bi-calendar-event"></i>
                </div>

                <h5>Interview Updates</h5>

                <p>
                  View interview dates when employers move your application
                  forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="career-section">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-md-6">
              <div className="career-card h-100">
                <span className="career-label">FOR JOB SEEKERS</span>

                <h2>Ready for Your Next Opportunity?</h2>

                <p>
                  Search for jobs, submit applications, track your status, and
                  manage your career journey from one place.
                </p>

                <Link to="/jobs" className="career-link">
                  Explore Opportunities
                  <span> →</span>
                </Link>
              </div>
            </div>

            <div className="col-md-6">
              <div className="career-card employer-card h-100">
                <span className="career-label">FOR EMPLOYERS</span>

                <h2>Find the Right People for Your Team.</h2>

                <p>
                  Post jobs, manage your listings, review applicants, update
                  application statuses, and schedule interviews.
                </p>

                <Link to="/jobs/create" className="career-link">
                  Post a Job
                  <span> →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="container text-center">
          <h2>Your Next Opportunity Is Waiting.</h2>

          <p>
            Start exploring jobs and take the next step toward your career
            goals.
          </p>

          <Link to="/jobs" className="btn cta-btn">
            Explore Jobs
          </Link>
        </div>
      </section>
    </>
  )
}

export default Homepage
