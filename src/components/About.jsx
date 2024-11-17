/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from 'react';
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
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '30px',
    },
    textContainer: {
      flex: 1,
      paddingLeft: '40px',
    },
    imageContainer: {
      flex: 1,
      textAlign: 'center',
      paddingRight: '40px',
      marginTop: '30px',
    },
    image: {
      width: '80%',
      borderRadius: '50%',
      marginTop: '30px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
      position: 'sticky', // Keep image fixed
      top: '50px',
    },
    introTextContainer: {
      textAlign: 'justify',
      fontSize: '1.1em',
      fontWeight: 500,
      color: theme.color,
      padding: '30px',
      borderRadius: '15px',
      backgroundColor: theme.cardBackground,
      boxShadow: `0 4px 20px ${theme.cardBorderColor}`,
      margin: '20px 0',
      position: 'relative',
      transform: 'scale(1)',
      cursor: 'pointer',
    },
    heading: {
      fontSize: '2.2em',
      fontWeight: 'bold',
      color: theme.accentColor,
      marginBottom: '15px',
    },
    subHeading: {
      color: theme.chronoTheme.titleColor,
      fontSize: '1.8em',
      marginTop: '20px',
      marginBottom: '12px',
    },
    list: {
      listStyleType: 'disc',
      paddingLeft: '20px',
      color: theme.color,
      fontSize: '1em',
    },
  };

  useEffect(() => {
    fetch(endpoints.about, { method: 'GET' })
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
              <Row style={styles.container}>
                {/* Image on the Left */}
                <Col style={styles.imageContainer}>
                  <img src={data.about.imageSource} alt="profile" style={styles.image} />
                </Col>

                {/* Information on the Right */}
                <Col style={styles.textContainer}>
                  <h1 style={styles.heading}>About Me</h1>

                  {/* <div style={styles.introTextContainer}>
                    <h2 style={styles.subHeading}>Introduction</h2>
                    <p>{data.about.introduction}</p>
                  </div> */}

                  <div style={styles.introTextContainer}>
                    <h2 style={styles.subHeading}>{data.about.currentFocus}</h2>
                    <ul style={styles.list}>
                      {data.about.keyAreas.map((area, index) => (
                        <li key={index}>{area}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.introTextContainer}>
                    <h2 style={styles.subHeading}>Projects: </h2>
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
