import React from "react";
import "../styles/AboutUs.css";
import Navbar from "../components/navbar"; 
import member1 from "../assets/team/member1.png";
import member2 from "../assets/team/member2.png";
import member3 from "../assets/team/member3.png";
import member4 from "../assets/team/member4.png";

const teamMembers = [
  {
    name: "M Rohith",
    role: "Project Lead",
    description: "Rohith is a passionate developer and the project lead, ensuring everything runs smoothly.",
    image: member1,
  },
  {
    name: "Pranava Pai N",
    role: "AI Engineer",
    description: "Pranava specializes in machine learning and AI, making our platform smarter every day.",
    image: member2,
  },
  {
    name: "Karthik Acharya",
    role: "UI/UX Designer",
    description: "Karthik brings ideas to life through user-centered, elegant designs.",
    image: member3,
  },
  {
    name: "Ben Leon D'Souza",
    role: "Full Stack Developer",
    description: "Ben is a full stack developer with a knack for creating seamless user experiences.",
    image: member4,
  },
];

const AboutUs = () => {
  return (
    <div className="about-container">
        <Navbar />
      <section className="project-section">
        <h1>About the Project</h1>
        <p>
        <>
  <strong>About DetectX</strong><br />
  At DetectX, we believe healthcare should be accessible, understandable, and proactive. Our AI-powered platform bridges the gap between complex medical data and everyday users, empowering individuals to take control of their health with confidence.
  <br /><br />

  <strong>Our Mission</strong><br />
  1 in 10 adults worldwide live with diabetes, yet many remain undiagnosed until complications arise. Similarly, medical reports filled with jargon leave patients confused. We solve these challenges with:
  <ul>
    <li><strong>AI-Driven Predictions:</strong> Our AI model (80% accuracy) assesses diabetes risk early using simple user inputs.</li>
    <li><strong>Plain-Language Reports:</strong> Upload lab results, and our model instantly translates them into easy-to-understand insights.</li>
    <li><strong>Smart Nutrition Tracking:</strong> Search any food with our smart wellness guide to monitor calories and macros effortlessly.</li>
  </ul>

  <br />
  <strong>Why Choose Us?</strong><br />
  Unlike generic health apps, DetectX combines cutting-edge AI with user-centric design:
  <ul>
    <li>AI-Powered medical simplification</li>
    <li>Actionable health insights (not just raw data)</li>
    <li>All-in-one platform (predictions, reports, nutrition)</li>
  </ul>

  <br />
  <strong>The Future</strong><br />
  We’re expanding to blood pressure monitoring and cancer risk detection—because everyone deserves a healthier tomorrow.
  <br /><br />
  <em>Join us in revolutionizing healthcare, one AI-powered insight at a time.</em>
  <br /><br />
  <strong>Team HealthAI</strong><br />
  Powered by innovation. Driven by impact.
</>

        </p>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section">
        <h2>Meet the Team</h2>
        {teamMembers.map((member, index) => (
          <div
            className={`team-profile ${index % 2 === 0 ? "left" : "right"}`}
            key={index}
          >
            <img src={member.image} alt={member.name} className="profile-image" />
            <div className="profile-info">
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="desc">{member.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutUs;
