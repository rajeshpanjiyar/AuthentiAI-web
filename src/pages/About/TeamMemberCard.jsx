import React from 'react';
import './About.scss'

const TeamMemberCard = ({ name, image , githubLink }) => {
  return (
    <div className="team-card">
      <img src={image} alt={name} width="178"/>
      <h4 style={{textAlign: "center"}}>
        <a href={githubLink}>
        {name}
        </a>
        </h4>
    </div>
  );
};

export default TeamMemberCard;