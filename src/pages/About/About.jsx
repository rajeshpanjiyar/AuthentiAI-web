import { React, Fragment } from "react";
import TeamMemberCard from "./TeamMemberCard";
import "./About.scss";

const About = () => {
  const teamMembers = [
    { name: "Rajesh Panjiyar", image: "member1.jpg" , github: "https://github.com/rajeshpanjiyar" },
    { name: "Samarth Mishra", image: "member2.jpg", github: "https://github.com/Samarth1029" },
    { name: "Siddhant Hota", image: "member3.jpg" , github: "https://github.com/Siddhanthota" },
    { name: "Abhishek Ranjan", image: "member4.jpg" , github: "https://github.com/AbhishekRP2002/" },
  ];
  return (
    <Fragment>
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <div className="vision-container">
          <h2 className="vision-title">
            Our
            <br />
            Vision
          </h2>
          <div className="vision-text">
            <p>
              We are a team of passionate individuals committed to providing
              high-quality products and exceptional customer service. Our
              mission is to make technology accessible to everyone, no matter
              where they are in the world. Join us and experience the difference
              of working with a dedicated and customer-centric team.
            </p>
          </div>
        </div>

        <div className="services-container">
          <h2 className="services-title">Our Services</h2>
          <div className="services-text">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
              omnis consequatur ipsa aspernatur labore sed sapiente similique
              quod blanditiis dolores eos natus, repellat aliquam facilis odio
              at facere et nam?
            </p>
          </div>
        </div>

        <div className="team-container">
          <h2 className="team-title">Our Team </h2>
          <div className="team-text">
            <p>
              We are comprised of experienced with passion for technology and
              commitment to customer satisfaction.
            </p>
          </div>
          <div className="team-row">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                image={member.image}
                github={member.github}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
