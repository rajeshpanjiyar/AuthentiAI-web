import React from 'react';
import './About.scss'

const TeamMemberCard = ({ name, image , githubLink }) => {
  return (
    <div className="team-card">
      <img src={image} alt={name} />
      <h3>
        
        <a href="{githubLink}">
        {name}
        </a>
        </h3>
    </div>
  );
};

export default TeamMemberCard;