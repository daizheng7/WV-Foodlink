import React from 'react';

const QuickAccessSection = () => {
  const isSmallScreen = window.innerWidth <= 768;
  
  const quickAccessItems = [
    {
      title: "Find Food Assistance",
      description: "Locate food assistance programs, pantries, and SNAP retailers near you in West Virginia.",
      link: "https://foodlink.wvu.edu/",
      bgColor: "bg-wvu-accent--blue"
    },
    {
      title: "Explore Food Atlas",
      description: "Interactive maps showing West Virginia's food landscape, retailers, and accessibility data.",
      link: "https://experience.arcgis.com/experience/61e914cf99364188a23f20b46721f2a3",
      bgColor: "bg-wvu-blue"
    },
    {
      title: "Organize Communities",
      description: "Connect with tools and resources to strengthen your community's food security initiatives.",
      link: "https://organize-communities-wvu.hub.arcgis.com/pages/organize",
      bgColor: "bg-wvu-accent--blue-dark"
    },
  ];

  return (
    <section 
      id="quick-access-section" 
      aria-labelledby="quick-access-label" 
      style={{ marginBottom: '3rem' }}
    >  
      <div className="wvu-z-index-content">
        <div className="container-fluid p-3">
          <div className="row justify-content-left">          
            {quickAccessItems.map((item, index) => (
              <div key={index} className="d-flex flex-column col-lg-4 mb-3">
                <div 
                  className={`position-relative h-100 p-3 p-xl-4 link-white ${item.bgColor}`}
                  style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    const arrow = e.currentTarget.querySelector('.arrow-icon');
                    if (arrow) arrow.style.transform = 'translateX(6px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    const arrow = e.currentTarget.querySelector('.arrow-icon');
                    if (arrow) arrow.style.transform = 'translateX(0)';
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 
                      className="card-title h2 mb-0 text-decoration-none flex-grow-1" 
                      id={`quick-access-${index}`}
                      style={{
                        fontSize: isSmallScreen ? '1.4rem' : '1.6rem',
                        fontWeight: '700',
                        lineHeight: '1.2'
                      }}
                    >
                      <a 
                        className="stretched-link link-white text-decoration-none" 
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        aria-describedby={`quick-access-desc-${index}`}
                        style={{
                          color: 'inherit',
                          display: 'block'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.outline = '3px solid #EAAA00';
                          e.currentTarget.style.outlineOffset = '2px';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = 'none';
                        }}
                      >
                        {item.title}
                      </a>
                    </h3>
                    
                    {/* Modern SVG Arrow */}
                    <svg 
                      className="arrow-icon"
                      width="28" 
                      height="28" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      aria-hidden="true"
                      style={{
                        marginLeft: '1rem',
                        marginTop: '0.25rem',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0,
                        opacity: '0.9'
                      }}
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </div>
                  
                  <p 
                    className="flex-grow-1 mb-3"
                    id={`quick-access-desc-${index}`}
                    style={{
                      fontSize: isSmallScreen ? '0.95rem' : '1rem',
                      lineHeight: '1.5',
                      opacity: '0.95',
                      marginBottom: '1rem'
                    }}
                  >
                    {item.description}
                  </p>              
                  
                  {/* External link indicator */}
                  {item.link.startsWith('http') && (
                    <div 
                      className="d-flex align-items-center"
                      style={{
                        fontSize: '0.875rem',
                        opacity: '0.8',
                        fontWeight: '500'
                      }}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        style={{ marginRight: '0.5rem' }}
                        aria-hidden="true"
                      >
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                      </svg>
                      <span>Opens in new tab</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;