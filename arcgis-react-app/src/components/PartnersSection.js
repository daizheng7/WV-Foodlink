import React from "react";
import { motion } from "framer-motion";
import "./PartnersSection.css"; // Create this CSS file for animations

const partners = [
  { name: "DHHR", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/NqKxBboH_400x400.jpg?v=1740915501791&w=200", link: "https://dhhr.wv.gov/Pages/default.aspx" },
  { name: "WV Food & Farm", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/OsqVvbZf_400x400.jpg?v=1740915501792&w=200", link: "https://www.wvfoodandfarm.org/" },
  { name: "Mountaineer Food Bank", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/JTO1IjW3_400x400.jpg?v=1740915501793&w=200", link: "https://www.mountaineerfoodbank.org/" },
  { name: "WV Policy", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/y3-dbx8e_400x400.jpg?v=1740915501794&w=200", link: "https://wvpolicy.org/" },
  { name: "WVU Geography", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/DoG&G_WordMark-2%20BLuGLd_smaller.png?v=1740915501795&w=400", link: "https://www.geo.wvu.edu/" },
  { name: "WVU Extension", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/hub-image-card-crop-idja1gv37.png?v=1740915501796&w=200", link: "https://extension.wvu.edu/food-health/nutrition/fnp" },
  { name: "Facing Hunger", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/hub-image-card-crop-iyq4ztcpa.png?v=1740915501797&w=200", link: "https://facinghunger.org/" },
  { name: "MAZON", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/MAZON-Social.jpg?v=1740915501798&w=200", link: "https://mazon.org/" },
  { name: "WVDE", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/download.jpg?v=1740915501799&w=200", link: "https://wvde.us/" },
  { name: "WV Food for All", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/Screenshot%20(156).png?v=1740915501800&w=200", link: "https://www.wvfoodforall.com/" },
  { name: "AFSC", logo: "https://www.arcgis.com/sharing/rest/content/items/0c60d0d0fe1a4746a40284e0fdda8e87/resources/FA9D17A1-5056-A830-8C945F8B99428050_medium.jpg?v=1740915501801&w=200", link: "https://afsc.org/" },
];

const PartnersSection = () => {
  return (
    <section style={{ backgroundColor: "transparent", overflow: "hidden" }}>
      <div className="container-fluid wideRowClass">
        {/* Infinite Scrolling Logos */}
        <motion.div
          className="scrolling-logos"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="logo-item">
              <a href={partner.link} target="_blank" rel="noopener noreferrer">
                <img src={partner.logo} alt={partner.name} className="logo-image" />
              </a>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <h2 style={{ fontFamily: "Open Sans, Avenir Next", fontSize: "var(--font-size-h2)", textAlign: "center" }}>
          <strong style={{ color: "#002855" }}>WVU FOOD JUSTICE LAB</strong>
        </h2>
        <h2 style={{ fontFamily: "Open Sans, Avenir Next", fontSize: "var(--font-size-h2)", textAlign: "center" }}>
          <span style={{ color: "#002855", fontWeight: "600" }}>CENTER FOR RESILIENT COMMUNITIES</span>
        </h2>
        <h2 style={{ fontFamily: "Open Sans, Avenir Next", fontSize: "var(--font-size-h2)", textAlign: "center", color: "#3C3C3C" }}>
          309 Brooks Hall | 98 Beechurst Ave.
        </h2>
        <h2 style={{ fontFamily: "Open Sans, Avenir Next", fontSize: "var(--font-size-h2)", textAlign: "center", color: "#3C3C3C" }}>
          Morgantown, WV 26505
        </h2>
        <h2 style={{ fontFamily: "Open Sans, Avenir Next", fontSize: "var(--font-size-h2)", textAlign: "center" }}>
          <a
            href="https://us14.list-manage.com/contact-form?u=4effc41d710bda5f3c7b5e38c&form_id=2e3d7a447680f67c2519a939d828d730"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1155CC" }}
          >
            Contact Us
          </a>
        </h2>
      </div>
    </section>
  );
};

export default PartnersSection;