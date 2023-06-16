import { React, Fragment } from "react";
import TeamMemberCard from "./TeamMemberCard";
import "./About.scss";

const About = () => {
  const teamMembers = [
    {
      name: "Rajesh Panjiyar",
      image:
        "https://avatars.githubusercontent.com/u/78999467?s=400&u=5ca7d53a4c8fbfc2c90a801d0ceb90552d1e93f9&v=4",
      github: "https://github.com/rajeshpanjiyar",
    },
    {
      name: "Samarth Mishra",
      image: "https://avatars.githubusercontent.com/u/87478607?v=4",
      github: "https://github.com/Samarth1029",
    },
    {
      name: "Siddhant Hota",
      image: "https://avatars.githubusercontent.com/u/22271775?v=4",
      github: "https://github.com/Siddhanthota",
    },
    {
      name: "Abhishek Ranjan",
      image: "https://avatars.githubusercontent.com/u/86261428?v=4",
      github: "https://github.com/AbhishekRP2002/",
    },
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
              AuthentiBot is to provide users with a
              seamless and user-friendly experience in verifying the
              authenticity of their products. The chatbot will be accessible to
              users with disabilities or impairments and will integrate with
              existing verification systems. It will also offer additional
              features such as barcode scanning, voice assistance, and natural
              language processing to enhance the user experience.
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
