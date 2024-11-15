import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
};

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [hoveredLinkedin, setHoveredLinkedin] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(false);
  const [hoveredGithub, setHoveredGithub] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoints.social, { method: 'GET' });
        const result = await response.json();
        setData(result);
        result.social.forEach((social) => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = social.href; // Assuming the `href` field holds the URL
          document.head.appendChild(link);
        });
      } catch (error) {
        console.error('Error fetching social data:', error);
      }
    };
    fetchData();
  }, []);

  /**
   * Handle hover state for social icons
   * @param {string} type - The type of social network (email or github)
   * @param {boolean} hovering - True if mouse is hovering, false otherwise
   */

  const handleHover = (type, hovering) => {
    if (type === 'email') {
      setHoveredEmail(hovering);
    } else if (type === 'github') {
      setHoveredGithub(hovering);
    } else if (type === 'linkedin') {
      setHoveredLinkedin(hovering);
    }
  };

  return (
    <div className="social">
      {data ? data.social.map((social) => {
        const isLinkedin = social.network === 'linkedin';
        const isGithub = social.network === 'github';
        const isEmail = social.network === 'email';

        return (
          <div
            key={social.network}
            className="social-icon-wrapper" // Apply special class for GitHub
            // eslint-disable-next-line max-len, no-nested-ternary, no-undef
            onMouseEnter={() => handleHover(isEmail ? 'email' : isGithub ? 'github' : isLinkedin ? 'linkedin' : null, true)} // Show email on hover
            // eslint-disable-next-line no-nested-ternary
            onMouseLeave={() => handleHover(isEmail ? 'email' : isGithub ? 'github' : isLinkedin ? 'linkedin' : null, false)} // Hide email on hover
          >

            <SocialIcon
              style={styles.iconStyle}
              url={social.href}
              network={social.network || 'default'}
              bgColor={theme.socialIconBgColor}
              target="_blank"
              rel="noopener noreferrer"
            />

            {/* Show email href on hover */}
            {isLinkedin && hoveredLinkedin && <span className="linkedin-hover">{social.show}</span>}
            {isGithub && hoveredGithub && <span className="github-hover">{social.show}</span>}
            {isEmail && hoveredEmail && <span className="email-hover">{social.href}</span>}
          </div>
        );
      }) : null}
    </div>
  );
}

export default Social;
