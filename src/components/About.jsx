/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/about.css';

const styles = {
  introTextContainer: {

    margin: 10,
    background: '',
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
    color: '#F6BE00',
    justifyContent: 'center',
  },

  introTextContainerh1: {
    color: '#2C3E50 ',
  },

  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  list: {
    listStyleType: 'disc',
    marginLeft: 20,
  },
  heading: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    margin: '10px 0',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown children={text} />
  );

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
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    <h1 style={styles.introTextContainerh1}>Introduction</h1>
                    <p>{data.about.introduction}</p>

                    <h2>{data.about.currentFocus}</h2>
                    <ul style={styles.list}>
                      {data.about.keyAreas.map((area, index) => (
                        <li key={index}>{area}</li>
                      ))}
                    </ul>

                    <h2> Current Projects: </h2>
                    <ul style={styles.list}>
                      {data.about.currentProject.map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                    </ul>

                    <h2>{data.about.learningJourney}</h2>
                    <ul style={styles.list}>
                      {data.about.fieldsOfInterest.map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                    </ul>

                    <h2>{data.about.softSkills}</h2>
                    <ul style={styles.list}>
                      {data.about.softSkillsList.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>

                    <h2>Personal Interests</h2>
                    <ul style={styles.list}>
                      {data.about.personalInterests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                      ))}
                    </ul>
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <img src={data.about.imageSource} alt="profile" />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
