/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/about.css';

const About = (props) => {
  const { header } = props;
  const theme = useContext(ThemeContext); // Get theme context
  const [data, setData] = useState(null);

  // Define styles based on the active theme (light or dark)
  const styles = {
    introTextContainer: {
      textAlign: 'justify',
      fontSize: '1.2em',
      fontWeight: 500,
      color: theme.color,
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: theme.cardBackground,
      boxShadow: `0 4px 10px ${theme.cardBorderColor}`,
      transition: 'transform 0.3s ease, background-color 0.3s ease',
      margin: '10px 0',
      position: 'relative',
    },
    heading: {
      fontSize: '1.8em',
      fontWeight: 'bold',
      color: theme.accentColor,
      marginBottom: '10px',
    },
    subHeading: {
      color: theme.chronoTheme.titleColor,
      fontSize: '1.5em',
      marginTop: '15px',
      marginBottom: '10px',
    },
    list: {
      listStyleType: 'disc',
      paddingLeft: '20px',
      color: theme.color,
    },
    imageContainer: {
      marginTop: '20px',
      textAlign: 'center',
    },
    image: {
      maxWidth: '100%',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    },
    card: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '15px',
      transition: 'transform 0.3s ease, background-color 0.3s ease',
    },
    badge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: theme.accentColor,
      color: '#fff',
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '0.8em',
    },
    hoverEffect: {
      transition: 'transform 0.3s ease',
    },
    hoverScale: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    },
  };

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container" style={{ backgroundColor: theme.background }}>
        <Container>
          {data ? (
            <Fade>
              <Row>
                <Col>
                  <h1 style={styles.heading}>About Me</h1>
                  <div style={styles.introTextContainer}>
                    <h2 style={styles.subHeading}>Introduction</h2>
                    <p>{data.about.introduction}</p>
                  </div>

                  <div style={styles.introTextContainer}>
                    <h2 style={styles.subHeading}>{data.about.currentFocus}</h2>
                    <ul style={styles.list}>
                      {data.about.keyAreas.map((area, index) => (
                        <li key={index}>{area}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.introTextContainer}>
                    <h2 style={styles.subHeading}>Current Projects:</h2>
                    <ul style={styles.list}>
                      {data.about.currentProject.map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.introTextContainer}>
                    <h2 style={styles.subHeading}>{data.about.learningJourney}</h2>
                    <ul style={styles.list}>
                      {data.about.fieldsOfInterest.map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.introTextContainer}>
                    <h2 style={styles.subHeading}>{data.about.softSkills}</h2>
                    <ul style={styles.list}>
                      {data.about.softSkillsList.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.introTextContainer}>
                    <h2 style={styles.subHeading}>Personal Interests:</h2>
                    <ul style={styles.list}>
                      {data.about.personalInterests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
                <Col style={styles.imageContainer}>
                  <img src={data.about.imageSource} alt="profile" style={styles.image} />
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
};

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
