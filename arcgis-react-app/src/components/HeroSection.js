import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // WVU Color Palette
  const colors = {
    wvuBlue: '#002855',
    wvuGold: '#EAAA00',
    wvuAccentBlue: '#0062A3',
    wvuNavy: '#1C2B39',
    wvuTeal: '#3C6E71',
    lightGray: '#f8f9fa',
    white: '#ffffff'
  };

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update viewport height with debouncing for performance
  useEffect(() => {
    const updateHeight = () => {
      const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      setViewportHeight(height);
    };
    
    updateHeight();
    setIsVisible(true);
    
    let debounceTimer;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updateHeight, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateHeight, 200);
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(debounceTimer);
    };
  }, []);

  // Responsive breakpoints
  const isSmallScreen = window.innerWidth <= 768;
  const isMediumScreen = window.innerWidth <= 992;

  return (
    <main 
      id="wvu-main-content" 
      className="wvu-bg-position-center"
      style={{
        minHeight: isSmallScreen ? '90vh' : '100vh',
        position: 'relative',
        marginBottom: 40,
        paddingBottom: 0
      }}
    >
      <div 
        className="row ms-0 me-0"
        style={{
          minHeight: 'inherit',
          margin: 0
        }}
      >
        {/* Food Background Image Section */}
        <div 
          className={`${isSmallScreen ? 'py-6' : 'py-md-0'} ${isSmallScreen ? 'col-12' : 'col-md-6'} wvu-bg-size-cover wvu-bg-position-center`}
          style={{
            backgroundColor: colors.wvuBlue,
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: isSmallScreen ? '40vh' : '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
          role="img"
          aria-label="Fresh vegetables and fruits representing food security and community nutrition"
        >
          {/* Overlay for better contrast and readability */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 40, 85, 0.75)',
              zIndex: 1
            }}
          />

          {/* Pattern overlay for WVU branding */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(https://static.wvu.edu/global/images/patterns/wvu/background__topo-white--2.0.0.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.1,
              zIndex: 2
            }}
          />

         
        </div>

        {/* Content Section */}
        <div 
          className={`${isSmallScreen ? 'col-12' : 'col-md-6'} me-auto bg-light py-5 wvu-z-index-content`}
          style={{
            backgroundColor: colors.lightGray,
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: isSmallScreen ? 'auto' : '100vh'
          }}
        >
          {/* Main Heading with WVU Styling */}
          <h1 
            id="foodlink-hero-label" 
            className="bg-light wvu-header-max-width mb-0 p-2 p-md-4 bg-light wvu-shout display-2 text-wvu-blue ms-md-n5"
            style={{
              backgroundColor: colors.lightGray,
              color: colors.wvuBlue,
              fontSize: isSmallScreen ? '2.8rem' : '4rem',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 0,
              padding: isSmallScreen ? '1rem' : '2rem',
              marginLeft: isSmallScreen ? 0 : '-2.5rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'all 0.8s ease 0.4s',
              position: 'relative',
              zIndex: 3
            }}
          >
            Building Food Security in West Virginia
          </h1>

          <div 
            className="ps-3"
            style={{
              paddingLeft: isSmallScreen ? '1rem' : '1.5rem'
            }}
          >
            <div className="wvu-p-max-width">
              {/* Lead Paragraph with WVU Bar */}
              <p 
                className="lead pb-2 wvu-bar"
                style={{
                  fontSize: isSmallScreen ? '1.2rem' : '1.4rem',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  color: colors.wvuBlue,
                  maxWidth: '600px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'all 0.8s ease 0.6s',
                  fontWeight: 500
                }}
              >
                Connecting communities to affordable, nutritious, and culturally appropriate food through data-driven insights, community organizing, and collaborative partnerships across West Virginia.
              </p>

              {/* Partnership Description */}
              <p 
                className='lead pb-2 '
                style={{
                  fontSize: isSmallScreen ? '1.2rem' : '1.4rem',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  color: colors.wvuBlue,
                  maxWidth: '600px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'all 0.8s ease 0.6s',
                  fontWeight: 500
                }}
              >
                A joint initiative of the{' '}
                <a
                  href="https://resilientcommunities.wvu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: colors.wvuBlue,
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                  onFocus={(e) => e.target.style.outline = `2px solid ${colors.wvuBlue}`}
                  onBlur={(e) => e.target.style.outline = 'none'}
                >
                  WVU Center for Resilient Communities
                </a>
                {' '}and the{' '}
                <a
                  href="https://extension.wvu.edu/food-health/nutrition/fnp"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: colors.wvuBlue,
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                  onFocus={(e) => e.target.style.outline = `2px solid ${colors.wvuBlue}`}
                  onBlur={(e) => e.target.style.outline = 'none'}
                >
                  WVU Extension Family Nutrition Program
                </a>.
              </p>

              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;