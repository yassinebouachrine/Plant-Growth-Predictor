import React from 'react';
import './Contact.css';

const About = () => {
  return (
    <div className="page-container about">
      <h1 className="page-title">About Us 🌱</h1>
      <p className="page-description">
        We are a group of passionate engineering students from <strong>ENSIASD</strong>, 
        specializing in <em>Big Data, Data Science, and Artificial Intelligence</em>. 
        This project reflects our commitment to applying machine learning for sustainable development.
      </p>
      <p className="page-description">
        Inspired by the harmony of nature, our goal is to help users predict plant growth 
        using environmental data like sunlight, temperature, soil type, and more. 
        With AI as our tool and nature as our guide, we're sowing the seeds of innovation.
      </p>
      <p className="page-description">
        Whether you're a gardener, student, or researcher, we hope this app helps you 
        understand your plants a little better—and brings you closer to nature. 🌾
      </p>
    </div>
  );
};

export default About;
